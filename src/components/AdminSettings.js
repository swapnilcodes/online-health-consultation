// Imports
import "./admin-settings-style.css";
import Button from "@material-ui/core/Button";
import db from "../firebase";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Spinner from "./Spinner";
import Message from "./showMessage";
import ShowErr from "./ShowErr";

// Function For Showing All Doctors
const showDoctors = () => {
  document.querySelector(".App").innerHTML = "";
  var doctorsExists = false;
  const btnStyle = {
    position: "absolute",
    top: "30px",
    left: "30px",
    width: "100px",
    height: "30px",
  };

  db.ref("/doctors").on("value", (snapshot) => {
    const btnElement = (
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
        style={btnStyle}
      >
        Back
      </Button>
    );

    const elementStyle = {
      textAlign: "center",
      color: "blue",
      position: "static",
      display: "block",
      margin: "auto",
      marginTop: "40px",
      fontFamily: "Montserrat",
    };
    const elements = [];
    snapshot.forEach((snap) => {
      doctorsExists = true;
      var data = snap.toJSON();
      console.log(data);
      var elem = <h1 style={elementStyle}>{data.name}</h1>;
      elements.push(elem);
    });
    elements.push(
      <Button
        variant="contained"
        color="primary"
        style={btnStyle}
        onClick={() => window.location.reload()}
      >
        Back
      </Button>
    );
    if (doctorsExists) {
      ReactDOM.render(elements, document.querySelector(".App"));
    }
  });
  console.log(doctorsExists);
  if (!doctorsExists) {
    console.log("no doctors");
    const headingStyle = {
      textAlign: "center",
      color: "blue",
      position: "static",
      display: "block",
      margin: "auto",
      marginTop: "40px",
      fontFamily: "Montserrat",
    };
    const elements = [
      <h1 style={headingStyle}>No Doctors Added Yet</h1>,
      <Button
        variant="contained"
        style={btnStyle}
        color="primary"
        onClick={() => window.location.reload()}
      >
        Back
      </Button>,
    ];

    ReactDOM.render(elements, document.querySelector(".App"));
  }
};

// Function For Showing All Users
const showUsers = (e) => {
  e.preventDefault();
  document.querySelector(".App").innerHTML = "";
  db.ref("/users").on("value", (snapshot) => {
    var usersExists = false;
    const elementStyle = {
      textAlign: "center",
      color: "blue",
      position: "static",
      display: "block",
      margin: "auto",
      marginTop: "40px",
      fontFamily: "Montserrat",
    };
    const elements = [];
    snapshot.forEach((snap) => {
      usersExists = true;
      var data = snap.toJSON();
      var elem = <h1 style={elementStyle}>{data.name}</h1>;
      elements.push(elem);
    });
    const btnStyle = {
      position: "absolute",
      top: "30px",
      left: "30px",
      width: "100px",
      height: "30px",
    };
    const btnElement = (
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
        style={btnStyle}
      >
        Back
      </Button>
    );
    elements.push(btnElement);
    if (!usersExists) {
      const noUserElement = <h1 style={elementStyle}>No Users Yet...</h1>;
      elements.push(noUserElement);
    }
    ReactDOM.render(elements, document.querySelector(".App"));
  });
};

// Function for changing admin password
const changePassword = (e) => {
  e.preventDefault();
  const TextFieldStyle = {
    marginTop: "20px",
    marginBottom: "40px",
  };
  const elementStyle = {
    textAlign: "center",
    color: "blue",
    position: "static",
    marginTop: "10px",
    fontFamily: "Montserrat",
    marginBottom: "40px",
  };
  const formStyle = {
    display: "flex",
    alignItems: "center",
    padding: "0px",
    flexDirection: "column",
  };

  var password;
  db.ref("/admin-password").on("value", (data) => {
    password = data.val();
    console.log("Declared Password: " + password);
  });
  document.querySelector(".app__admin__settings").innerHTML = "";
  ReactDOM.render(
    <form id="password__ver" action="#" style={formStyle}></form>,
    document.querySelector(".app__admin__settings")
  );
  var formElems = [];
  const verification = <h3 style={elementStyle}>Password Verification</h3>;
  formElems.push(verification);
  const oldPasswordField = (
    <TextField
      variant="filled"
      label="Enter OLD Password"
      id="old-password"
      style={TextFieldStyle}
      type="password"
    ></TextField>
  );
  formElems.push(oldPasswordField);

  const newPasswordField = (
    <TextField
      variant="filled"
      label="Enter New Password"
      id="new-password"
      type="password"
      style={TextFieldStyle}
    ></TextField>
  );
  formElems.push(newPasswordField);
  const changePasswordButton = (
    <Button
      variant="outlined"
      color="primary"
      onClick={(e) => {
        e.preventDefault();
        let oldPassword = document.getElementById("old-password").value;
        let newPassword = document.getElementById("new-password").value;
        document.querySelector(".app__admin__settings").innerHTML = "";
        const spinnerElement = <Spinner />;
        ReactDOM.render(
          spinnerElement,
          document.querySelector(".app__admin__settings")
        );
        if (oldPassword === password) {
          console.log("Updating Password");
          db.ref("/admin-password")
            .set(newPassword)
            .then(() => {
              console.log("Password Updated");
              document.querySelector(".app__admin__settings").innerHTML = "";
              const msgElement = (
                <Message message="Password Updated" user="admin" />
              );

              ReactDOM.render(msgElement, document.querySelector(".App"));
            });
        }
      }}
    >
      Change Password
    </Button>
  );
  formElems.push(changePasswordButton);
  ReactDOM.render(formElems, document.querySelector("#password__ver"));
};

// Main component
const AdminSettings = () => {
  return (
    <div className="app__admin__settings">
      <h1 id="admin__settings__heading">Admin Settings</h1>
      <Button variant="contained" id="view-doctors" onClick={showDoctors}>
        View Doctors
      </Button>
      <Button variant="contained" id="view-users" onClick={showUsers}>
        View Users
      </Button>
      <Button variant="contained" id="change-password" onClick={changePassword}>
        Change Admin Password
      </Button>
    </div>
  );
};

export default AdminSettings;
