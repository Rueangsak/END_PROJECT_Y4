import React, { useContext } from 'react'
import { AuthContext } from './Auth'
import {auth} from '../firebase/firebase'
import { Navigate, Link } from "react-router-dom";
// import { Redirect } from 'react-router-dom'
const LogIn = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;

        try {

            auth.signInWithEmailAndPassword(email.value, password.value)
            .then((data)=>{
                console.log(data);
            }).catch((error)=>{
                alert(error.message);
            })
        } catch(error) {
            alert(error);
        }
    }

    
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Navigate to="/Work" />;
    }

    return (
        <>
            <div className="container mt-5">
            <h1 style={{padding:10}}>Log In</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" value="True" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div style={{padding:10}}>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <Link to="/SignUp">
                <button type="submit" className="btn btn-primary" >SignUp</button>
                </Link>
            </div>
            </form>
            </div>
        </>
    )
   


}
export const logout = () => async dispatch => {
    try {
      const firebase = require('firebase'); // eslint-disable-line global-require
      await firebase.auth().signOut();
      console.log('User Logged Out!');
    //   dispatch({ type: LOGOUT_SUCCESS });
    } catch (err) {
      console.log('err:', err);
    }
  };


export default LogIn;