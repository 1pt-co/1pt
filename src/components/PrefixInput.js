function PrefixInput(props) {
    const style = props.disabled ? { backgroundColor: "#c8cacc" } : { };

    return (
        <div id="custom-url">
            <span className="prefix" onClick={props.focusInput} style={style}>1pt.co/</span>
            <input 
                type="text" 
                value={props.shortURL} 
                onChange={e => props.setShortURL(e.target.value.replace(/\s/g, ""))}
                ref={props.inputRef}
                onKeyUp={props.keyEvent}
                disabled={props.disabled}
                style={style}
            />
        </div>
    )
}

export default PrefixInput;