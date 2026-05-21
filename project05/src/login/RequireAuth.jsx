import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Auth';

/** Protects presenter routes — redirects guests to login. */
export default function RequireAuth({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
