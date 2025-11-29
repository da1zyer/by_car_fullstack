import { createContext, useState, useEffect, useContext } from 'react';

import { login, getUser } from './authService'; 

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getRefreshToken = () => {
  return localStorage.getItem("refresh_token"); 
};

const setRefreshToken = (token) => {
  localStorage.setItem("refresh_token", token);
};

const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const setAccessToken = (token) => {
  localStorage.setItem("access_token", token);
};

const updateTokens = (newAccessToken, newRefreshToken) => {
  setAccessToken(newAccessToken);
  setRefreshToken(newRefreshToken);
  setInternalAccessToken(newAccessToken);
};

const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setInternalAccessToken] = useState(getAccessToken());
  const [user, setUser] = useState(null); // Здесь могут храниться данные пользователя

  const loginUser = async (username, password, fetcher) => {
    const tokens = await login(username, password)

    const newAccessToken = tokens.access_token;
    const newRefreshToken = tokens.refresh_token;

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setInternalAccessToken(newAccessToken);

    const userData = await getUser(accessToken);
    console.log(userData);
    setUser(userData);
  };

  const logout = () => {
    removeTokens();
    setInternalAccessToken(null);
    setUser(null);
    window.location.href = '/login';
  };
  
  // Дополнительная логика: При загрузке страницы проверяем токены и получаем данные пользователя
  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) return;

      try {
        const userData = await getUser(accessToken);
        setUser(userData);
      } catch {
        // токен протух — выходим
        logout();
      }
    };

    fetchUser();
  }, [accessToken]);

  const value = {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    updateTokens,
    accessToken,
    user,
    isAuthenticated: !!accessToken,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};