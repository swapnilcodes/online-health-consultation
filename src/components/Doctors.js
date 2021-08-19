import "./doctors-style.css";
import db from "../firebase";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import {Link} from 'react-router-dom';
const RenderDoctors = () => {
  const ref = db.ref("/doctors");
  const query = ref.orderByChild("first").equalTo("false");
  const spinnerElement = <Spinner />;
  query.once("value", (snapshot) => {
    const elements = [];
    snapshot.forEach((snap) => {
      const doctorData = snap.toJSON();
      console.log("data found");
      const element = (
        <div class="carousel-item active">
          <img
            src={doctorData.profilePhotoURL}
            style={{
              display: "block",
              margin: "auto",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              marginTop: "20px",
              marginBottom: "175px",
            }}
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5 style={{ fontFamily: "monospace" }}>{doctorData.name}</h5>
            <p style={{ fontFamily: "monospace" }}>type: {doctorData.type}</p>
            <Button variant="contained" color="primary" onClick= {()=>{
              window.location = `/doctor/${doctorData.email}`;
            }}>
              View Profile
            </Button>
          </div>
        </div>
      );
      elements.push(element);
    });
    ReactDOM.render(elements, document.querySelector(".carousel-inner"));
  });
};

const Doctors = () => {
  return (
    <div className="app__doctors__page">
      <h1 id="doctors-style">Doctors</h1>
      <div
        id="carouselExampleControls"
        className="carousel slide doctors-slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">{RenderDoctors()}</div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Doctors;
