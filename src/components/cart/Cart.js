import React, { useState, useEffect } from 'react';
import './style.css';

export default function Cart({ cartItems = [], setCartItems, isOpen, toggleCart }) {
    const [itemQuantities, setItemQuantities] = useState({});

    useEffect(() => {
        setItemQuantities(cartItems.reduce((acc, item) => {
            acc[item.id] = acc[item.id] ? acc[item.id] : 1;
            return acc;
        }, {}));
    }, [cartItems]);

    const increaseQuantity = (item) => {
        setItemQuantities(prev => ({
            ...prev,
            [item.id]: (prev[item.id] || 1) + 1
        }));
    };

    const decreaseQuantity = (item) => {
        setItemQuantities(prev => {
            const newQuantity = Math.max((prev[item.id] || 1) - 1, 1); 
            return {
                ...prev,
                [item.id]: newQuantity
            };
        });
    };

    useEffect(() => {
        const updatedCartItems = cartItems.filter(item => itemQuantities[item.id] > 0);
        setCartItems(updatedCartItems);
    }, [itemQuantities]);

    const removeItemFromCart = (itemId) => {
        setItemQuantities(prev => {
            const newQuantities = { ...prev };
            delete newQuantities[itemId];
            return newQuantities;
        });
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <div className={`cart ${isOpen ? 'open' : ''}`}>
            <header className="cart-header">
                <h2>Корзина</h2>
                <button onClick={toggleCart} className="cart-close-button">
                    Закрыть
                </button>
            </header>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                        <img src={item.img} alt={item.name} className="cart-item__img" />
                        <div className="cart-item__name">{item.name}</div>
                        <div className="cart-item__controls">
                            <button 
                                className="cart-item__button" 
                                onClick={() => decreaseQuantity(item)}
                            >
                                -
                            </button>
                            <span className="cart-item__quantity">{itemQuantities[item.id]}</span>
                            <button 
                                className="cart-item__button" 
                                onClick={() => increaseQuantity(item)}
                            >
                                +
                            </button>
                        </div>
                        {itemQuantities[item.id] <= 1 && (
                            <button
                                onClick={() => removeItemFromCart(item.id)}
                                className="cart-item__remove-button"
                            >
                                Удалить
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
