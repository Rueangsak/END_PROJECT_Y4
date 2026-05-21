import React from "react";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Main from "../pages/Main";

const Logout = () => {
        useEffect(() => {
          signOut(auth).catch(function(error) {
            console.log(error);
          });
        }, []);
        return (
            <Main/>
           )

       }

export default Logout;