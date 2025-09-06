import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import UpdateEvent from "./pages/UpdateEvent";
import AddEvent from "./pages/AddEvent";
import AdminReport from "./pages/AdminReport";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
          <Route path="/events/update/:id" element={<ProtectedRoute><UpdateEvent /></ProtectedRoute>} />
          <Route path="/add-event" element={<ProtectedRoute role="admin"><AddEvent /></ProtectedRoute>} />
          <Route path="/events/:id/report" element={<ProtectedRoute role="admin"><AdminReport /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
