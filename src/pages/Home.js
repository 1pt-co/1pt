import React from "react";
import Swal from "sweetalert2"
import axios from "axios";
import LongURL from "../components/LongURL";
import OptionsForm from "../components/OptionsForm";
import config from "../config";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            longURL: "",
            showOptions: false,
            disableSubmit: false,
            showLoader: false,
         }
    }

    showOptions = () => {
        if (this.state.longURL != "" && validateURL(this.state.longURL)) {
            this.setState({ showOptions: true })
        } else {
            Swal.fire({
                title: "Invalid URL!",
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    }

    shorten = short => {
        if (!validateURL(this.state.longURL)) {
            Swal.fire({
                title: "There was an error!",
                icon: "error",
                confirmButtonText: "OK",
            });
    
            return
        }
    
        this.setState({
            disableSubmit: true, 
            showLoader: true,
        });
    
        addURL({
            params: { 
                long: this.state.longURL,
                short: short,
             }
        })
        .then(response => {
            console.log(response)
        })
    }

    render() {
        const mainStyle = this.state.showOptions ? { height: "300px" } : {}

        return (
            <div id="main">
                <div id="top" style={mainStyle}>
                    <h1>1 Point <span></span></h1>
                    <LongURL
                        value={this.state.longURL}
                        onChange={e => this.setState({ longURL: e.target.value })}
                        disabled={this.state.showOptions}
                        showOptions={this.showOptions}
                    />
                </div>

                <OptionsForm 
                    hide={!this.state.showOptions} 
                    onSubmit={this.shorten}
                    disableSubmit={this.state.disableSubmit}
                />
            </div>

        )
    }
}

// Check whether a given string *could* be a valid URL
function validateURL(url) {
    var regex = new RegExp(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
    );

    return regex.test(url)
};

const addURL = axios.create({
    baseURL: `${config.apiEndpoint}/addURL`,
    method: "post",
    validateStatus: status => {
        return status >= 200 && status < 400
    }
})



export default Home;