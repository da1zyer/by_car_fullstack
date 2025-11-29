// hooks/useFetchWithAuth.js
import { useAuth } from '../services/AuthContext';
import { fetchAuthLogic } from '../services/authService'; // Импортируем чистую логику

export const useFetchWithAuth = () => {
    // 🔑 Здесь можно вызвать хук!
    const { updateTokens, logout } = useAuth();

    // Возвращаем обернутую функцию
    const fetch = (url, options = {}) => {
        // Мы передаем функции контекста в чистую логику
        return fetchAuthLogic(url, options, false, updateTokens, logout);
    };

    return fetch;
};