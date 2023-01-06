import { useState } from "react";
import Swal from "sweetalert2"

function OptionsForm(props) {
    const display = props.hide ? "none" : "block";
    const showLoader = props.showLoader ? "flex" : "none";
    const [shortURL, setShortURL] = useState("");

    return (
        <div id="options" className="options" style={{display: display}}>
            <div id="header">
                <h2>
                    OPTIONS
                    <a
                        className="info-btn"
                        onClick={() => { showPopup('info', 'Options', 'You can customize your URL here'); return false; }}
                    >
                        <i className="fas fa-question-circle help"></i>
                    </a>
                </h2>
            </div>

            <div id="body">
                <div className="options-left">
                    <h3>Custom URL</h3>
                    Leave blank for a random URL
                    <input type="text" id="custom-url" value={shortURL} onChange={e => setShortURL(e.target.value)}/>
                    <br />
                    <input 
                        type="button" 
                        value="Shorten" 
                        onClick={() => props.onSubmit(shortURL)}
                        disabled={props.disableSubmit}
                     />
                </div>

                <div id="loading">
                    <div className="loader" style={{display: showLoader}}></div>
                </div>

                <div id="output-wrapper">
                    <input id="output" type="text" disabled />
                    <div id="copy-wrapper" className="tooltip">
                        <input
                            id="copy"
                            type="button"
                            value="Copy"
                            onClick={() => copyToClipboard(document.getElementById('output').value)}
                        />
                        <span id="tooltiptext">Copy to clipboard</span>
                    </div>
                </div>

                <div id="qr-code-wrapper"><img id="qr-code" /></div>
            </div>
        </div>
    )
}

const showPopup = (type, title, description) => {
    Swal.fire({
        title: title,
        text: description,
        icon: type,
        confirmButtonText: "OK",
    });
};


const copyToClipboard = () => {

}

export default OptionsForm;