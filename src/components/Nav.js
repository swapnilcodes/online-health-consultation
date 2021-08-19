import "./nav-style.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useEffect } from "react";


const Nav = () => {
  if (sessionStorage.getItem("loggedIn") === "true") {
    var loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    var profilePhotoUrl = loginInfo.profilePhotoURL;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark" id="nav">
        <div className="container-fluid">
          <Link class="navbar-brand icon" to="/">
            <img src="https://img.icons8.com/offices/30/000000/heart-health.png" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse nav-drop" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/appointment">
                  Appointment
                </a>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/doctors">
                  Doctors
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle dropdown"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={profilePhotoUrl} alt=".." id="dropdown-toggle" />
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link class="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark" id="nav">
        <div class="container-fluid">
          <Link class="navbar-brand icon" to="#">
            <img src="https://img.icons8.com/offices/30/000000/heart-health.png" />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/doctors">
                  Doctors
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  className="nav-link"
                  class="btn btn-light join-us"
                  to="/create-acc"
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Nav;
