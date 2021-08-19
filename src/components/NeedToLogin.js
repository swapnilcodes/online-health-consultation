import "./need-to-login-style.css";
import logo from "./Swam Devlopment-logos_white.png";
import Button from "@material-ui/core/Button";

const NeedToLogin = () => {
  const buttonStyles = {
    display: "block",
    margin: "auto",
    marginTop: "40px",
    backgroundColor: "white",
    fontFamily: "Ubuntu Condensed",
    color: "blue",
    width: "300px",
    height: "40px",
  };
  const goToLogin = () => {
    window.location = "/create-acc";
  };
  const goToHome = () => {
    window.location = "/";
  };
  return (
    <div className="need__to__login">
      <h1 id="need_to_login">You need to login to access this page</h1>
      <img src={logo} alt="" className="logo" />
      <Button variant="filled" style={buttonStyles} onClick={goToLogin}>
        Login
      </Button>
      <Button variant="filled" style={buttonStyles} onClick={goToHome}>
        Get Back To Home
      </Button>
    </div>
  );
};

export default NeedToLogin;
