import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config.js";

export default function Redirect() {
    let redirectLink;
    const navigate = useNavigate();
    const { shortLink } = useParams();

    const getURL = axios.create({
        baseURL: `${config.apiEndpoint}/getURL`,
        params: { url: shortLink }, 
        validateStatus: status => {
            return status >= 200 && status < 400
        }
    })

    getURL()
    .then(response => {
        window.location.replace(response.data.url);
    })
    .catch(error => {
        window.location.replace("/404");
    })

    // axios.get(`${config.apiEndpoint}/getURL?url=${redirect}`).then(response => {
    //     console.log(response);
    // })

    return (
        <div id="loading">
            <div className="loader"></div>
            <p>Redirecting...</p>
        </div>
    );
}
