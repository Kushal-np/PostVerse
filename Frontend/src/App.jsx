import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import useAuthStore from "./stores/AuthStore";
import { useEffect } from "react";
import LandingPage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";

function App() {
  const restoreAuth = useAuthStore((state) => state.restore);

  useEffect(() => {
    restoreAuth();
  }, []);
  return (
    <Routes>
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute role="admin">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
