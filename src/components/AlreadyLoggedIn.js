import "./already-loggedin-style.css";

const logout = (event) => {
  event.preventDefault();
  sessionStorage.setItem("loggedIn", "false");
  sessionStorage.removeItem("loignInfo");
  window.location.reload();
};
const appoitnment = (event) => {
  event.preventDefault();
  window.location = "/appointment";
};
function AlreadyLoggedIn() {
  return (
    <div className="app__loggedIn">
      <h1 id="heading">You Are Already Logged In</h1>
      <button color="primary" className="opt" onClick={logout}>
        Logout
      </button>
      <button color="secondary" className="opt" onClick={appoitnment}>
        Book A Appointment
      </button>
    </div>
  );
}

export default AlreadyLoggedIn;
