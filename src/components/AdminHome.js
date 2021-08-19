import "./admin-home-style.css";
import bgImage from "./brandon-holmes-GofYo51GQ_4-unsplash.jpg";
import logo from "./Swam Devlopment-logos_transparent.png";
import Button from "@material-ui/core/Button";
import ShowMessage from "./showMessage";
import ReactDOM from "react-dom";

const logout = (e) => {
  e.preventDefault();
  sessionStorage.removeItem('admin');
  sessionStorage.removeItem('adminKey');
  const element = <ShowMessage message="Successfully Logged Out" />;
  document.querySelector(".App").innerHTML = "";
  ReactDOM.render(element, document.querySelector(".App"));
};

const adminSettings = (e) => {
  e.preventDefault();
  window.location = "/admin-settings";
};

const doctorManager = (e) => {
  e.preventDefault();
  window.location = "/doctor-management";
};

const AdminHome = () => {
  return (
    <div className="app__admin__home">
      <img src={bgImage} alt="" className="half-background" />
      <h1 id="admin-home-headings">Welcome Admin</h1>
      <img src={logo} alt=".." id="logo" />
      <div className="flex">
        <Button variant="filled" id="doctor-manager" onClick={doctorManager}>
          Doctor Manager
        </Button>
        <Button variant="filled" id="admin-settings" onClick={adminSettings}>
          Admin Settings
        </Button>
        <Button id="admin-logout-button" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHome;
