import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function FormPage({ isRegistration, onLogin }) {  // Передаем функцию onLogin как пропс
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isRegistration) {
            if (formData.password !== formData.confirmPassword) {
                alert("Пароли не совпадают");
                return;
            }

            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = existingUsers.find(user => user.username === formData.username);

            if (userExists) {
                alert("Пользователь уже зарегистрирован");
                return;
            }

            existingUsers.push({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('users', JSON.stringify(existingUsers));
            localStorage.setItem('currentUser', formData.username);  // Сохраняем имя пользователя
            onLogin(formData.username);  // Передаем имя пользователя через onLogin
            navigate("/catalog");
        } else {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = existingUsers.find(user => 
                user.username === formData.username && user.password === formData.password
            );

            if (user) {
                localStorage.setItem('currentUser', formData.username);  // Сохраняем имя пользователя
                onLogin(formData.username);  // Передаем имя пользователя через onLogin
                navigate("/catalog");
            } else {
                alert("Неверное имя пользователя или пароль");
            }
        }
    };

    return (
        <header className="header">
            <div className="form-container">
                <div className="form">
                    <h2 className="form-container__title">
                        {isRegistration ? "Регистрация" : "Авторизация"}
                    </h2>

                    <form id="userForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                value={formData.username}
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {isRegistration && (
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {isRegistration && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Повторить пароль</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword}
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        )}

                        <button type="submit" className="userForm-btn">
                            {isRegistration ? "Зарегистрироваться" : "Войти"}
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}
