import React from "react";
import './style.css';

export default function Cart({ cartItems, updateItemQuantity, removeItemFromCart, isOpen, toggleCart }) {
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
                        <div className="cart-item__top">
                            <img src={item.img} alt={item.name} className="cart-item__img" />
                            <div className="cart-item__controls">
                                <button 
                                    className="cart-item__button" 
                                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="cart-item__quantity">{item.quantity}</span>
                                <button 
                                    className="cart-item__button" 
                                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="cart-item__name">{item.name}</div>
                        <button
                            onClick={() => removeItemFromCart(item.id)}
                            className="cart-item__remove-button"
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
