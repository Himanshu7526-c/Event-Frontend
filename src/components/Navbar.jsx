import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">INC Events</Link>
      <div className="space-x-4">
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/add-event" className="hover:underline">Add Event</Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600">Login</Link>
        )}
      </div>
    </nav>
  );
}
