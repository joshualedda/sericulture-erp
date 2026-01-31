import React from 'react';

export default function Receipt({ receipt, onClose }) {
    if (!receipt) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Receipt</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="border-t pt-4">
                        <div className="mb-4">
                            <h4 className="font-semibold">D'SERICORE-ERP</h4>
                            <p className="text-sm text-gray-600">Sericulture Research and Development Institute</p>
                        </div>

                        <div className="mb-4">
                            <p><strong>Order ID:</strong> #{receipt.order_id}</p>
                            <p><strong>Invoice ID:</strong> #{receipt.invoice_id}</p>
                            <p><strong>Customer:</strong> {receipt.customer}</p>
                            <p><strong>Email:</strong> {receipt.email}</p>
                            <p><strong>Date:</strong> {receipt.date}</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="font-semibold mb-2">Items:</h5>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left">Product</th>
                                        <th className="text-right">Qty</th>
                                        <th className="text-right">Price</th>
                                        <th className="text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receipt.items.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td>{item.product}</td>
                                            <td className="text-right">{item.quantity}</td>
                                            <td className="text-right">₱{item.price}</td>
                                            <td className="text-right">₱{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-t pt-2">
                            <div className="flex justify-between font-semibold">
                                <span>Total Amount:</span>
                                <span>₱{receipt.total_amount}</span>
                            </div>
                        </div>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            <p>Thank you for your business!</p>
                            <p className="font-semibold text-blue-600">Please pickup your order at SRDI facility</p>
                            <p>Generated on {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => window.print()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Print Receipt
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}