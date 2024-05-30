import React, { createContext, useState, useContext, ReactNode } from "react";

// Define la forma de los datos en el contexto
interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

// Crea el contexto con un valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea un hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Define el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>("1");
  //reemplazar luego con backend
  const login = (userId: string) => {
    console.log("se logea");

    setIsLoggedIn(true);
    setUserId(userId);
  };
  //reemplazar luego con backend
  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
