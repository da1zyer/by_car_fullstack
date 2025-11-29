import { useAuth } from './AuthContext';

export const login = async (username, password) => {

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
      const data = await response.json();

      console.log(response)

      if (response.ok) {
        return data; 
      } else {
        const errorMessage = data.detail || "Неизвестная ошибка авторизации";
        alert(errorMessage); // Для уведомления пользователя
        throw new Error(errorMessage); // Для остановки вызывающего кода
      }
    } catch (err) {
        // Обработка ошибок сети или исключений, выброшенных выше
        console.error("Ошибка запроса:", err.message);
        // Перебрасываем ошибку дальше, чтобы вызывающий код мог ее обработать
        throw err; 
    }
  };

export const fetchAuthLogic = async (url, options = {}, isRetry = false, updateTokens, logout) => {
    
    // 1. Получаем токены из localStorage напрямую (как это было ранее)
    const accessToken = localStorage.getItem('access_token');
    const refreshTokenStorage = localStorage.getItem('refresh_token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
    };
    
    let response = await fetch(url, { ...options, headers });

    if (response.status === 401 && !isRetry) {
        
        if (!refreshTokenStorage) {
            // 🛑 Используем внедренный logout
            logout(); 
            return Promise.reject(new Error("Refresh token missing."));
        }
        
        try {
            // ... (логика обновления токена остается прежней)
            // ...
            
            if (!refreshResponse.ok) {
                // 🛑 Используем внедренный logout
                logout();
                // ...
                return Promise.reject(new Error(errorData.detail || "Refresh failed"));
            }

            // 4. Обновляем токены и повторяем запрос
            const data = await refreshResponse.json();
            
            // 🔑 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Используем внедренный updateTokens
            // (который обновляет и localStorage, и состояние React)
            updateTokens(data.access_token, data.refresh_token); 
            
            // Рекурсивный вызов, передавая внедренные функции
            return fetchAuthLogic(url, options, true, updateTokens, logout); 

        } catch (refreshError) {
            // 🛑 Используем внедренный logout
            logout();
            return Promise.reject(refreshError);
        }
    }
    
    return response;
};

export const getUser = async (accessToken) => {
  const response = await fetch(`http://localhost:8000/auth/me`, {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  console.log(data);
  return data;
};