import "./App.css";
import db from "./firebase.js";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";
import Home from "./components/Home";
import CreateAcc from "./components/CreateAcc";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn";
import AfterLoginHome from "./components/AfterLoginHome";
import Logout from "./components/Logout";
import NeedToLogin from "./components/NeedToLogin";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import AdminSettings from "./components/AdminSettings";
import CovidChecker from "./components/CovidChecker";
import DoctorManager from "./components/DoctorManager";
import DoctorLogin from "./components/DoctorLogin";
import DoctorHome from "./components/DoctorHome";
import DoctorProfile from "./components/DoctorProfile";
import Profile from "./components/ClientDoctorProfile";
import Doctors from "./components/Doctors";
import UserProfile from "./components/UserProfile";
import AppointmentBooker from "./components/AppointmentBooker.js";
import MyAppointments from "./components/loadAppointments";
import DoctorAppointments from "./components/DoctorAppointments";
import About from "./components/About";
import CryptoENC from "crypto-js/enc-utf8";
import CryptoAES from "crypto-js/aes";
import funnyImg from "./components/funny-img.jpg";

function loadHome() {
  if (sessionStorage.getItem("loggedIn") != "true") {
    return <Home />;
  } else if (sessionStorage.getItem("loggedIn") == "true") {
    return <AfterLoginHome />;
  }
}
function loadCreateAcc() {
  if (sessionStorage.getItem("loggedIn") != "true") {
    return <CreateAcc />;
  } else if (sessionStorage.getItem("loggedIn") == "true") {
    return <AlreadyLoggedIn />;
  }
}

function loadLogout() {
  if (sessionStorage.getItem("loggedIn") != "true") {
    return <NeedToLogin />;
  } else if (sessionStorage.getItem("loggedIn") == "true") {
    return <Logout />;
  }
}

function loadAdmin() {
  if (
    sessionStorage.getItem("loggedIn") != "true" &&
    sessionStorage.getItem("admin") != "true" &&
    sessionStorage.getItem("doctor") != "true"
  ) {
    return <AdminLogin />;
  } else {
    return <AlreadyLoggedIn />;
  }
}

const loadCovidTestChecker = () => {
  if (sessionStorage.getItem("loggedIn") == "true") {
    return <CovidChecker />;
  } else {
    return <AlreadyLoggedIn />;
  }
};

const loadDoctorLogin = () => {
  if (
    sessionStorage.getItem("doctor") != "true" &&
    sessionStorage.getItem("loggedIn") != "true" &&
    sessionStorage.getItem("admin") != "true"
  ) {
    return <DoctorLogin />;
  } else {
    return <AlreadyLoggedIn />;
  }
};

const loadDoctorHome = () => {
  return <DoctorHome />;
};

const LoadDoctorProfile = () => {
  return <Profile />;
};
const loadDoctorPage = () => {
  return <Doctors />;
};

const loadProfile = () => {
  const encryptedKey = sessionStorage.getItem("userKey");

  if (sessionStorage.getItem("loggedIn") != "true" || encryptedKey == null) {
    return <NeedToLogin />;
  } else {
    const decryptedKey = CryptoAES.decrypt(
      encryptedKey,
      "user__key@swam4782"
    ).toString(CryptoENC);
    if (decryptedKey === "user@@swam@@4782**") {
      return <UserProfile />;
    } else {
      return (
        <div className="masti-nai">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              color: "white",
              marginTop: "30px",
            }}
          >
            Masti Nai bhai se
          </h1>
          <img
            src={funnyImg}
            alt=".."
            style={{
              display: "block",
              margin: "auto",
              marginTop: "40px",
              width: "200px",
              height: "200px",
              boxShadow: "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-webkitBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-mozBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
            }}
          />
        </div>
      );
    }
  }
};

const loadAppointment = () => {
  const encryptedKey = sessionStorage.getItem("userKey");

  if (sessionStorage.getItem("loggedIn") != "true" || encryptedKey == null) {
    return <NeedToLogin />;
  } else {
    const decryptedKey = CryptoAES.decrypt(
      encryptedKey,
      "user__key@swam4782"
    ).toString(CryptoENC);
    if (decryptedKey === "user@@swam@@4782**") {
      return <AppointmentBooker />;
    } else {
      return (
        <div className="masti-nai">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              color: "white",
              marginTop: "30px",
            }}
          >
            Masti Nai bhai se
          </h1>
          <img
            src={funnyImg}
            alt=".."
            style={{
              display: "block",
              margin: "auto",
              marginTop: "40px",
              width: "200px",
              height: "200px",
              boxShadow: "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-webkitBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-mozBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
            }}
          />
        </div>
      );
    }
  }
};

const loadMyAppointments = () => {
  const encryptedKey = sessionStorage.getItem("userKey");
  if (sessionStorage.getItem("loggedIn") != "true" || encryptedKey == null) {
    return <NeedToLogin />;
  } else {
    const decryptedKey = CryptoAES.decrypt(
      encryptedKey,
      "user__key@swam4782"
    ).toString(CryptoENC);
    if (decryptedKey === "user@@swam@@4782**") {
      return <MyAppointments />;
    }
    else{
      return (
        <div className="masti-nai">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              color: "white",
              marginTop: "30px",
            }}
          >
            Masti Nai bhai se
          </h1>
          <img
            src={funnyImg}
            alt=".."
            style={{
              display: "block",
              margin: "auto",
              marginTop: "40px",
              width: "200px",
              height: "200px",
              boxShadow: "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-webkitBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-mozBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
            }}
          />
        </div>
      );
    }
  }
};

