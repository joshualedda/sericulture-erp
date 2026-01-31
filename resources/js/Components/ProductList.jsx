import React from 'react';

export default function ProductList({ products }) {
    return (
        <div>
            <h4>Product Management</h4>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price} (Stock: {product.stock_quantity})
                    </li>
                ))}
            </ul>
        </div>
    );
}