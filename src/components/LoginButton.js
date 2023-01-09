import "./LoginButton.css";

function LoginButton(props) {
    return (
        <div>
            <input className="signin" onClick={props.onClick} type="button" value="Login with Google" />
        </div>
    )
}

export default LoginButton