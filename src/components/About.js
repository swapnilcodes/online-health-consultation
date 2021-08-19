import logo from "./Swam Devlopment-logos_white.png";

const About = () => {
  return (
    <div className="app__about" style={{ height: "100vh" }}>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "poppins",
          color: "white",
          marginTop: "20px",
          userSelect: "none",
        }}
      >
        About Us
      </h1>
      <img
        src={logo}
        alt=""
        style={{
          display: "block",
          margin: "auto",
          width: "200px",
          height: "200px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />
      <h4
        style={{
          width: "60%",
          margin: "auto",
          fontFamily: "poppins",
          color: "white",
          marginTop: "40px",
        }}
      >
        "Online Health Consultation" is a project developed & designed By
        Swapnil Deshmane. This project is made for Doctors to Consult Paitents
        Online. We Will also be releasing android application soon.
      </h4>
    </div>
  );
};

export default About;
