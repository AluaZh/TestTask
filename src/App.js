import "./styles/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import FormPage from "./components/formPage/FormPage";
import ScrollToTop from "./utils/scrollToTop";
import Catalog from "./pages/Catalog";
import ItemsList from "./components/itemsList/ItemsList";
import Cart from "./components/cart/Cart";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeItemFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="App">
            <Router>
                <ScrollToTop />
                <Navbar toggleCart={toggleCart} />
                <Routes>
                    <Route path="/" element={<FormPage isRegistration={true} />} />
                    <Route path="/login" element={<FormPage isRegistration={false} />} />
                    <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
                </Routes>
                <Cart cartItems={cartItems} setCartItems={setCartItems} isOpen={isCartOpen} toggleCart={toggleCart} />
                <Footer />
            </Router>
        </div>
    );
}

export default App;