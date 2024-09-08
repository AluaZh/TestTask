import "./styles/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import FormPage from "./components/formPage/FormPage";
import ScrollToTop from "./utils/scrollToTop";
import Catalog from "./pages/Catalog";
import Cart from "./components/cart/Cart";
import { useUserCart } from "./utils/useUserCart";  // Импортируем новый хук
import { useState } from "react";

function App() {
    const [currentUser, setCurrentUser] = useState(() => {
        return localStorage.getItem('currentUser') || null;  // Получаем текущего пользователя
    });

    const [cartItems, setCartItems] = useUserCart(currentUser);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (newItem) => {
        setCartItems(prevCartItems => {
            const existingItem = prevCartItems.find(item => item.id === newItem.id);

            if (existingItem) {
                return prevCartItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCartItems, { ...newItem, quantity: 1 }];
        });
    };

    const removeItemFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateItemQuantity = (itemId, quantity) => {
        setCartItems(prevItems =>
            quantity > 0
            ? prevItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
              )
            : prevItems.filter(item => item.id !== itemId)
        );
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);  // Открыть/закрыть корзину
    };

    // Закрываем корзину
    const closeCart = () => {
        setIsCartOpen(false);
    };

    const handleLogin = (username) => {
        localStorage.setItem('currentUser', username);
        setCurrentUser(username);  // Устанавливаем текущего пользователя
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setCartItems([]);  // Очищаем корзину
        closeCart();  // Закрываем корзину при выходе
    };

    return (
        <div className="App">
            <Router>
                <ScrollToTop />
                <Navbar 
                    toggleCart={toggleCart} 
                    currentUser={currentUser} 
                    onLogout={handleLogout} 
                    closeCart={closeCart}  // Передаем функцию для закрытия корзины
                />
                <Routes>
                    <Route path="/" element={<FormPage isRegistration={true} onLogin={handleLogin} />} />
                    <Route path="/login" element={<FormPage isRegistration={false} onLogin={handleLogin} />} />
                    <Route path="/catalog" element={<Catalog addToCart={addToCart} cartItems={cartItems} />} />
                </Routes>
                <Cart
                    cartItems={cartItems}
                    updateItemQuantity={updateItemQuantity}
                    removeItemFromCart={removeItemFromCart}
                    isOpen={isCartOpen}
                    toggleCart={toggleCart}
                />
                <Footer />
            </Router>
        </div>
    );
}

export default App;
