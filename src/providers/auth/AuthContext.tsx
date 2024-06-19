import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Define la forma de los datos en el contexto
interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  username: string;
  login: (userId: string) => void;
  logout: () => void;
  changeUsername: (newUsername: string) => void;
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
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    const storedIsLoggedIn = localStorage.getItem("token") != null;

    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
      setIsLoggedIn(storedIsLoggedIn);
    }
    setLoading(false);
  }, []);

  const login = (userId: string) => {
    setIsLoggedIn(true);
    setUserId(userId);
    // localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  const changeUsername = (newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  if (loading) {
    return null; // O un componente de carga
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, username, login, logout, changeUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};
