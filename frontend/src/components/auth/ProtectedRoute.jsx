import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/provider/AuthProvider';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to /login, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
