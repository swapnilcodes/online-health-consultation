import "./after-login-home-style.css";
import Button from "@material-ui/core/Button";
import logo from "./Swam Devlopment-logos_white.png";
import { Link } from "react-router-dom";
const AfterLoginHome = () => {
  const mediaQuery = window.matchMedia("max-width: 619px");
  var buttonStyles = {
    display: "block",
    margin: "auto",
    width: "300px",
    marginTop: "40px",
    height: "50px",
    backgroundColor: "blue",
    color: "white",
    fontFamily: "Ubuntu",
  };
  const downStyle = {
    display: "block",
    margin: "auto",
    marginTop: "90px",
  };

  const scrollBottom = () => {
    window.scrollTo(0, window.screen.height);
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };
  const openBookAppointments = () => {
    window.location = "/book-appointment";
  };
  document.body.style.overflow = "hidden";
  return (
    <div className="app__home">
      <img
        src="https://source.unsplash.com/1700x1000/?doctors,doctor,hospital,clinic,hospitals/"
        alt=""
        class="background"
      />
      <div class="part__1">
        <h1 id="login-home-heading">
          Welcome {JSON.parse(sessionStorage.getItem("loginInfo")).name}
        </h1>
        <div className="btn-container">
          <Button variant="contained" style={buttonStyles}>
            <Link
              to="/book-appointment"
              style={{
                textDecoration: "none",
                display: "block",
                color: "white",
              }}
            >
              Look For A Doctor
            </Link>
          </Button>
          <Button variant="contained" style={buttonStyles}>
            <Link
              to="/appointments"
              style={{
                textDecoration: "none",
                display: "block",
                color: "white",
              }}
            >
              View Your Appointments
            </Link>
          </Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          style={downStyle}
          onClick={scrollBottom}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-90deg-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4z"
            />
          </svg>
        </Button>
      </div>
      <div class="part__2">
        <h1 id="part2__heading">Developed & Designed By:</h1>
        <img src={logo} alt="" id="developer-logo" />
        <Button
          variant="contained"
          color="primary"
          style={downStyle}
          onClick={scrollTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-90deg-up"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default AfterLoginHome;
