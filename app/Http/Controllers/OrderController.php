<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        if (request()->expectsJson()) {
            return Order::with('orderItems.product', 'user')->get();
        }

        // Web view for customers
        $orders = auth()->user()->orders()->with('orderItems.product')->latest()->get();
        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $total = 0;
            foreach ($request->items as $item) {
                $product = \App\Models\Product::find($item['product_id']);
                $total += $product->price * $item['quantity'];
            }

            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => $total,
            ]);

            foreach ($request->items as $item) {
                $product = \App\Models\Product::find($item['product_id']);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
            }
        });

        return response()->json(['message' => 'Order created']);
    }

    public function show(Order $order)
    {
        return $order->load('orderItems.product', 'user');
    }

    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'sometimes|in:pending,confirmed,in-process,completed,cancelled',
        ]);

        $oldStatus = $order->status;
        $order->update($request->only('status'));

        // Generate receipt when order is completed
        if ($request->status === 'completed' && $oldStatus !== 'completed') {
            \App\Models\Invoice::create([
                'order_id' => $order->id,
                'amount' => $order->total_amount,
                'type' => 'invoice',
            ]);

            // TODO: Send email notification with receipt to customer
        }

        return $order;
    }

    public function generateReceipt(Order $order)
    {
        // Check if order is completed and has invoice
        if ($order->status !== 'completed') {
            return response()->json(['error' => 'Order must be completed to generate receipt'], 400);
        }

        $invoice = $order->invoice;
        if (!$invoice) {
            // Create invoice if it doesn't exist
            $invoice = \App\Models\Invoice::create([
                'order_id' => $order->id,
                'amount' => $order->total_amount,
                'type' => 'invoice',
            ]);
        }

        return response()->json([
            'receipt' => [
                'order_id' => $order->id,
                'invoice_id' => $invoice->id,
                'customer' => $order->user->name,
                'email' => $order->user->email,
                'items' => $order->orderItems->map(function($item) {
                    return [
                        'product' => $item->product->name,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'total' => $item->quantity * $item->price,
                    ];
                }),
                'total_amount' => $order->total_amount,
                'date' => $order->updated_at->format('Y-m-d H:i:s'),
            ]
        ]);
    }
}
