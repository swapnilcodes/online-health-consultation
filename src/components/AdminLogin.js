import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./admin-login-style.css";
import db from "../firebase";
import ShowMessage from "./showMessage";
import ReactDOM from "react-dom";
import ShowErr from "./ShowErr";
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

const login = (e) => {
  e.preventDefault();
  console.log("Hello World");
  console.log(db);

  db.ref("/admin-password").on("value", (snapshot) => {
    const adminPassword = snapshot.val();
    const enteredPassword = document.getElementById("password").value;
    console.log(adminPassword);
    console.log(enteredPassword);
    if (enteredPassword === adminPassword) {
      const element = <ShowMessage message="Welcome Admin" user="admin" />;
      document.querySelector(".App").innerHTML = "";
      ReactDOM.render(element, document.querySelector(".App"));
      var adminKey= CryptoAES.encrypt('admin@swam@@4782**', 'admin__key@swam').toString();
      sessionStorage.setItem("admin", "true");
      console.log(adminKey);
      sessionStorage.setItem('adminKey', adminKey);
    } else {
      const element = <ShowErr message="Wrong Password" />;
      document.querySelector(".App").innerHTML = "";
      ReactDOM.render(element, document.querySelector(".App"));
    }
  });
};

const AdminLogin = () => {
  return (
    <div className="app__admin__login">
      <form action="#" id="admin-login-form">
        <TextField
          label="Enter Admin Password"
          variant="filled"
          type="password"
          id="password"
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          id="login"
          onClick={login}
          type="submit"
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
