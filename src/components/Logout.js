import Button from "@material-ui/core/Button";
import "./logout-style.css";
import Message from "./showMessage";
import ReactDOM from "react-dom";

const Logout = () => {
  const logout = () => {
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.removeItem("loginInfo");
    document.querySelector(".App").innerHTML = "";
    const message = "Sucessfully Logged out";
    const element = <Message message={message} />;
    ReactDOM.render(element, document.querySelector(".App"));
  };

  return (
    <div class="app__logout">
      <h1 id="heading" id="heading">
        Are You Sure To Logout
      </h1>
      <Button variant="filled" id="logout" onClick={logout}>
        Click To Logout
      </Button>
    </div>
  );
};

export default Logout;
