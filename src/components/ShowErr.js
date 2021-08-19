import Button from "@material-ui/core/Button";

const reload = () => {
  window.location.reload();
};

const ShowErr = (props) => {
  const imgStyle = {
    display: "block",
    margin: "auto",
    marginTop: "100px",
    marginBottom: "50px",
    borderRadius: "50%",
  };
  const msgStyle = {
    textAlign: "center",
    marginTop: "30px",
    fontFamily: "Ubuntu",
    color: "red",
  };
  const btnStyle = {
    display: "block",
    margin: "auto",
    marginTop: "50px",
    backgroundColor: "pink",
  };
  if (props.type === "covid") {
    return (
      <div className="err">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        ></link>

        <img
          src="https://img.icons8.com/emoji/48/000000/cross-mark-button-emoji.png"
          style={imgStyle}
        />
        <h3 className="error-msg" style={msgStyle}>
          {props.message}
        </h3>
      </div>
    );
  } else {
    return (
      <div className="err">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        ></link>

        <img
          src="https://img.icons8.com/emoji/48/000000/cross-mark-button-emoji.png"
          style={imgStyle}
        />
        <h3 className="error-msg" style={msgStyle}>
          {props.message}
        </h3>
        <Button color="secondary" style={btnStyle} onClick={reload}>
          Reload and Try Again
        </Button>
      </div>
    );
  }
};

export default ShowErr;
