import "./my-appointments-style.css";
import logo from "./Swam Devlopment-logos_white.png";
import { Router } from "react-router-dom";
import db from "../firebase";
import React from "react";
import ReactDOM from "react-dom";
import {storage} from "../firebase";
import GooglePayButton from "@google-pay/button-react";
import Modal from "@material-ui/core/Modal";

const MyAppointments = () => {
  const [appointments, setAppointments] = React.useState([]);
  const [rawAppointments, setRawAppointments] = React.useState([]);
  const [link, setLink] = React.useState("appointments");
  const [currentChat, setChat] = React.useState("");

  const [rawCurrentChat, setRawChat] = React.useState("");
  const [paymentModalOpen, setPaymentModalOpen] = React.useState(false);
  const [merchantName, setMerchantName] = React.useState("");
  const [merchantId, setMerchantId] = React.useState("");
  const [paymentValue, setPaymentValue] = React.useState("");
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "BCR2DN6TR663RES2",
      merchantName: "Swapnil Deshmane",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: paymentValue,
      currencyCode: "USD",
      countryCode: "US",
    },
  };
  const loadAppointments = () => {
    const ref = db.ref("/appointments");
    const query = ref
      .orderByChild("paitent")
      .equalTo(JSON.parse(sessionStorage.getItem("loginInfo")).emailId);
    query.on("value", (snapshot) => {
      const array = [];
      const rawAppArray = [];
      snapshot.forEach((snap) => {
        array.push(snap.toJSON());
      });
      setAppointments(array);
      setRawAppointments(snapshot);
    });
  };
  const loadMerchantInfo = () => {
    db.ref("/merchantId").once("value", (snapshot) => {
      setMerchantId(snapshot.val());
    });
    db.ref("/merchantName").on("value", (snapshot) => {
      setMerchantName(snapshot.val());
    });
  };

  React.useEffect(() => {
    loadAppointments();
    loadMerchantInfo();
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
            }}
          >
            <a
              href={`/doctor/${currentChat}`}
              style={{
                textDecoration: "none",
                color: "black",
                display: "block",
                margin: "auto",
              }}
            >
              {currentChat}
            </a>
            <button
              className="btn btn-success"
              style={{
                verticalAlign: "center",
                display: "block",
                margin: "auto",
              }}
              onClick={() => {
                setPaymentModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-coin"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                />
              </svg>
              Pay
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
              marginTop: "-90px",
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

                var key = rawCurrentChat;
                var chatFileNumber;
                db.ref("/appointments")
                  .child(key)
                  .child("chatFileNumber")
                  .on("value", (snapshot) => {
                    chatFileNumber = snapshot.val();
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
              width: "35vw",
              position: "relative",
              height: "60px",
              textAlign: "center",
              fontFamily: "monospace",
              height: "50px",
              outline: "none",
              borderRadius: '10px',
              border: '2px outset black',
              bottom:'30px'
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
              top: "87%",
            }}
            onClick={() => {
              var message = document.getElementById("message").value;

              var key = rawCurrentChat;
              db.ref("/appointments")
                .child(key)
                .child("chats")
                .push({ message: message, user: "paitent" })
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
            color: "white",
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
              marginBottom: "10px",
              boxShadow: "-4px 7px 15px 8px rgba(0,0,0,0.69)",
              "-webkit-box-shadow": "-4px 7px 15px 8px rgba(0,0,0,0.69)",
              "-moz-box-shadow": "-4px 7px 15px 8px rgba(0,0,0,0.69)",
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
            <div class="alert alert-warning" role="alert">
              Dr. {appData.doctor} Pending
            </div>
          );
          elements.push(requestElement);
        }
      });

      return elements;
    }
  };
  return (
    <div className="app__my__appointments">
      <Modal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "block",
          margin: "auto",
          backgroundColor: "rgb(230, 230, 230)",
          color: "white",
          width: "400px",
          height: "400px",
        }}
      >
        <div className="paper" style={{ display: "block", margin: "auto" }}>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              color: "white",
            }}
          >
            Pay Us
          </h1>
          <input
            type="number"
            name="rupees"
            id="rupees"
            placeholder="Enter The Amount In USD"
            onChange={(e) => {
              setPaymentValue(e.target.value);
            }}
            style={{
              display: "block",
              margin: "auto",
              width: "300px",
              height: "40px",
              fontFamily: "poppins",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          />
          <GooglePayButton
            environment="TEST"
            buttonColor="black"
            buttonType="donate"
            buttonSizeMode="fill"
            paymentRequest={paymentRequest}
            onLoadPaymentData={(paymentRequest) => {
              console.log("load payment data", paymentRequest);
            }}
            style={{
              width: "300px",
              height: "40px",
              display: "block",
              margin: "auto",
            }}
          />
        </div>
      </Modal>
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
                    Pending
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

export default MyAppointments;
