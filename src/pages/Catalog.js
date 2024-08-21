import React from 'react';
import ItemsList from '../components/itemsList/ItemsList';

export default function Catalog({ addToCart }) {
    const items = [
        { id: 1, name: 'Item 1', img: 'item1.jpg', description: 'Description 1' },
        { id: 2, name: 'Item 2', img: 'item2.jpg', description: 'Description 2' },
    ];

    return (
        <div className="catalog">
            {items.map(item => (
                <ItemsList key={item.id} item={item} addToCart={addToCart} />
            ))}
        </div>
    );
}