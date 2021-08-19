import "./appointment-booker-style.css";
import db from "../firebase";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import ShowErr from "./ShowErr";

const loadTypes = () => {
  const elements = [];
  db.ref("/doctor-types").on("value", (snapshot) => {
    snapshot.forEach((snap) => {
      const typeData = snap.val();
      const element = <option value={typeData}>{typeData}</option>;
      elements.push(element);
    });
    ReactDOM.render(elements, document.querySelector("#needed-doctor"));
  });
};

const proceed = () => {
  const neededDoctor = document.getElementById("needed-doctor").value;
  const ref = db.ref("/doctors");
  const secondQuery = ref.orderByChild("type").equalTo(neededDoctor);
  document.querySelector(".app__appointment__booker").innerHTML = "";

  secondQuery.on("value", (snapshot) => {
    const elements = [];
    if (snapshot.toJSON() != null) {
      snapshot.forEach((snap) => {
        const doctorData = snap.toJSON();
        if (doctorData.first == "false") {
          const element = (
            <div
              class="card"
              style={{
                width: "300px",
                height: "auto",
                display: "block",
                margin: "auto",
                marginTop: "30px",
              }}
            >
              <img
                src={doctorData.profilePhotoURL}
                class="card-img-top"
                alt="..."
                style={{ height: "60%" }}
              />
              <hr style={{ margin: "0px" }} />
              <div class="card-body" style={{ height: "40%" }}>
                <h5 class="card-title" style={{ fontFamily: "poppins" }}>
                  {doctorData.name}
                </h5>
                <p class="card-text" style={{ fontFamily: "poppins" }}>
                  {doctorData.bio}
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const appointmentData = {
                      doctor: doctorData.email,
                      paitent: JSON.parse(sessionStorage.getItem("loginInfo"))
                        .emailId,
                      doctorType: doctorData.type,
                      aproved: "false",
                      chatFileNumber: 0,
                    };
                    const ref = db.ref("/appointments");
                    const query = ref
                      .orderByChild("paitent")
                      .equalTo(
                        JSON.parse(sessionStorage.getItem("loginInfo")).emailId
                      );
                    query.on("value", (snapshot) => {
                      if (snapshot.toJSON() == null) {
                        db.ref("/appointments")
                          .push(appointmentData)
                          .then(() => {
                            window.location = "/appointments";
                          });
                      } else {
                        snapshot.forEach((snap) => {
                          if (snap.toJSON().doctor == doctorData.email) {
                            console.log("Already Exists");
                            const errElement = (
                              <ShowErr message="The Following Appointment Already Exists Visit /appointments to view your appointments" />
                            );
                            document.querySelector(".App").innerHTML = "";
                            ReactDOM.render(
                              errElement,
                              document.querySelector(".App")
                            );
                          } else {
                            db.ref("/appointments")
                              .push(appointmentData)
                              .then(() => {
                                window.location = "/appointments";
                              });
                          }
                        });
                      }
                    });
                  }}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          );
          elements.push(element);
        } else {
          const element = (
            <h1
              style={{
                fontFamily: "poppins",
                marginTop: "20px",
                marginBottom: "70px",
              }}
            >
              No Doctors Available
            </h1>
          );
          const ButtonElement = (
            <Button
              variant="contained"
              color="primary"
              onClick={{
                display: "block",
                margin: "auto",
                width: "300px",
                height: "40px",
              }}
            >
              Reload Page
            </Button>
          );
          elements.push(element);
          elements.push(ButtonElement);
        }
      });
    } else {
      const element = (
        <h1
          style={{
            fontFamily: "poppins",
            marginTop: "20px",
            marginBottom: "70px",
            textAlign: "center",
          }}
        >
          No Doctors Available
        </h1>
      );
      const ButtonElement = (
        <Button
          variant="contained"
          color="primary"
          style={{
            display: "block",
            margin: "auto",
            width: "300px",
            height: "40px",
          }}
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload Page
        </Button>
      );
      elements.push(element);
      elements.push(ButtonElement);
    }
    ReactDOM.render(
      elements,
      document.querySelector(".app__appointment__booker")
    );
  });
};

const AppointmentBooker = () => {
  return (
    <div className="app__appointment__booker">
      <h1 id="appointment-heading">Which Type Of Doctor Do You Need</h1>
      <select name="needed-doctor" id="needed-doctor">
        {loadTypes()}
      </select>
      <Button
        variant="contained"
        color="primary"
        id="continue"
        onClick={proceed}
      >
        Continue
      </Button>
    </div>
  );
};

export default AppointmentBooker;
