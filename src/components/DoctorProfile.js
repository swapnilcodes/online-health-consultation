import "./doctor-profile-style.css";
import { storage } from "../firebase";
import ReactDOM from "react-dom";
import PostUploader from "./PostUploader";
import db from "../firebase";
import Modal from "@material-ui/core/Modal";

const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));

const getProfilePhoto = () => {
  return loginInfo.profilePhotoURL;
};
const getName = () => {
  return loginInfo.name;
};
const getEmailId = () => {
  return loginInfo.email;
};
const getBio = () => {
  var bio = loginInfo.bio;

  return bio;
};

const getPosts = () => {
  const ref = db.ref("/posts");
  const query = ref.orderByChild("userEmail").equalTo(getEmailId());
  query.on("value", (snapshot) => {
    const headingStyle = {
      textAlign: "center",
      fontFamily: "Montserrat",
      marginTop: "-30px",
    };
    if (snapshot.toJSON() == null) {
      console.log("null");
      const element = <h1 style={headingStyle}>No Posts</h1>;
      ReactDOM.render(element, document.querySelector(".posts"));
    } else {
      console.log("not null");
      const thumbnailElementArray = [];

      snapshot.forEach((snap) => {
        var postData = snap.toJSON();
        console.log(postData);
        const thumbnailStyle = {
          display: "block",
          margin: "auto",
          width: "200px",
          height: "200px",
          marginTop: "-40px",
          marginBottom: "50px",
          cursor: "pointer",
          border: "2px solid grey",
          borderRadius: "10px",
        };

        const thumbnailElement = (
          <img
            src={postData.thumbnailURL}
            alt="No thumbnail"
            style={thumbnailStyle}
            onClick={() => {
              var close = false;
              const videoElement = (
                <Modal
                  aria-labelledby="Post"
                  style={{
                    display: "block",
                    margin: "auto",
                    zIndex: "1",
                    width: "400px",
                    height: "400px",
                  }}
                  open={true}
                  id="modal"
                  disableEnforceFocus
                >
                  <video
                    src={postData.postURL}
                    controls
                    style={{ zIndex: "1", width: "400px", height: "400px" }}
                  ></video>
                </Modal>
              );
              const elements = [];

              const closeButton = (
                <button
                  className="btn btn-danger"
                  style={{
                    position: "absolute",
                    zIndex: "2",
                    top: "40px",
                    left: "30px",
                    width: "100px",
                    height: "40px",
                    fontFamily: "monospace",
                  }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Close
                </button>
              );
              elements.push(videoElement);
              elements.push(closeButton);
              ReactDOM.render(elements, document.querySelector(".posts"));
            }}
          />
        );
        thumbnailElementArray.push(thumbnailElement);
      });
      ReactDOM.render(thumbnailElementArray, document.querySelector(".posts"));
    }
  });
};

const DoctorProfile = () => {
  return (
    <div className="app__doctor__profile">
      <img src={getProfilePhoto()} alt="No Profile Photo" id="profile-photo" />
      <h3 id="profile-name" className="info">
        {getName()}
      </h3>
      <h5 id="profile-email" className="info">
        {getEmailId()}
      </h5>
      <div id="bio" className="info">
        {getBio()}
      </div>
      <hr />
      <label id="new-post">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-circle"
          viewBox="0 0 16 16"
          style={{
            display: "block",
            margin: "auto",
            width: "30px",
            height: "30px",
          }}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <input
          type="file"
          name="newPost"
          id="newpost"
          style={{ display: "none" }}
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const uploader = <PostUploader file={file} />;
            document.querySelector(".app__doctor__profile").innerHTML = "";
            ReactDOM.render(
              uploader,
              document.querySelector(".app__doctor__profile")
            );
          }}
        />
      </label>
      <div className="posts">{getPosts()}</div>
    </div>
  );
};

export default DoctorProfile;
