import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../login/Auth';

/**
 * Authenticated users go straight to the dashboard (Work).
 * Public marketing landing can be added later without blocking the app shell.
 */
const Main = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/Work" replace />;
};

export default Main;
