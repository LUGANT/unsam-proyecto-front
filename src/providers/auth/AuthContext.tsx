import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

// Define la forma de los datos en el contexto
interface AuthContextType {
  isLoggedIn: boolean;
  userId: string | null;
  username: string;
  imgUrl: string;
  login: (userId: string) => void;
  logout: () => void;
  updateUser: ({ username, imgUrl }: UserData) => void;
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
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    const storedImgUrl = localStorage.getItem("imgUrl");
    const storedIsLoggedIn = localStorage.getItem("token") != null;

    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
      setIsLoggedIn(storedIsLoggedIn);
    }
    setImgUrl(storedImgUrl!);
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
    setImgUrl("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("imgUrl");
    localStorage.removeItem("username");
    navigate("/auth/login");
  };

  const updateUser = ({ username, imgUrl }: UserData) => {
    if (username) {
      setUsername(username);
      localStorage.setItem("username", username);
    }
    if (imgUrl) {
      setImgUrl(imgUrl);
      localStorage.setItem("imgUrl", imgUrl);
    }
  };

  if (loading) {
    return null; // O un componente de carga
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        username,
        imgUrl,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
