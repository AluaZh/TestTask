import React from 'react';
import './style.css';

export default function ItemsList({ addToCart, cartItems = [] }) {
    const [items, setItems] = React.useState([]);
    const url = "https://f6ba9b40b3a8ae28.mokky.dev/items";

    React.useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const isItemInCart = (itemId) => {
        return Array.isArray(cartItems) && cartItems.some(item => item.id === itemId);
    };

    return (
        <>
            <h2 className="title-1">Каталог</h2>
            <div className="items-list">
                {items.map(item => (
                    <div key={item.id} className="item-card">
                        <img src={item.img} alt={item.name} className="item-card__img" />
                        <h3 className="item-card__name">{item.name}</h3>
                        <p className="item-card__description">{item.description}</p>
                        <button 
                            onClick={() => addToCart(item)} 
                            disabled={isItemInCart(item.id)}
                            className="item-card__add-button"
                        >
                            {isItemInCart(item.id) ? 'В корзине' : 'Добавить в корзину'}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