const loadAbout = () => {
  return <About />;
};

function App() {
  if (
    sessionStorage.getItem("admin") != "true" &&
    sessionStorage.getItem("doctor") != "true"
  ) {
    return (
      <div className="App">
        <Router className="router">
          <Nav></Nav>
          <Switch>
            <Route path="/about">{loadAbout()}</Route>
            <Route path="/appointments">{loadMyAppointments()}</Route>
            <Route path="/book-appointment">{loadAppointment()}</Route>
            <Route path="/profile">{loadProfile()}</Route>
            <Route path="/doctors">{loadDoctorPage()}</Route>
            <Route path="/doctor/:doctorId">{LoadDoctorProfile()}</Route>
            <Route path="/create-acc">{loadCreateAcc()}</Route>
            <Route path="/logout">{loadLogout()}</Route>
            <Route path="/admin">{loadAdmin()}</Route>
            <Route path="/covid-test-checker">{loadCovidTestChecker()}</Route>
            <Route path="/doctor-login">{loadDoctorLogin()}</Route>
            <Route path="/">{loadHome()}</Route>
          </Switch>
        </Router>
      </div>
    );
  } else if (sessionStorage.getItem("admin") == "true") {
    const encryptedAdminKey = sessionStorage.getItem("adminKey");
    if (encryptedAdminKey != null) {
      const decryptedAdminKey = CryptoAES.decrypt(
        encryptedAdminKey,
        "admin__key@swam"
      ).toString(CryptoENC);
      if (decryptedAdminKey === "admin@swam@@4782**") {
        return (
          <div className="App">
            <Router>
              <Switch>
                <Route path="/doctor-management">
                  <DoctorManager />
                </Route>
                <Route path="/admin-settings">
                  <AdminSettings></AdminSettings>
                </Route>
                <Route path="/">
                  <AdminHome></AdminHome>
                </Route>
              </Switch>
            </Router>
          </div>
        );
      } else {
        return (
          <div className="App">
            <h1
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                color: "white",
                marginTop: "30px",
              }}
            >
              Masti Nai bhai se
            </h1>
            <img
              src={funnyImg}
              alt=".."
              style={{
                display: "block",
                margin: "auto",
                marginTop: "40px",
                width: "200px",
                height: "200px",
                boxShadow: "-10px 11px 5px 0px rgba(0,0,0,0.75)",
                "-webkitBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
                "-mozBoxShadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              }}
            />
          </div>
        );
      }
    } else {
      return (
        <div className="App">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              color: "white",
              marginTop: "30px",
            }}
          >
            Masti Nai bhai se
          </h1>
          <img
            src={funnyImg}
            alt=".."
            style={{
              display: "block",
              margin: "auto",
              marginTop: "40px",
              width: "200px",
              height: "200px",
              boxShadow: "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-webkit-box-shadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-moz-box-shadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
            }}
          />
        </div>
      );
    }
  } else if (sessionStorage.getItem("doctor") === "true") {
    const encryptedDoctorKey = sessionStorage.getItem("doctorKey");
    if (encryptedDoctorKey != null) {
      const decryptedDoctorKey = CryptoAES.decrypt(
        encryptedDoctorKey,
        "doctor__key@swam4782"
      ).toString(CryptoENC);
      if (decryptedDoctorKey === "doctor@@swam@@4782**") {
        return (
          <div className="App">
            <Router>
              <Switch>
                <Route path="/myAppointments">
                  <DoctorAppointments />
                </Route>
                <Route path="/profile">
                  <DoctorProfile />
                </Route>
                <Route path="/home">{loadDoctorHome}</Route>
                <Route path="/">{loadDoctorHome}</Route>
              </Switch>
            </Router>
          </div>
        );
      } else {
        return (
          <div className="App">
            <h1
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                color: "white",
                marginTop: "30px",
              }}
            >
              Masti Nai bhai se
            </h1>
            <img
              src={funnyImg}
              alt=".."
              style={{
                display: "block",
                margin: "auto",
                marginTop: "40px",
                width: "200px",
                height: "200px",
                boxShadow: "-10px 11px 5px 0px rgba(0,0,0,0.75)",
                "-webkit-box-shadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
                "-moz-box-shadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              }}
            />
          </div>
        );
      }
    } else {
      return (
        <div className="App">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              color: "white",
              marginTop: "30px",
            }}
          >
            Masti Nai bhai se
          </h1>
          <img
            src={funnyImg}
            alt=".."
            style={{
              display: "block",
              margin: "auto",
              marginTop: "40px",
              width: "200px",
              height: "200px",
              boxShadow: "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-webkit-box-shadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
              "-moz-box-shadow": "-10px 11px 5px 0px rgba(0,0,0,0.75)",
            }}
          />
        </div>
      );
    }
  }
}

export default App;
