import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check authentication when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/check", { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 🔹 Login with 4-digit code
  const login = async (code) => {
    const trimmedCode = code.toString().trim();
    if (trimmedCode.length !== 4) {
      throw new Error("Code must be 4 digits");
    }

    const res = await api.post(
      "/auth/login",
      { code: trimmedCode },
      { withCredentials: true }
    );
    setUser(res.data.user);
  };

  // 🔹 Logout
  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// helper hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
