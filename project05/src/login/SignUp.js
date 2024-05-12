import React, { useState } from 'react'
import { db,auth } from '../firebase/firebase'
import { Navigate } from "react-router-dom";

// import { Redirect } from 'react-router-dom'

const SignUp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    // const [currentUser] = useState(null);
    const handleSubmit =  (e) => {
        e.preventDefault();
        const { email, password ,name} = e.target.elements;
        try {
            auth.createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(userCredential);
                db.collection("email").doc(auth.currentUser.uid).set({
                    email: email.value,
                    name: name.value, 
                    uid: auth.currentUser.uid,
             
                    
                    
                }).then(() => {
                    setCurrentUser(true)
                    console.log("Document successfully written!");
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
            
        
        } catch(error) {
            alert(error);
        }
    }

    if (currentUser) {
        return <Navigate to="/Work" />
    }

    return (
        <>
            <div className="container mt-5">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label for="exampleInputName" className="form-label">name</label>
                <input type="text" name="name" className="form-control" id="exampleInputName" />
            </div>
            <button  className="btn btn-primary">Submit</button>
            </form>
            </div>
        </>
    )
}

export default SignUp;
