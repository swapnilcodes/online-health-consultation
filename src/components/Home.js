import "./home-style.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import background from "./hush-naidoo-yo01Z-9HQAw-unsplash.jpg";
import Button from "@material-ui/core/Button";
import logo from "./Swam Devlopment-logos_black.png";


const chooseHeadingText = () => {
  const mediaQuery = window.matchMedia("(max-width: 500px)");
  if (mediaQuery.matches) {
    return "Health Consultation";
  } else {
    return "Online Health Consultation";
  }
};

const bookAppointment = () => {
  window.location = "/appointment";
};

const Home = () => {
  return (
    <div className="app__landing__home">
      <img
        src={background}
        alt=".."
        className="background"
        style={{ opacity: "30%" }}
      />
      <h1 id="home-heading">{chooseHeadingText()}</h1>
      <img src={logo} className="home-icon" />
      <h4 className="subtitle">
        This is our Online Health Consultation System For Doctors to Treat
        Paitents Online. We have Well Qualified Doctors. Book a Appointment
        Now!!!
      </h4>
      <button className="doctors choose">
        <Link to="/doctors" style={{ textDecoration: "none", color: "white", display: 'block' }}>
          View Our Doctors
        </Link>
      </button>
      <button className="book choose">
        <Link
          to="/create-acc"
          style={{ textDecoration: "none", color: "white", display: 'block' }}
        >
          Login
        </Link>
      </button>
    </div>
  );
};

export default Home;
