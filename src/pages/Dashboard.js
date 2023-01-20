import axios from "axios";
import Swal from "sweetalert2"
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Header from "../components/Header.js";
import InfoRow from "../components/InfoRow.js";
import config from "../config.js";
import "./Dashboard.css";

function Dashboard(props) {
    const [token, setToken] = useState(false);
    const [user, setUser] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(0);

    
    const updateToken = async token => {
        sessionStorage.setItem("jwt", token)
        setToken(token)
        setUser(jwtDecode(token))
    }

    useEffect(() => {
        const jwt = sessionStorage.getItem("jwt");
        if (jwt) updateToken(jwt);
        
        if(token) {
            axios.get(`${config.apiEndpoint}/getProfileInfo`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => setData(response.data))
            .catch(err => {
                Swal.fire({
                    title: "There was an error!",
                    text: "Try logging in again",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4d4e7a",
                });
    
                sessionStorage.removeItem("jwt");
                setToken(false);
                setUser(false);
            })
        }

    }, [token])


    const rows = [];

    for (let i = 0; i < data.length; i++) {
        rows.push(
            <InfoRow
                key={data[i].short_url}
                short={data[i].short_url}
                long={data[i].long_url}
                onClick={() => setSelected(i)}
                selected={selected === i}
            />
        )
    }

    let content;

    if (data.length > 0) {
        content = (
            <div className="content">
                <h2 className="short">1pt.co/{data[selected].short_url}</h2>
                <h3>Redirects to {data[selected].long_url}</h3>
                <h3>Has {data[selected].hits} clicks</h3>
                <h3>Created on {data[selected].timestamp}</h3>
            </div>
        )
    }

    return (
        <div>
            <Header onSignin={updateToken} user={user}/>
            <div className="main">
                <div className="rows">
                    {rows}
                </div>

                {content}

            </div>
        </div>
    )
}

export default Dashboard;