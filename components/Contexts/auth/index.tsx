"use client";

import {
  FC,
  HTMLAttributes,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  email: string;
  role: "admin" | "editor";
}

export interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
  isAdmin: false,
  logout: async () => {},
  refresh: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch {
      // Ignore errors, still clear local state
      setUser(null);
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    await fetchUser();
  }, [fetchUser]);

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
