'use client'; 

import { RoleType } from "@/domains/identity/types";
import { createContext, ReactNode, useContext, useState } from "react";

type ContextNameContextType = {
  role: RoleType | null;
  setRole: React.Dispatch<React.SetStateAction<RoleType | null>>;
};

export const AuthContext = createContext<ContextNameContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  fetchedRole: RoleType;
};

export function AuthProvider({ 
  children, 
  fetchedRole 
}: AuthProviderProps) {
  const [role, setRole] = useState<RoleType | null>(fetchedRole);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}