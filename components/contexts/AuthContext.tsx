import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Reemplaza localStorage

// Definir la interfaz para el contexto de autenticación
interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  login: (userName: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Crear el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definir las props del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Verifica si el usuario está logueado al cargar el componente
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const name = await AsyncStorage.getItem("userName");
      if (token) {
        setIsLoggedIn(true);
        setUserName(name || "");
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (userName: string, token: string) => {
    setIsLoggedIn(true);
    setUserName(userName);
    await AsyncStorage.setItem("authToken", token); // Guarda el token
    await AsyncStorage.setItem("userName", userName); // Guarda el nombre de usuario
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUserName("");
    await AsyncStorage.removeItem("authToken"); // Elimina el token
    await AsyncStorage.removeItem("userName"); // Elimina el nombre de usuario
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};