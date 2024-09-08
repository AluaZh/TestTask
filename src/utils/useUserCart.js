import { useState, useEffect } from "react";

// Функция для получения корзины для конкретного пользователя
function getCartForUser(username) {
    if (!username) return []; // Если нет пользователя, вернуть пустую корзину
    const savedCart = localStorage.getItem(`cart_${username}`);
    return savedCart ? JSON.parse(savedCart) : [];
}

export function useUserCart(username) {
    const [cartItems, setCartItems] = useState(() => getCartForUser(username));

    useEffect(() => {
        if (username) {
            // Сохраняем корзину в localStorage для текущего пользователя
            localStorage.setItem(`cart_${username}`, JSON.stringify(cartItems));
        }
    }, [username, cartItems]);

    return [cartItems, setCartItems];
}
