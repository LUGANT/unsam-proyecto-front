import React, { createContext, useState, useContext, ReactNode } from "react";

// Define la forma de los datos en el contexto
interface EventContextType {
  somethingChange: boolean;
  toggleSomethingChange: () => void;
}

// Crea el contexto con un valor inicial
const EventContext = createContext<EventContextType | undefined>(undefined);

// Crea un hook para usar el contexto
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

// Define el proveedor del contexto
interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [somethingChange, setSomethingChange] = useState<boolean>(false);

  const toggleSomethingChange = () => {
    setSomethingChange(!somethingChange);
  };

  return (
    <EventContext.Provider value={{ somethingChange, toggleSomethingChange }}>
      {children}
    </EventContext.Provider>
  );
};
