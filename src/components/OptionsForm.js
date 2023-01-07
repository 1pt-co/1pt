import React, {useState } from "react";
import Swal from "sweetalert2"

const OptionsForm = React.forwardRef((props, ref) => {
    const [shortURL, setShortURL] = useState("");
    const [tooltiptext, setTooltiptext] = useState("Copy to clipboard");

    const display = props.hide ? "none" : "block";
    const showLoader = props.showLoader ? "flex" : "none";
    const qrVisibility = props.qrVisible ? "visible" : "hidden"; 
    const qrClasses = props.qrVisible ? "animated faster zoomIn" : "";
    const outputVisible = props.outputVisible ? "visible" : "hidden";
    const outputClasses = props.outputVisible ? "animated faster zoomIn" : "";

    const copyToClipboard = value => {
        const temp = document.createElement("textarea");
        temp.value = "https://" + value;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        setTooltiptext("Copied!");
    }

    const keyEvent = e => {
        if (e.key === "Enter") props.onSubmit(shortURL)
    }
    
    return (
        <div id="options" className="options" style={{display: display}}>
            <div id="header">
                <h2>
                    OPTIONS
                    <a
                        className="info-btn"
                        onClick={showInfo}
                    >?
                        <i className="fas fa-question-circle help"></i>
                    </a>
                </h2>
            </div>

            <div id="body">
                <div className="options-left">
                    <h3>Custom URL</h3>
                    Leave blank for a random URL
                    <div id="custom-url">
                        <span className="prefix">1pt.co/</span>
                        <input 
                            type="text" 
                            value={shortURL} 
                            onChange={e => setShortURL(e.target.value)}
                            ref={ref}
                            onKeyUp={keyEvent}
                        />
                    </div>
                    <br />
                    <input 
                        type="button" 
                        value="Shorten" 
                        onClick={() => props.onSubmit(shortURL)}
                        disabled={props.disableSubmit}
                     />
                </div>

                <div id="loading" style={{display: showLoader}}>
                    <div className="loader"></div>
                </div>

                <div id="output-wrapper" className={outputClasses} style={{visibility: outputVisible}}>
                    <input 
                        id="output" 
                        type="text" 
                        disabled 
                        value={props.returnedShort} 
                    />
                    <div id="copy-wrapper" className="tooltip">
                        <input
                            id="copy"
                            type="button"
                            value="Copy"
                            onClick={() => copyToClipboard(document.getElementById('output').value)}
                        />
                        <span id="tooltiptext">{tooltiptext}</span>
                    </div>
                </div>

                <div id="qr-code-wrapper">
                    <img 
                        id="qr-code" 
                        alt="QR Code"
                        src={props.qrCode} 
                        onLoad={props.onQrLoad}
                        style={{visibility: qrVisibility}}
                        className={qrClasses}
                    />
                </div>
            </div>
        </div>
    )
})

const showInfo = e => {
    e.preventDefault()

    Swal.fire({
        title: "Options",
        text: "You can customize your URL here",
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#4d4e7a",
        iconColor: "#4d4e7a",
    });
};


export default OptionsForm;