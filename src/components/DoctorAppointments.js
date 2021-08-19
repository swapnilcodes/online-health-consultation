import "./doctor-appointments-style.css";
import React from "react";
import logo from "./Swam Devlopment-logos_white.png";
import db from "../firebase";
import { useHistory } from "react-router";
import { storage } from "../firebase";
import Modal from "@material-ui/core/Modal";
import ReactDOM from "react-dom";
import Link from "react-router-dom";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = React.useState([]);
  const [link, setLink] = React.useState("appointments");
  const [rawAppointments, setRawAppointments] = React.useState([]);

  const [currentChat, setChat] = React.useState("");
  const [rawCurrentChat, setRawChat] = React.useState("");
  const loadAppointments = () => {
    const ref = db.ref("/appointments");
    const query = ref
      .orderByChild("doctor")
      .equalTo(JSON.parse(sessionStorage.getItem("loginInfo")).email);
    query.on("value", (snapshot) => {
      const array = [];
      const rawArray = [];
      snapshot.forEach((snap) => {
        array.push(snap.toJSON());
        rawArray.push(snap);
      });
      setAppointments(array);
      setRawAppointments(rawArray);
    });
  };
  React.useEffect(() => {
    loadAppointments();
  }, []);

  const RenderMessages = () => {
    var chatRef;
    const msgElements = [];
    chatRef = db.ref("/appointments").child(rawCurrentChat).child("/chats");
    chatRef.once("value", (snapshot) => {
      snapshot.forEach((snap) => {
        if (snap.toJSON() === null) {
          console.log("no Messages");
          return msgElements;
        } else {
          console.log("message found", snap.toJSON());
          if (snap.toJSON().user === "paitent") {
            console.log("rendering");
            if (snap.toJSON().type === "file") {
              const msgElement = (
                <div
                  className="msg"
                  style={{
                    display: "block",
                    width: "100px",
                    backgroundColor: "grey",
                    color: "white",
                    fontFamily: "poppins",
                    padding: "10px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                  }}
                >
                  <a href={snap.toJSON().fileURL} target="_blank">
                    View File
                  </a>
                </div>
              );
              msgElements.push(msgElement);
            } else {
              const msgElement = (
                <div
                  className="msg"
                  style={{
                    display: "block",
                    width: "100px",
                    backgroundColor: "grey",
                    color: "white",
                    fontFamily: "poppins",
                    padding: "10px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                  }}
                >
                  {snap.toJSON().message}
                </div>
              );
              msgElements.push(msgElement);
            }
          } else {
            if (snap.toJSON().type === "file") {
              const msgElement = (
                <div
                  className="msg"
                  style={{
                    display: "block",
                    width: "100px",
                    backgroundColor: "grey",
                    color: "white",
                    fontFamily: "poppins",
                    padding: "10px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                  }}
                >
                  <a href={snap.toJSON().fileURL} target="_blank">
                    View File
                  </a>
                </div>
              );
              msgElements.push(msgElement);
            } else {
              const msgElement = (
                <div
                  style={{
                    display: "block",
                    width: "100px",
                    backgroundColor: "rgb(210, 210, 210)",
                    color: "black",
                    fontFamily: "poppins",
                    padding: "10px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                  }}
                >
                  {snap.toJSON().message}
                </div>
              );
              msgElements.push(msgElement);
            }
          }
          console.log("returning");
          console.log("msgElements", msgElements);
        }
      });
    });
    return msgElements;
  };
  
  const renderChatting = () => {
    if (currentChat != "") {
      const element = (
        <div className="chatting">
          <div
            className="header"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "rgba(200, 200, 200)",
              color: "black",
              fontFamily: "poppins",
              textAlign: "center",
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4 style={{ display: "block" }}>{currentChat}</h4>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "20px" }}
              onClick={() => {
                window.open("https:meet.google.com/new");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-camera-video-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
                />
              </svg>
            </button>
          </div>
          <div
            className="chat_container"
            id="chats"
            style={{
              display: "flex",
              overflowY: "scroll",
              height: "300px",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "40px",
            }}
          >
            {RenderMessages()}
          </div>
          <label
            className="btn btn-success"
            style={{
              width: "60px",
              height: "40px",
              fontFamily: "poppins",
              marginLeft: "10px",
              marginTop: "-30px",
              marginRight: "10px",
            }}
          >
            File
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                const ref = db.ref("/appointments");
                const query = ref
                  .orderByChild("doctor")
                  .equalTo(
                    JSON.parse(sessionStorage.getItem("loginInfo")).email
                  );
                var key;
                var chatFileNumber;
                query.once("value", (snapshot) => {
                  snapshot.forEach((snap) => {
                    const appData = snap.toJSON();
                    if (appData.paitent == currentChat) {
                      key = snap.key;
                      chatFileNumber = appData.chatFileNumber;
                    }
                  });
                });
                const uploadTask = storage
                  .ref("/appointment-files")
                  .child(key)
                  .child(`file-${chatFileNumber}`)
                  .put(file);
                uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                    console.log(snapshot);
                  },
                  (err) => {
                    alert(err.message);
                  },
                  () => {
                    storage
                      .ref("/appointment-files")
                      .child(key)
                      .child(`file-${chatFileNumber}`)
                      .getDownloadURL()
                      .then((url) => {
                        db.ref("/appointments")
                          .child(key)
                          .child("chats")
                          .push({ user: "doctror", type: "file", fileURL: url })
                          .then(() => {
                            db.ref("/appointments")
                              .child(key)
                              .child("chatFileNumber")
                              .set(chatFileNumber + 1)
                              .then(() => {
                                alert("successs");
                              });
                          });
                      });
                  }
                );
              }}
            />
          </label>
          <textarea
            placeholder="Enter The Message"
            style={{
              width: "40vw",
              position: "absolute",
              top: "75vh",
              height: "60px",
              textAlign: "center",
              fontFamily: "monospace",
              height: "50px",
              outline: "none",
            }}
            id="message"
          />
          <button
            className="btn btn-secondary"
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "10%",
              top: "75%",
            }}
            onClick={() => {
              var message = document.getElementById("message").value;

              const ref = db.ref("/appointments");
              const query = ref
                .orderByChild("doctor")
                .equalTo(JSON.parse(sessionStorage.getItem("loginInfo")).email);
              var key;
              query.once("value", (snapshot) => {
                snapshot.forEach((snap) => {
                  const appData = snap.toJSON();
                  if (appData.paitent == currentChat) {
                    key = snap.key;
                  }
                });
              });
              db.ref("/appointments")
                .child(key)
                .child("chats")
                .push({ message: message, user: "doctor" })
                .then(() => {
                  console.log("message sent");
                  document.getElementById("message").value = "";
                });
            }}
          >
            <img
              src="https://img.icons8.com/plumpy/48/000000/filled-sent.png"
              style={{
                width: "20px",
                height: "20px",
                display: "block",
                margin: "auto",
              }}
            />
          </button>
        </div>
      );
      return element;
    } else {
      const element = (
        <div
          className="select"
          style={{
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              marginTop: "50px",
            }}
          >
            Click On a appointment to start chatting
          </h3>
        </div>
      );
      return element;
    }
  };

  const mapChats = (chats, rawChats) => {
    const elements = [];
    rawChats.forEach((chat) => {
      const chatElement = (
        <div
          className="chat"
          style={{
            width: "100%",
            height: "60px",
            cursor: "pointer",
            textAlign: "center",
            fontFamily: "poppins",
            fontSize: "large",
            borderBottom: "1px solid black",
            display: "flex",
            alignContent: "center",
            verticalAlign: "center",
            paddingTop: "10px",
            overflowX: "hidden",
            transitionProperty: "all",
            transitionDelay: "0.2s",
            transitionDuration: "0.7s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgb(200, 200, 200)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgb(230, 230, 230)";
          }}
          onClick={() => {
            setChat(chat.toJSON().doctor);
            setRawChat(chat.key);
          }}
        >
          {chat.toJSON().doctor}
        </div>
      );
      elements.push(chatElement);
    });
    return elements;
  };
  const renderLinks = () => {
    if (link === "appointments") {
      console.log("link is appointments");
      const elements = [];
      const element = (
        <h1
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontFamily: "poppins",
          }}
        >
          Appointments
        </h1>
      );
      elements.push(element);

      const selectedAppointments = [];
      appointments.forEach((appointment) => {
        if (appointment.aproved === "false") {
          console.log("No Appointments");
        } else {
          selectedAppointments.push(appointment);
        }
      });
      const rawSelectedAppointments = [];
      rawAppointments.forEach((snap) => {
        if (snap.toJSON().aproved === "false") {
          console.log("aproved nai hai bhai");
        } else {
          rawSelectedAppointments.push(snap);
        }
      });
      if (selectedAppointments.length === 0) {
        const noAppointmentElement = (
          <h3
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontFamily: "Open Sans",
            }}
          >
            No Appointments
          </h3>
        );
        elements.push(noAppointmentElement);
      } else {
        const sidebar = (
          <div
            className="sidebar"
            style={{
              display: "block",
              width: "30%",
              height: "60vh",
              backgroundColor: "rgb(230, 230, 230)",
              borderRight: "1px solid black",
            }}
          >
            {mapChats(selectedAppointments, rawSelectedAppointments)}
          </div>
        );
        const messengerDiv = (
          <div
            className="messenger"
            style={{
              width: "70%",
              float: "right",
              height: "60vh",
              display: "block",
            }}
          >
            <hr />
            {renderChatting()}
          </div>
        );
        const mainDiv = (
          <div
            className="main"
            style={{
              width: "95vw",
              height: "60vh",
              display: "flex",
              margin: "auto",
              backgroundColor: "rgb(240, 240, 240)",
              boxShadow: "grey 5px 1px",
              marginBottom: "10px",
            }}
          >
            {sidebar}
            {messengerDiv}
          </div>
        );
        elements.push(mainDiv);
      }
      return elements;
    } else if (link === "pending") {
      const elements = [];
      const element = (
        <h1
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontFamily: "poppins",
          }}
        >
          Pending
        </h1>
      );
      elements.push(element);

      const appointmentData = appointments;
      appointmentData.forEach((appData) => {
        if (appData.aproved == "false") {
          const requestElement = (
            <div class="alert alert-info" role="alert">
              <h3
                style={{
                  fontFamily: "poppins",
                  display: "inline",
                  marginLeft: "20px",
                  marginRight: "40px",
                }}
              >
                {appData.paitent}
              </h3>
              <button
                className="btn btn-outline-info"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  const query = db
                    .ref("/appointments")
                    .orderByChild("paitent")
                    .equalTo(appData.paitent);
                  query.on("value", (snapshot) => {
                    snapshot.forEach((snap) => {
                      if (snap.toJSON().doctor == appData.doctor) {
                        db.ref("/appointments")
                          .child(snap.key)
                          .update({ aproved: "true" })
                          .then(() => {
                            console.log("aproved");
                          });
                      }
                    });
                  });
                }}
              >
                <img src="https://img.icons8.com/ultraviolet/40/000000/checked-2.png" />
              </button>
              <button className="btn btn-outline-danger">
                <img src="https://img.icons8.com/wired/64/000000/close-window.png" />
              </button>
            </div>
          );
          elements.push(requestElement);
        }
      });

      return elements;
    } else if (link === "payments") {
      const elements = [];
      const element = (
        <h1
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontFamily: "poppins",
          }}
        >
          Payments
        </h1>
      );
      elements.push(element);
      return elements;
    }
  };
  return (
    <div className="app__my__appointments">
      <div className="appointment__body">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src={logo}
                alt=".."
                style={{ width: "60px", height: "60px" }}
              />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a
                    class="nav-link bottom-active"
                    aria-current="page"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setLink("appointments");
                      console.log(link);
                      document.querySelector(".bottom-active").classList =
                        "nav-link";
                      e.target.classList = "nav-link bottom-active";
                    }}
                  >
                    Your Appointments
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setLink("pending");
                      console.log(link);
                      document.querySelector(".bottom-active").classList =
                        "nav-link";
                      e.target.classList = "nav-link bottom-active";
                    }}
                  >
                    Requests
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setLink("payments");
                      console.log(link);
                      document.querySelector(".bottom-active").classList =
                        "nav-link";
                      e.target.classList = "nav-link bottom-active";
                    }}
                  >
                    Payments
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr style={{ height: "4px", margin: "0px" }} />
        <div className="app__appointment__main">{renderLinks()}</div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
