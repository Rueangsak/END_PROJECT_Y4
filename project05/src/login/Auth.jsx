import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AppLoader from '../design-system/primitives/AppLoader';
import { auth } from '../firebase/firebase';


//เอาไว้ตรวจว่า user มีการ Onsensation หรือไม่
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = useMemo(() => ({ currentUser }), [currentUser]);

    if (loading) {
        return <AppLoader message="Loading account..." fullScreen />;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}