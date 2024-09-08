import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import logo from "./../../img/logo.jpg";
import cartIcon from "./../../img/cart-icon.png"; 

export default function Navbar({ toggleCart, onLogout, closeCart }) {  // Добавили closeCart
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        setIsLoggedIn(!!user);  // Проверяем, есть ли текущий пользователь
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        onLogout();  // Очищаем корзину и выходим
        closeCart();  // Закрываем корзину
        setIsLoggedIn(false);
        navigate('/');
    };

    const activeLink = "nav-list__link nav-list__link--active";
    const normalLink = "nav-list__link";

    return (
        <nav className="nav">
            <div className="container">
                <div className="nav-row">
                    <NavLink to="/" className="logo">
                        <img src={logo} alt="Logo" />
                    </NavLink>

                    <ul className="nav-list">
                        {location.pathname !== '/catalog' && (
                            <>
                                <li className="nav-list__item">
                                    <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>
                                        <button>Регистрация</button>
                                    </NavLink>
                                </li>
                                <li className="nav-list__item">
                                    <NavLink to="/login" className={({ isActive }) => isActive ? activeLink : normalLink}>
                                        <button>Авторизация</button>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {isLoggedIn && location.pathname === '/catalog' && (
                            <>
                                <li className="nav-list__item">
                                    <button onClick={toggleCart} className="cart-button">
                                        <img src={cartIcon} alt="Корзина" className="cart-icon" />
                                    </button>
                                </li>
                                <li className="nav-list__item">
                                    <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>
                                        <button onClick={handleLogout}>
                                            Выйти
                                        </button>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
