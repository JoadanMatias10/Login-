// components/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir el tipo del contexto
interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  role: string;
  userId: string;
  login: (userName: string, token: string, userRole: string, userId: string) => void;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('publico');
  const [userId, setUserId] = useState('');

  // Cargar el estado inicial desde AsyncStorage
  useEffect(() => {
    const loadAuthState = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const storedUserName = await AsyncStorage.getItem('userName');
      const storedRole = await AsyncStorage.getItem('role');
      const storedUserId = await AsyncStorage.getItem('userId');

      if (token && storedUserName && storedRole && storedUserId) {
        setIsLoggedIn(true);
        setUserName(storedUserName);
        setRole(storedRole);
        setUserId(storedUserId);
      }
    };

    loadAuthState();
  }, []);

  // Función para iniciar sesión
  const login = async (userName: string, token: string, userRole: string, userId: string) => {
    setIsLoggedIn(true);
    setUserName(userName);
    setRole(userRole);
    setUserId(userId);

    // Guardar en AsyncStorage
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userName', userName);
    await AsyncStorage.setItem('role', userRole);
    await AsyncStorage.setItem('userId', userId);
  };

  // Función para cerrar sesión
  const logout = async () => {
    setIsLoggedIn(false);
    setUserName('');
    setRole('publico');
    setUserId('');

    // Eliminar de AsyncStorage
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};