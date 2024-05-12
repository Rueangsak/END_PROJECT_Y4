import React, { useContext } from 'react'
import { AuthContext } from './Auth'
import {auth} from '../firebase/firebase'
import { Navigate } from "react-router-dom";

// import { Redirect } from 'react-router-dom'

const DashBoard = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <div className="container mt-5">
                <h1>Welcome</h1>
                <p>This is the dashboard, if you can see this you're logged in.</p>
                <button onClick={() => auth.signOut()} class="btn btn-danger">Sign Out</button>
            </div>
        </div>
    )
}

export default DashBoard;