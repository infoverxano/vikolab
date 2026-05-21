import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await api.get("/auth/get-session");
      console.log(res.data);
      if (res.data?.user) {
        
        
        setUser(res.data.user);
        setRole(res.data.user.role);
      } else {
        setUser(null);
        setRole(null);
      }
    } catch {
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/sign-in/email", { email, password });
    if (res.data?.user) {
      setUser(res.data.user);
      setRole(res.data.user.role);
    }
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/sign-out");
    setUser(null);
    setRole(null);
  };

  // Permissions basées sur le rôle
  const PERMISSIONS = {
    super_admin: ["create", "read", "update", "delete", "manage_users"],
    admin:       ["create", "read", "update", "delete"],
    user:        ["read"],
  };

  const permissions = PERMISSIONS[role] || [];

  const hasPermission = (permission) => permissions.includes(permission);
  const hasRole = (minRole) => {
    const LEVELS = { super_admin: 3, admin: 2, user: 1 };
    return (LEVELS[role] || 0) >= (LEVELS[minRole] || 0);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, role, permissions,
      loading, login, logout,
      getUser, hasPermission, hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}