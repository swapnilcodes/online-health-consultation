import "./create-acc-style.css";
import { auth, provider } from "../firebase.js";
import db from "../firebase.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Message from "./showMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import ShowErr from "./ShowErr";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";
import reactDom from "react-dom";

var accountsExist = false;
function showSpinner() {
  let spinner = <Spinner />;
  document.querySelector(".App").innerHTML = "";
  ReactDOM.render(spinner, document.querySelector(".App"));
}
const googleSignUp = (event) => {
  event.preventDefault();
  auth
    .signInWithPopup(provider)
    .then((user) => {
      user = user.user;
      console.log(user);
      var name = user.displayName;
      var emailId = user.email;
      var profilePhotoUrl = user.photoURL;
      console.log(name);
      var userInfo = {
        name: name,
        emailId: emailId,
        profilePhotoURL: profilePhotoUrl,
        google: "true",
      };
      db.ref("users").on("value", (snapshot) => {
        console.log("taking snapshot");
        snapshot.forEach((snap) => {
          console.log("finding accounts");
          if (snap.toJSON().emailId == emailId) {
            accountsExist = true;
            console.log(accountsExist, "account Exists");
            console.log(snap.toJSON().google);
            if (snap.toJSON().google == "true") {
              console.log("account matching");
              if (
                snap.toJSON().name == userInfo.name &&
                snap.toJSON().profilePhotoURL == userInfo.profilePhotoURL
              ) {
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("loginInfo", JSON.stringify(userInfo));
                document.querySelector(".App").innerHTML = "";
                let message = `Welcome ${userInfo.name}`;
                console.log(message);
                const msgElement = <Message message={message} />;
                ReactDOM.render(msgElement, document.querySelector(".App"));
              } else {
                showSpinner();
                db.ref("/users")
                  .child(snap.toJSON().key)
                  .update(userInfo)
                  .then(() => {
                    document.querySelector(".App").innerHTML = "";
                    let message = `Welcome ${userInfo.name}`;
                    const msgElement = <Message message={message} />;
                    ReactDOM.render(msgElement, document.querySelector(".App"));
                  });
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("loginInfo", JSON.stringify(userInfo));
              }
            } else {
              const errElement = (
                <ShowErr message="You Already Have a Email & Password Account from the giver email id" />
              );
              ReactDOM.render(errElement, document.querySelector(".App"));
            }
          }
        });
        if (!accountsExist) {
          console.log(accountsExist);
          showSpinner();
          db.ref("/users")
            .push(userInfo)
            .then(() => {
              const encryptedKey = CryptoAES.encrypt(
                "user@@swam@@4782**",
                "user__key@swam4782"
              ).toString();
              sessionStorage.setItem('userKey', encryptedKey);
              sessionStorage.setItem("loggedIn", "true");
              sessionStorage.setItem("loginInfo", JSON.stringify(userInfo));
              
              let message = `Welcome ${userInfo.name}`;
              const msgElement = <Message message={message} />;
              document.querySelector(".App").innerHTML = "";
              ReactDOM.render(msgElement, document.querySelector("#root"));
            })
            .catch((err) => {
              let errorElement = <ShowErr message={err.message} />;
              ReactDOM.render(errorElement, document.querySelector("#root"));
            });
        }
      });
    })
    .catch((err) => {
      document.querySelector(".App").innerHTML = "";
      const errorElement = <ShowErr message={err.message} />;
      ReactDOM.render(errorElement, document.querySelector(".App"));
    });
};

const CreateAcc = () => {
  return (
    <div className="create__acc">
      <form action="#" className="form" id="form">
        <button className="login" onClick={googleSignUp}>
          <img src="https://img.icons8.com/plasticine/100/000000/google-logo.png" />
        </button>

        <h3 id="sub">Click to login with google</h3>
      </form>
    </div>
  );
};

export default CreateAcc;
