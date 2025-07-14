import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/provider/AuthProvider';
import { Spinner, Flex } from '@chakra-ui/react';

export const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    // Redirect to /login, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
