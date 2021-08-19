import { useParams } from "react-router-dom";
import db from "../firebase";
import ReactDOM from "react-dom";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const Profile = (props) => {
  const doctorId = useParams().doctorId;
  const makePosts = () => {
    const ref = db.ref("/posts");
    const query = ref.orderByChild("userEmail").equalTo(doctorId);
    query.on("value", (snapshot) => {
      const thumbnailElementArray = [];
      snapshot.forEach((snap) => {
        var postData = snap.toJSON();

        const thumbnailStyle = {
          display: "block",
          margin: "auto",
          width: "200px",
          height: "200px",
          marginTop: "-40px",
          cursor: "pointer",
          border: "2px solid grey",
          borderRadius: "10px",
          marginBottom: '60px'
        };
        const thumbnailElement = (
          <img
            src={postData.thumbnailURL}
            alt="No thumbnail"
            style={thumbnailStyle}
            onClick={() => {
              var open = true;

              const videoElement = (
                <Modal
                  aria-labelledby="Post"
                  style={{
                    display: "block",
                    margin: "auto",
                    width: "400px",
                    height: "400px",
                    border: "2px outset black",
                  }}
                  open={open}
                  onClose= {()=>{
                    window.location.reload();
                  }}
                  id="modal"
                >
                  <video
                    src={postData.postURL}
                    controls
                    style={{
                      zIndex: "1",
                      width: "350px",
                      height: "300px",
                      display: "block",
                      margin: "auto",
                      marginTop: "10px",
                    }}
                  ></video>
                  
                </Modal>
              );
              const elements = [];

              
              elements.push(videoElement);
              ReactDOM.render(elements, document.querySelector(".posts"));
            }}
          />
        );
        thumbnailElementArray.push(thumbnailElement);
      });
      ReactDOM.render(thumbnailElementArray, document.querySelector(".posts"));
    });
  };
  const makeElements = () => {
    console.log("Rendering Elements");
    const ref = db.ref("/doctors");
    console.log(doctorId);
    const query = ref.orderByChild("email").equalTo(doctorId);

    query.on("value", (snapshot) => {
      var data;
      snapshot.forEach((snap) => {
        data = snap.toJSON();
      });
      console.log(data);
      if (data == null || data.first == "true") {
        const headingStyle = {
          display: "inline",
          fontFamily: "poppins",
          marginLeft: "50px",
          userSelect: "none",
          cursor: "default",
        };
        const element = <h1 style={headingStyle}>Invalid Doctor Id</h1>;
        ReactDOM.render(element, document.querySelector(".app__profile"));
      } else {
        const elements = [];
        const mediaQuery = window.matchMedia("(max-width: 666px)");
        var profilePhotoStyle;
        if (mediaQuery.matches) {
          console.log("matches");
          profilePhotoStyle = {
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "2px outset grey",
            display: "block",
            margin: "auto",
            marginTop: "30px",
          };
        } else {
          profilePhotoStyle = {
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "2px outset grey",
            marginLeft: "30px",
            marginTop: "30px",
          };
        }
        const profilePhotoElement = (
          <img
            src={data.profilePhotoURL}
            alt="no profile photo"
            style={profilePhotoStyle}
          />
        );

        elements.push(profilePhotoElement);
        var nameHeadingStyle;
        if (mediaQuery.matches) {
          nameHeadingStyle = {
            display: "block",
            textAlign: "center",
            fontFamily: "poppins",
            color: "white",
            marginTop: "20px",
          };
        } else {
          nameHeadingStyle = {
            position: "absolute",
            fontFamily: "poppins",
            left: "270px",
            userSelect: "none",
            cursor: "default",
            color: "white",
            top: "130px",
          };
        }
        const nameHeading = <h1 style={nameHeadingStyle}>{data.name}</h1>;
        elements.push(nameHeading);
        var emailHeadingStyle;
        if (mediaQuery.matches) {
          emailHeadingStyle = {
            display: "block",
            fontFamily: "poppins",
            textAlign: "center",
            color: "white",
            cursor: "default",
            marginTop: "30px",
          };
        } else {
          emailHeadingStyle = {
            display: "block",
            fontFamily: "poppins",
            marginLeft: "274px",
            marginTop: "-80px",
            userSelect: "none",
            cursor: "default",
            color: "white",
          };
        }
        const emailHeading = <h4 style={emailHeadingStyle}>{data.email}</h4>;
        elements.push(emailHeading);
        var bioStyle;
        if (mediaQuery.matches) {
          bioStyle = {
            whiteSpace: "pre-line",
            fontFamily: "poppins",
            color: "white",
            marginTop: "30px",
            textAlign: "center",
            display: "block",
            cursor: "default",
            userSelect: "none",
          };
        } else {
          bioStyle = {
            whiteSpace: "pre-line",
            fontFamily: "poppins",
            marginLeft: "274px",
            marginTop: "30px",
            userSelect: "none",
            cursor: "default",
            color: "white",
          };
        }
        const bioElement = <h5 style={bioStyle}>{data.bio}</h5>;
        elements.push(bioElement);

        const hrElement = <hr style={{ marginTop: "30px" }} />;
        elements.push(hrElement);

        const postsContainer = (
          <div
            className="posts"
            style={{
              display: "block",
              marginTop: "60px",
              width: "100%",
            }}
          >
            {makePosts()}
          </div>
        );
        elements.push(postsContainer);
        ReactDOM.render(elements, document.querySelector(".app__profile"));
      }
    });
  };

  return (
    <div
      className="app__profile"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {makeElements()}
    </div>
  );
};

export default Profile;
