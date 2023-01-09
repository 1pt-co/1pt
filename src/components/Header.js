import React, { useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Profile from "./Profile";
import "./Header.css";
import Swal from "sweetalert2";

function Header(props) {
    const [user, setUser] = useState(false);

    const login = response => {
        setUser(jwt_decode(response.credential));
    }

    const loginError = () => {
        Swal.fire({
            title: "Login failed",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#4d4e7a",
        })
    }

    const button = user ?
        <Profile image={user.picture} /> :
        <GoogleLogin onSuccess={login} onError={loginError} className="signin" />

    return (
        <nav className="header">
            <div className="align">
                <a href="">About</a>
                <a href="">Dashboard</a>
                <a href="https://info.1pt.co">Analytics</a>
            </div>

            <div className="signin">{button}</div>
        </nav>
    );
}

export default Header;