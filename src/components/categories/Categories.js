import React from 'react';
import './style.css';

export default function Categories({ categories, onSelectCategory }) {
    if (!categories || categories.length === 0) {
        return <div>Категории не найдены</div>;
    }

    const categoryList = ['Все категории', ...categories];

    return (
        <div className='categories-list'>
            {categoryList.map((category, index) => (
                <button 
                    key={index} 
                    className='category-btn' 
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
