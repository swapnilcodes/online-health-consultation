import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./doctor-login-style.css";
import db from "../firebase";
import ShowErr from "./ShowErr";
import ReactDOM from "react-dom";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";
import Message from "./showMessage";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import { useState } from "react";
import { storage } from "../firebase";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
init("user_bii4m9PhtkZ4TEj3oSybu");

const login = (e) => {
  e.preventDefault();
  const emailId = document.getElementById("email-id").value;
  const enteredPassword = document.getElementById("enteredPassword").value;
  const ref = db.ref("/doctors");
  const query = ref.orderByChild("email").equalTo(emailId);
  query.once("value", (snapshot) => {
    if (snapshot.toJSON() === null) {
      var element = (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Error!</strong>
          Wrong Email id!!
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      );
      ReactDOM.render(element, document.querySelector(".error"));
    } else {
      snapshot.forEach((snap) => {
        var data = snap.toJSON();
        var encryptedPassword = data.password;
        console.log("password: " + encryptedPassword);
        var decryptedPassword = CryptoAES.decrypt(
          encryptedPassword,
          "online_fat_man"
        );
        decryptedPassword = decryptedPassword.toString(CryptoENC);
        if (enteredPassword == decryptedPassword) {
          console.log("Correct Password");

          var name = data.name;
          var emailId = data.email;
          var otp = parseInt(1000 + Math.random() * 9999);
          emailjs
            .send("service_kbkyeib", "template_klnwvdo", {
              name: name,
              otp: otp,
              userMail: emailId,
            })
            .then(() => {
              const buttonStyle = {
                display: "block",
                margin: "auto",
                marginTop: "50px",
                width: "350px",
                height: "40px",
                fontFamily: "monospace",
              };
              const otpFieldStyle = {
                display: "block",
                margin: "auto",
                marginTop: "90px",
                marginBottom: "40px",
                width: "232px",
                outline: "none",
              };

              var formElements = [];
              var otpField = (
                <TextField
                  type="password"
                  id="entered-otp"
                  label="Enter The OTP"
                  variant="outlined"
                  style={otpFieldStyle}
                />
              );
              var submitButton = (
                <button
                  class="btn btn-primary"
                  style={buttonStyle}
                  onClick={() => {
                    console.log("verifying");
                    var enteredOtp =
                      document.getElementById("entered-otp").value;
                    if (parseInt(enteredOtp) === otp) {
                      ReactDOM.unmountComponentAtNode(
                        document.querySelector(".app__doctor__login")
                      );
                      if (data.first == "false") {
                        sessionStorage.setItem("doctor", "true");
                        sessionStorage.setItem(
                          "loginInfo",
                          JSON.stringify(data)
                        );
                        const encryptedKey = CryptoAES.encrypt(
                          "doctor@@swam@@4782**",
                          "doctor__key@swam4782"
                        ).toString();
                        sessionStorage.setitem('doctorKey', encryptedKey);
                        const element = (
                          <Message message={"Welcome dr. " + data.name} />
                        );
                        ReactDOM.render(
                          element,
                          document.querySelector(".app__doctor__login")
                        );
                      } else {
                        const profilePhotoElements = [];
                        const parentStyle = {
                          display: "block",
                          margin: "auto",
                          marginTop: "50px",
                          width: "400px",
                          height: "400px",
                          border: "1px solid black",
                          borderRadius: "10px",
                        };

                        const parentElement = (
                          <div className="parent" style={parentStyle}></div>
                        );
                        ReactDOM.render(
                          parentElement,
                          document.querySelector(".app__doctor__login")
                        );
                        const buttonStyle = {
                          display: "block",
                          margin: "auto",
                          width: "250px",
                          height: "40px",

                          fontFamily: "monospace",
                          marginTop: "70px",
                          borderRadius: "10px",
                          border: "none",
                        };
                        const fileInputStyle = {
                          display: "none",
                        };
                        const labelStyle = {
                          border: "1px solid #ccc",
                          display: "flex",
                          fontFamily: "monospace",
                          margin: "auto",
                          padding: "6px 12px",
                          cursor: "pointer",
                          width: "300px",
                          height: "60px",
                          marginTop: "40px",
                          alignItems: "center",
                          flexDirection: "column",
                        };
                        var profilePhoto = "";
                        const fileInput = (
                          <label style={labelStyle} id="file-label">
                            Select a profile Photo
                            <AccountBoxIcon />
                            <input
                              type="file"
                              name="image"
                              id="image"
                              accept="image/*"
                              style={fileInputStyle}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                document.getElementById(
                                  "file-label"
                                ).innerText = "Click To Change Profile Photo";
                                profilePhoto = file;
                              }}
                            />
                          </label>
                        );

                        profilePhotoElements.push(fileInput);
                        const submitButton = (
                          <button
                            class="btn btn-primary"
                            onClick={() => {
                              var img = document.getElementById("image");
                              var imgAsFile = profilePhoto;
                              if (profilePhoto === "") {
                                alert("Please Select A Profile Photo");
                              } else {
                                var uploadTask = storage
                                  .ref(`/doctorProfilePhotos/${data.email}`)
                                  .put(imgAsFile);
                                uploadTask.on(
                                  "state_changed",
                                  (snapshot) => {
                                    console.log(snapshot);
                                  },
                                  (err) => {
                                    console.log(err);
                                  },
                                  () => {
                                    storage
                                      .ref("/doctorProfilePhotos/")
                                      .child(data.email)
                                      .getDownloadURL()
                                      .then((url) => {
                                        data.profilePhotoURL = url;
                                        ReactDOM.unmountComponentAtNode(
                                          document.querySelector(".parent")
                                        );
                                        const bioElements = [];
                                        const textAreaStyle = {
                                          display: "block",
                                          margin: "auto",
                                          width: "300px",
                                          height: "200px",
                                          marginTop: "30px",
                                          fontFamily: "monospace",
                                        };
                                        const bioElement = (
                                          <textarea
                                            name="bio"
                                            id="bio"
                                            cols="30"
                                            rows="10"
                                            style={textAreaStyle}
                                          >
                                            Enter Your Bio
                                          </textarea>
                                        );
                                        const confirmButton = (
                                          <button
                                            style={buttonStyle}
                                            class="btn btn-primary"
                                            onClick={() => {
                                              var bio =
                                                document.getElementById(
                                                  "bio"
                                                ).value;
                                              if (bio === "") {
                                                alert(
                                                  "You Need to enter a Bio"
                                                );
                                              } else {
                                                data.bio = bio;
                                                data.first = "false";
                                                db.ref("/doctors")
                                                  .child(snap.key)
                                                  .update(data)
                                                  .then(() => {
                                                    const welcomeElement = (
                                                      <Message
                                                        message={
                                                          "Welcome " + data.name
                                                        }
                                                      />
                                                    );
                                                    sessionStorage.setItem(
                                                      "doctor",
                                                      "true"
                                                    );
                                                    sessionStorage.setItem(
                                                      "loginInfo",
                                                      JSON.stringify(data)
                                                    );
                                                    ReactDOM.unmountComponentAtNode(
                                                      document.querySelector(
                                                        ".app__doctor__login"
                                                      )
                                                    );
                                                    ReactDOM.render(
                                                      welcomeElement,
                                                      document.querySelector(
                                                        ".app__doctor__login"
                                                      )
                                                    );
                                                  });
                                              }
                                            }}
                                          >
                                            Proceed
                                          </button>
                                        );
                                        bioElements.push(bioElement);
                                        bioElements.push(confirmButton);
                                        ReactDOM.render(
                                          bioElements,
                                          document.querySelector(".parent")
                                        );
                                      });
                                  }
                                );
                              }
                            }}
                            style={buttonStyle}
                          >
                            Proceed
                          </button>
                        );
                        profilePhotoElements.push(submitButton);
                        ReactDOM.render(
                          profilePhotoElements,
                          document.querySelector(".parent")
                        );
                      }
                    } else {
                      const element = <ShowErr message="Wrong OTP" />;
                      ReactDOM.render(
                        element,
                        document.querySelector(".app__doctor__login")
                      );
                    }
                  }}
                >
                  Verify
                </button>
              );
              formElements.push(otpField);
              formElements.push(submitButton);
              document.querySelector(".app__doctor__login").innerHTML = "";

              ReactDOM.render(
                formElements,
                document.querySelector(".app__doctor__login")
              );
            });
        } else {
          var element = (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Error!</strong>
              Wrong Password!!
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          );
          ReactDOM.render(element, document.querySelector(".error"));
        }
      });
    }
  });
};

const DoctorLogin = () => {
  return (
    <div className="app__doctor__login" onSubmit={login}>
      <h1 id="heading">Login As Doctor</h1>
      <h4 id="error"></h4>
      <div className="error"></div>
      <form action="#" id="doctor__login__form">
        <TextField
          variant="filled"
          color="primary"
          type="email"
          label="Enter Your Registered Email id"
          className="inputs"
          id="email-id"
        />
        <TextField
          variant="filled"
          color="primary"
          type="password"
          label="Enter Your Password"
          className="inputs"
          id="enteredPassword"
        />
        <Button variant="contained" color="primary" type="submit" id="login">
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default DoctorLogin;
