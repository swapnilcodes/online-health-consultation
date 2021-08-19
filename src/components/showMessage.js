import Button from "@material-ui/core/Button";

const home = () => {
  window.location = "/";
};

const appointment = () => {
  window.location = "/appointment";
};

const Message = (props) => {
  const imgStyle = {
    display: "block",
    margin: "auto",
    marginTop: "30vh",
    borderRadius: "50%",
  };
  const msgStyle = {
    textAlign: "center",
    fontFamily: "Ubuntu",
    color: "purple",
    marginTop: "50px",
  };
  const buttonStyle = {
    display: "block",
    margin: "auto",
    fontFamily: "Ubuntu",
    backgroundColor: "lightblue",
    marginTop: "40px",
    marginBottom: "30px",
    width: "300px",
  };
  if (props.user === 'admin') {
    return (
      <div className="app__msg">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        ></link>
        <img
          class="tick__icon"
          alt="svgImg"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSIjMWFiYzljIj48L3BhdGg+PGc+PHBhdGggZD0iTTEyOSwxNTAuNWgtODZjLTExLjg3NTE3LDAgLTIxLjUsLTkuNjI0ODMgLTIxLjUsLTIxLjV2LTg2YzAsLTExLjg3NTE3IDkuNjI0ODMsLTIxLjUgMjEuNSwtMjEuNWg4NmMxMS44NzUxNywwIDIxLjUsOS42MjQ4MyAyMS41LDIxLjV2ODZjMCwxMS44NzUxNyAtOS42MjQ4MywyMS41IC0yMS41LDIxLjV6IiBmaWxsPSIjYzhlNmM5Ij48L3BhdGg+PHBhdGggZD0iTTEyMy45Mjk1OCw1Mi4yNjY1bC00OC42Mjk0Miw0OC42ODMxN2wtMjAuMDcwMjUsLTIwLjAyMzY3bC0xMC4xMjY1LDEwLjE0OGwzMC4yMTQ2NywzMC4xNDNsNTguNzUyMzMsLTU4LjgxNjgzeiIgZmlsbD0iIzRjYWY1MCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
          style={imgStyle}
        />
        <h3 className="msg" style={msgStyle}>
          {props.message}
        </h3>
        <Button color="primary" style={buttonStyle} onClick={home}>
          Get Back To Home
      </Button>
      </div>
    )
  }
  else {
    return (
      <div className="app__msg">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
          rel="stylesheet"
        ></link>
        <img
          class="tick__icon"
          alt="svgImg"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSIjMWFiYzljIj48L3BhdGg+PGc+PHBhdGggZD0iTTEyOSwxNTAuNWgtODZjLTExLjg3NTE3LDAgLTIxLjUsLTkuNjI0ODMgLTIxLjUsLTIxLjV2LTg2YzAsLTExLjg3NTE3IDkuNjI0ODMsLTIxLjUgMjEuNSwtMjEuNWg4NmMxMS44NzUxNywwIDIxLjUsOS42MjQ4MyAyMS41LDIxLjV2ODZjMCwxMS44NzUxNyAtOS42MjQ4MywyMS41IC0yMS41LDIxLjV6IiBmaWxsPSIjYzhlNmM5Ij48L3BhdGg+PHBhdGggZD0iTTEyMy45Mjk1OCw1Mi4yNjY1bC00OC42Mjk0Miw0OC42ODMxN2wtMjAuMDcwMjUsLTIwLjAyMzY3bC0xMC4xMjY1LDEwLjE0OGwzMC4yMTQ2NywzMC4xNDNsNTguNzUyMzMsLTU4LjgxNjgzeiIgZmlsbD0iIzRjYWY1MCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
          style={imgStyle}
        />
        <h3 className="msg" style={msgStyle}>
          {props.message}
        </h3>
        <Button color="primary" style={buttonStyle} onClick={appointment}>
          Book A Appointment
      </Button>
        <Button color="primary" style={buttonStyle} onClick={home}>
          Get Back To Home
      </Button>
      </div>
    );
  }
};

export default Message;
