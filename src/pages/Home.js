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
            tagline: getTagline(),
            longURL: "",
            returnedShort: "",
            showOptions: false,
            disableSubmit: false,
            showLoader: false,
            qrCode: "",
            qrVisible: false,
            outputVisible: false,
        }

        window.addEventListener("resize", () => {
            this.setState({tagline: getTagline()})
        })
    }

    showOptions = () => {
        if (this.state.longURL !== "" && validateURL(this.state.longURL)) {
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
            this.setState({
                showLoader: false,
            })

            const returnedShort = response.data.short;

            if (short !== "" && returnedShort !== short) {
                Swal.fire({
                    text: "Your requested URL was not available",
                    icon: "info",
                    toast: true,
                    position: "bottom",
                  });
            } 

            this.setState({
                returnedShort: `1pt.co/${returnedShort}`,
                outputVisible: true,
                qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://1pt.co/${returnedShort}`
            })

            this.onQrLoad = () => {
                this.setState({
                    qrVisible: true,
                })
            }

        })
    }

    render() {
        const mainStyle = this.state.showOptions ? { height: "300px" } : {}

        return (
            <div id="main">
                <div id="top" style={mainStyle}>
                    <h1>1 Point <span>{this.state.tagline}</span></h1>
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
                    showLoader={this.state.showLoader}
                    qrCode={this.state.qrCode}
                    qrVisible={this.state.qrVisible}
                    onQrLoad={this.onQrLoad}
                    returnedShort={this.state.returnedShort}
                    outputVisible={this.state.outputVisible}
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

function getTagline() {
    if (window.innerWidth > 900) {
        return "| Dynamic URL Shortener"
    } else if (window.innerWidth > 600) {
        return "| URL Shortener"
    } else {
        return ""
    }
}

export default Home;