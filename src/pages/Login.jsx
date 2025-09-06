import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [code, setCode] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // 🔹 Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // go to home
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(code);
      navigate("/"); // optional: already handled by useEffect
    } catch (err) {
      alert(err.message || "Invalid code");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 4-digit code"
          className="border p-2 w-full rounded mb-4"
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
