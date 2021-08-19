import "./post-uploader-style.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import { storage } from "../firebase";
import db from "../firebase";
import Spinner from "./Spinner";
import ReactDOM from "react-dom";

var thumbnail = "";

const PostUploader = (props) => {
  return (
    <div className="app__post__uploader">
      <h1 id="post-uploader-heading">Post Upload</h1>
      <form action="#" id="post-uploader">
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "250px",
            fontFamily: "monospace",
            border: "1px solid grey",
            height: "60px",
            borderRadius: "6px",
            fontSize: "larger",
            marginTop: "15px",
          }}
        >
          Choose a Thumbnail
          <FaceIcon />
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              thumbnail = file;
              e.target.innerText = "Click to Change Thumbnail";
            }}
          />
        </label>
        <Button
          variant="contained"
          color="primary"
          id="upload"
          style={{
            display: "block",
            margin: "auto",
            width: "300px",
            height: "40px",
          }}
          onClick={() => {
            if (thumbnail === "") {
              alert("You need to choose a thumbnail");
            } else {
              const spinnerElement = <Spinner />;
              document.querySelector(".App").innerHTML = "";
              ReactDOM.render(spinnerElement, document.querySelector(".App"));
              const emailId = JSON.parse(
                sessionStorage.getItem("loginInfo")
              ).email;
              const ref = db.ref("/doctors");
              const query = ref.orderByChild("email").equalTo(emailId);
              query.once("value", (snapshot) => {
                var data;
                snapshot.forEach((snap) => {
                  data = snap.toJSON();
                });
                var number;
                db.ref("/post-number").on("value", (snapshot) => {
                  number = snapshot.val();
                  console.log("number inside: " + number);
                  const post = props.file;
                  console.log(number);
                  const postUploadTask = storage
                    .ref(`/posts`)
                    .child(`post${number}`)
                    .child(`post`)
                    .put(post);
                  postUploadTask.on(
                    "state_changed",
                    (snapshot) => {},
                    (err) => {
                      alert(err);
                    },
                    () => {
                      storage
                        .ref(`/posts`)
                        .child(`post${number}`)
                        .child(`post`)
                        .getDownloadURL()
                        .then((url) => {
                          const postURL = url;
                          const thumbnailUploadTask = storage
                            .ref(`/posts`)
                            .child(`post${number}`)
                            .child(`thumbnail`)
                            .put(thumbnail);
                          thumbnailUploadTask.on(
                            "state_changed",
                            (snapshot) => {},
                            (err) => {
                              alert(err);
                            },
                            () => {
                              storage
                                .ref(`/posts`)
                                .child(`post${number}`)
                                .child(`thumbnail`)
                                .getDownloadURL()
                                .then((thumbnailUrl) => {
                                  const thumbnailURL = thumbnailUrl;
                                  const postData = {
                                    postURL: postURL,
                                    thumbnailURL: thumbnailURL,
                                    uploadedBy: data.name,
                                    userEmail: data.email,
                                    postNumber: number,
                                  };
                                  db.ref("/posts")
                                    .push(postData)
                                    .then(() => {
                                      console.log(
                                        "Done With Everything updating number...."
                                      );
                                      db.ref("post-number")
                                        .set(parseInt(number) + 1)
                                        .then(() => {
                                          console.log(
                                            "Done With Literally Everything"
                                          );
                                          window.location.reload();
                                        });
                                    });
                                });
                            }
                          );
                        });
                    }
                  );
                });
              });
            }
          }}
        >
          Proceed
        </Button>
      </form>
    </div>
  );
};

export default PostUploader;
