function PrefixInput(props) {
    return (
        <div id="custom-url">
            <span className="prefix" onClick={props.focusInput}>1pt.co/</span>
            <input 
                type="text" 
                value={props.shortURL} 
                onChange={e => props.setShortURL(e.target.value)}
                ref={props.inputRef}
                onKeyUp={props.keyEvent}
            />
        </div>
    )
}

export default PrefixInput;