import React, { useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Profile from "./Profile";
import "./Header.css";
import Swal from "sweetalert2";

function Header(props) {
    const loginError = () => {
        Swal.fire({
            title: "Login failed",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#4d4e7a",
        })
    }

    const button = props.user ?
        <Profile image={props.user.picture} /> :
        <GoogleLogin 
            onSuccess={response => props.onSignin(response.credential)} 
            onError={loginError} 
            className="signin" 
        />

    return (
        <nav className="header">
            <div className="align">
                <a href="">About</a>
                <a href="dashboard">Dashboard</a>
                <a href="https://info.1pt.co">Analytics</a>
            </div>

            <div className="signin">{button}</div>
        </nav>
    );
}

export default Header;