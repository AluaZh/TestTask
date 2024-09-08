import React, { useState, useEffect } from 'react';
import ItemsList from '../components/itemsList/ItemsList';
import Categories from '../components/categories/Categories';

export default function Catalog({ addToCart, cartItems }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetch("https://f6ba9b40b3a8ae28.mokky.dev/items")
            .then(response => response.json())
            .then(data => {
                const uniqueCategories = [...new Set(data.map(item => item.category))];
                setCategories(uniqueCategories);
                setFilteredItems(data);
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category === 'Все категории') {
            fetch("https://f6ba9b40b3a8ae28.mokky.dev/items")
                .then(response => response.json())
                .then(data => setFilteredItems(data))
                .catch(error => console.error('Error fetching items:', error));
        } else {
            setFilteredItems(prevItems => prevItems.filter(item => item.category === category));
        }
    };

    return (
        <div className="catalog">
            <ItemsList addToCart={addToCart} cartItems={cartItems} />
        </div>
    );
}
