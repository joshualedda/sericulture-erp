import React from 'react';

export default function OrderList({ orders }) {
    return (
        <div>
            <h4>Your Orders</h4>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order #{order.id} - Status: {order.status} - Total: ${order.total_amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}