import React from "react";
import firebase from "firebase";
import Main from "../pages/Main";

const Logout = () => {

        firebase.auth().signOut().then(() =>{
        this.setState({
         user:null
        })
        this.props.history.push("/");
        }).catch(function(error) {
        // An error happened.
        });
        return (
            <Main/>
           )

       }

export default Logout;