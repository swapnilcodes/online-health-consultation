// Imports
import "./doctor-manager-style.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import db from "../firebase";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import emailjs from "emailjs-com";
import ShowErr from "./ShowErr";
import Spinner from "./Spinner";
import { init } from "emailjs-com";
import Message from "./showMessage";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";
import ShowMessage from "./showMessage";

init("user_bii4m9PhtkZ4TEj3oSybu");
const makeDoctors = () => {
  const headingStyle = {
    textAlign: "center",
    color: "black",
    marginTop: "10px",
    fontFamily: "Raleway",
  };
  db.ref("/doctors").on("value", (snapshot) => {
    if (snapshot.toJSON() === null) {
      console.log("No Doctors");
      const headingElem = <h3 style={headingStyle}>No Doctors Yet</h3>;
      ReactDOM.render(headingElem, document.querySelector(".doctors"));
    } else {
      var elements = [];

      snapshot.forEach((snap) => {
        var data = snap.toJSON();
        console.log(data);
        const accordionStyle = {
          display: "block",
          margin: "auto",
          width: "300px",
          height: "auto",
        };

        const element = (
          <Accordion style={accordionStyle} color="primary">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{"Dr. " + data.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {"email Id: " + data.email + "\n type: " + data.type}
              </Typography>
            </AccordionDetails>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                db.ref("/doctors").child(snap.key).remove();
              }}
              style={{ display: "block", margin: "auto" }}
            >
              Delete Doctor
            </button>
          </Accordion>
        );
        elements.push(element);
      });
      ReactDOM.render(elements, document.querySelector(".doctors"));
    }
  });
};

//  Function to render list of types of doctor to the DOM
const listOfDoctors = () => {
  db.ref("/doctor-types").on("value", (snapshot) => {
    var optionElems = [];
    snapshot.forEach((snap) => {
      var doctor = snap.val();
      console.log(doctor);
      var optionElement = (
        <option value={snap.val()} className="type">
          {snap.val()}
        </option>
      );
      optionElems.push(optionElement);
    });
    ReactDOM.render(optionElems, document.querySelector("#types"));
  });
};

// Function to add a type of doctor
const addType = (e) => {
  e.preventDefault();
  var type = document.getElementById("type-field").value;
  db.ref("/doctor-types").push(type);
};
const makeTypes = () => {
  var elements = [];
  const headingStyle = {
    display: "block",
    margin: "auto",
    textAlign: "center",
    color: "black",
    marginTop: "10px",
    fontFamily: "Raleway",
  };
  db.ref("/doctor-types").on("value", (snapshot) => {
    if (snapshot.toJSON() != null) {
      snapshot.forEach((snap) => {
        var type = snap.val();
        const containerStyle = {
          width: "200px",
          display: "block",
          margin: "auto",
          marginTop: "10px",
          marginBottom: "5px",
        };
        var element = (
          <div className="card" style={containerStyle}>
            <div className="card-header">
              <h3 style={headingStyle}>{type}</h3>
            </div>
            <div className="card-body">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  db.ref("/doctor-types").child(snap.key).remove();
                  window.location.reload();
                }}
              >
                Delete Type
              </Button>
            </div>
          </div>
        );
        elements.push(element);
      });
      ReactDOM.render(elements, document.querySelector(".types"));
    } else {
      const element = <h1 style={headingStyle}>No Doctors Yet</h1>;
    }
  });
};

