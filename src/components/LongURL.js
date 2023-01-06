function LongURL(props) {
    const inputStyle = props.disabled ? { width: "100%", borderRadius: "10px" } : {}
    const buttonStyle = props.disabled ? { display: "none" } : {}

    return (
        <div className="input-box">
            <input
                id="url"
                type="text"
                placeholder="paste long url here"
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                style={inputStyle}
            />
            <input
                id="next"
                type="button"
                value="GO"
                onClick={props.showOptions}
                style={buttonStyle}
            />
        </div>
    )
}

export default LongURL;