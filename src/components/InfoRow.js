import "./InfoRow.css";

function InfoRow(props) {
    const style = props.selected ? {backgroundColor: "#171721"} : {}

    return(
        <div className="infoRow" style={style} onClick={props.onClick}> 
            <h2>1pt.co/{props.short}</h2>
        </div>
    )
}


export default InfoRow;