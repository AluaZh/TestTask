import React from 'react';
import Categories from '../categories/Categories';

export default function ItemsList({ addToCart, cartItems = [] }) {
    const [items, setItems] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const url = "https://f6ba9b40b3a8ae28.mokky.dev/items";

    React.useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setItems(data);
                setCategories([...new Set(data.map(item => item.category))]);
            })
            .catch(error => console.error('Ошибка при получении товаров:', error));
    }, []);

    const isItemInCart = (itemId) => {
        return cartItems.some(item => item.id === itemId);
    };

    const handleCategorySelect = (category) => {
        if (category === 'Все категории') {
            setSelectedCategory(null); 
        } else {
            setSelectedCategory(category);
        }
    };

    const filteredItems = selectedCategory
        ? items.filter(item => item.category === selectedCategory)
        : items;

    return (
        <>
            <h2 className="title-1">Каталог</h2>
            <Categories 
                categories={categories}
                onSelectCategory={handleCategorySelect}
                selectedCategory={selectedCategory}
            />
            <div className="items-list">
                {filteredItems.map(item => (
                    <div key={item.id} className="item-card">
                        <img src={item.img} alt={item.name} className="item-card__img" />
                        <h3 className="item-card__name">{item.name}</h3>
                        <p className="item-card__description">{item.description}</p>
                        <p className="item-card__category">{item.category}</p>
                        <button 
                            onClick={() => addToCart(item)} 
                            disabled={isItemInCart(item.id)}
                            className={`item-card__add-button ${isItemInCart(item.id) ? 'disabled' : ''}`}
                        >
                            {isItemInCart(item.id) ? 'В корзине' : 'Добавить в корзину'}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