// Function to add A doctor
const addDoctor = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const emailId = document.getElementById("email-id").value;
  const type = document.getElementById("types").value;

  var doctorRef = db.ref("/doctors");
  var doctorQuery = doctorRef.orderByChild("email").equalTo(emailId);
  doctorQuery.once("value", (snapshot) => {
    if (snapshot.toJSON() != null) {
      console.log("A doctor already exists from the specified email id");
      const errElement = (
        <ShowErr message="A doctor already exists from the specified email Id" />
      );
      document.querySelector(".app__doctor__manager").innerHTML = "";
      ReactDOM.render(
        errElement,
        document.querySelector(".app__doctor__manager")
      );
    } else {
      console.log("No doctors exist from the specified email id");

      const otp = parseInt(1000 + Math.random() * 9999);
      emailjs
        .send("service_kbkyeib", "template_klnwvdo", {
          name: name,
          otp: otp,
          userMail: emailId,
        })
        .then(() => {
          console.log("Email sent");

          var formElems = [];
          const buttonStyle = {
            display: "block",
            margin: "auto",
            marginTop: "50px",
            width: "300px",
            height: "40px",
            fontFamily: "monospace",
          };
          const otpFieldStyle = {
            display: "block",
            margin: "auto",
            marginTop: "70px",
            marginBottom: "10px",
            width: "300px",
            height: "40px",
            borderRadius: "10px",
            border: "2px outset grey",
          };
          const otpFieldElement = (
            <input
              type="password"
              label="Enter The OTP sent to your email id"
              style={otpFieldStyle}
              id="enteredOTP"
            />
          );
          const buttonElement = (
            <button
              className="btn btn-success btn-lg"
              style={buttonStyle}
              onClick={() => {
                console.log("verifying");
                console.log(otp);
                var enteredOtp = document.getElementById("enteredOTP").value;
                console.log(enteredOtp);
                if (parseInt(enteredOtp) === otp) {
                  ReactDOM.unmountComponentAtNode(
                    document.querySelector(".app__doctor__manager")
                  );
                  console.log("Correct OTP");
                  var passwordConfirmationElements = [];
                  const PasswordField = (
                    <input
                      type="password"
                      label="Enter The OTP sent to your email id"
                      placeholder="Choose A Password For logging in"
                      style={otpFieldStyle}
                      id="password"
                    />
                  );
                  const proceedButton = (
                    <button
                      className="btn btn-success"
                      style={buttonStyle}
                      onClick={() => {
                        const password =
                          document.getElementById("password").value;
                        var encryptedPassword = CryptoAES.encrypt(
                          password,
                          "online_fat_man"
                        );
                        console.log(encryptedPassword);
                        const doctorInfo = {
                          name: name,
                          email: emailId,
                          type: type,
                          password: encryptedPassword.toString(),
                        };
                        db.ref("/doctors").push(doctorInfo);
                        window.location.reload();
                      }}
                    >
                      Proceed
                    </button>
                  );
                  passwordConfirmationElements.push(PasswordField);
                  passwordConfirmationElements.push(proceedButton);
                  ReactDOM.render(
                    passwordConfirmationElements,
                    document.querySelector(".app__doctor__manager")
                  );
                } else {
                  console.log("Wrong Password");
                }
              }}
            >
              Verify
            </button>
          );
          formElems.push(otpFieldElement);
          formElems.push(buttonElement);
          document.querySelector(".app__doctor__manager").innerHTML = "";
          console.log("clearing elements");
          ReactDOM.render(
            formElems,
            document.querySelector(".app__doctor__manager")
          );
        });
    }
  });
};

// Main component function
const DoctorManager = () => {
  return (
    <div className="app__doctor__manager">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <h1 id="heading">Doctor Manager</h1>
      <form action="#" className="doctorCreator">
        <TextField
          variant="filled"
          label="Enter The Name Of The Doctor"
          className="inputs"
          id="name"
        ></TextField>
        <TextField
          className="inputs"
          variant="filled"
          label="Enter The Email-id of the Doctor"
          id="email-id"
        ></TextField>
        <select name="types" id="types">
          {listOfDoctors()}
        </select>
        <Button color="primary" variant="contained" onClick={addDoctor}>
          Add Doctor
        </Button>
      </form>
      <form action="" className="typeCreator">
        <TextField
          className="inputs"
          variant="filled"
          color="secondary"
          label="Enter The Type"
          id="type-field"
          style={{ width: "250px" }}
        ></TextField>
        <Button
          color="primary"
          variant="contained"
          id="create-type"
          onClick={addType}
        >
          Create Type
        </Button>
      </form>
      <div className="doctors">{makeDoctors()}</div>
      <h1
        id="heading"
        style={{
          marginBottom: "14px",
          marignTop: "70px",
        }}
      >
        Types
      </h1>

      <div className="types">{makeTypes()}</div>
    </div>
  );
};

export default DoctorManager;
