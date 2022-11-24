import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../services/authService";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.getCurrentUser()) {
      navigate("/login", { state: location.pathname });
    }
  }, [location.pathname, navigate]);

  return children;
};
