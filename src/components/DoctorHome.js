import background from "./online-marketing-hIgeoQjS_iE-unsplash.jpg";
import "./doctor-home-style.css";
import Button from "@material-ui/core/Button";
import logo from "./Swam Devlopment-logos_transparent.png";
import Message from "./showMessage";
import ReactDOM from "react-dom";

const openProfile = () => {
  window.location = "/profile";
};

const logout = () => {
  sessionStorage.removeItem("doctor");
  sessionStorage.removeItem("loginInfo");
  const element = <Message />;
  document.querySelector(".app__doctor__home").innerHTML = "";
  ReactDOM.render(element, document.querySelector(".app__doctor__home"));
};

const openAppointments = () =>{
  window.location= '/myAppointments';
}

const DoctorHomePage = () => {
  const data = JSON.parse(sessionStorage.getItem("loginInfo"));
  const name = data.name;
  return (
    <div class="app__doctor__home">
      <img src={background} alt="" className="background" />
      <h1 id="doctor-home-heading">Welcome Dr. {name}</h1>
      <img src={logo} alt=".." id="logo" />
      <div className="flex">
        <Button
          variant="contained"
          onClick={openProfile}
          style={{
            backgroundColor: "green",
            width: "300px",
            height: "40px",
            color: "white",
            display: "block",
            margin: "auto",
          }}
        >
          View Your Profile
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "blue",
            width: "300px",
            height: "40px",
            color: "white",
            display: "block",
            margin: "auto",
          }}
          onClick= {openAppointments}
        >
          View Your Appointments
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "red",
            width: "300px",
            height: "40px",
            color: "white",
            display: "block",
            margin: "auto",
          }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DoctorHomePage;
