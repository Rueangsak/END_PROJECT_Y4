import React, { useState, useEffect } from 'react'
import {auth} from '../firebase/firebase'


//เอาไว้ตรวจว่า user มีการ Onsensation หรือไม่
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}