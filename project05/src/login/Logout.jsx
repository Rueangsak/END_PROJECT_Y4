import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../design-system/primitives/AppLoader';
import { auth } from '../firebase/firebase';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => navigate('/login', { replace: true }))
      .catch((error) => {
        console.error(error);
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return <AppLoader message="Signing out..." fullScreen />;
};

export default Logout;
