import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Template from "../../images/Orevan-Header.gif";
import { useNavigate } from "react-router-dom";

import { SignUpButton } from "../signUpButton/SignUpButton";
import axios from "axios";
import isLocationNear from "../../helpers/isLocationNear";
import { jwtDecode } from "jwt-decode";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Login with google states
  const [user, setUser] = useState({});

  async function handleCallbackResponse(response) {
    if (isLocationNear(latitude, longitude, 29.9843176, 30.9524369, 2)) {
      setError(
        "You cannot log in to the system unless you are within the premises of Orevan!"
      );
      return;
    }
    try {
      var userObject = jwtDecode(response.credential);
      setUser(userObject);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/users/authWithEmail`,
        {
          email: userObject.email,
        },
        config
      );
      if (data.token) {
        setToken(response.credential);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("team", data.team);
      }
    } catch (error) {
      if (error.response.status == 401) {
        setError(
          `Invalid Email! \n If you think this is wrong please contact the technical team on ehab.reda@orevan.org`
        );
      } else if (error.response.status == 500) {
        setError(
          "Bad Connection! Please check your Internet connection and trye again."
        );
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/Home");
    }

    if (!localStorage.getItem("token")) {
      // global Google
      google.accounts.id.initialize({
        client_id:
          "366878617916-co7kom5ggsqqu33c523lp8g5ivbrp6po.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
      google.accounts.id.prompt();
    }
    // Check if Geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Request the current position
      navigator.geolocation.getCurrentPosition(
        // Success callback
        function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        // Error callback
        function (error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setError("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid Email!");
      return;
    } else if (!password) {
      setError("Please enter a valid Password!");
      return;
    } else if (isLocationNear(latitude, longitude, 29.9843176, 30.9524369, 2)) {
      setError(
        "You cannot log in to the system unless you are within the premises of Orevan!"
      );
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `http://localhost:5000/api/users/login`,
          {
            email,
            password,
          },
          config
        );
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("team", data.team);
        }
      } catch (error) {
        if (error.response.status == 401) {
          setError(
            `Invalid Email or Password! \n If you think this is wrong please contact the technical team on ehab.reda@orevan.org`
          );
        } else if (error.response.status == 500) {
          setError(
            "Bad Connection! Please check your Internet connection and trye again."
          );
        }
      }
    }
  };

  return (
    <>
      <div className="hamda ">
        <div className="app1 w-75 ">
          <div className="left  ">
            <img className="w-100" src={Template} alt="" />
          </div>
          <div className="right pt-3 w-100">
            <div className=" formBox">
              <h1 className="text-center">Orevan Portals</h1>
              <h5 className="text-center familyTitle">
                Are you part of Orevan's family?
              </h5>
              {/* Please enhance the error message here */}
              {error && (
                <div className="errorMessage alert alert-danger mt-3">
                  <strong>{error}</strong>
                </div>
              )}
              <form className="w-100" onSubmit={submitHandler}>
                <div>
                  <label htmlFor="name">Email</label>
                  <input
                    className="form-control bg-light my-3"
                    type="email"
                    id="email"
                    value={email}
                    // placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control bg-light my-3 "
                    type="password"
                    id="password"
                    value={password}
                    // placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="my-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      // checked
                    />
                    <label
                      className="form-check-label remeberButton"
                      htmlFor="exampleCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link className="forgotButton" to="/forgetPassword">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button className="btn btn-primary mb-3 w-100" type="submit">
                  Sign in
                </button>
              </form>
              <div style={{ width: "100%", textAlign: "center" }}>
                <div
                  className="btn btn-white text-white m-auto "
                  style={{ margin: "auto !important" }}
                  id="signInDiv"
                ></div>
              </div>

              {/* <SignUpButton /> */}
            </div>
          </div>
        </div>
      </div>
      {/* 
      <Footer /> */}
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="loginPage ">
              <img className="w-100 " src={Template} alt="" />
            </div>
            <div className="col md-4 d-flex align-items-center justify-content-center formContainer">
              <div className="w-75 ">
                <h1 className="title text-center">Orevan Platforms</h1>
                <h5 className="text-center">
                  Are you part of Orevan's family?
                </h5>
                <form className=" ">
                  <div>
                    <label className="labels" htmlFor="name">
                      Email:
                    </label>
                    <input
                      className="form-control bg-light my-3"
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="labels" htmlFor="password">
                      Password:
                    </label>
                    <input
                      className="form-control bg-light my-3"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="my-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label " for="exampleCheck1">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <a className="forgotButton" href="">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleClick}
                    className="btn btn-primary mb-3 w-100"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>

                <button className="googleButton btn btn-dark text-white  w-100  ">
                  <img className="px-1 mb-1" src={Diamond} alt="" /> or sign in
                  with Google
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div> */}

      {/* <div className="row loginContainer  justify-content-center align-items-center pt-5 mt-5">
        <div className="col-md-8 ">
          <div className="loginPage ">
            <img className="w-100  " src={Template} alt="" />
          </div>
        </div>
        <div className="col md-4 d-flex align-items-center justify-content-center formContainer">
          <div className="w-75 ">
            <h1 className="title text-center">Orevan Platforms</h1>
            <h5 className="text-center">Are you part of Orevan's family?</h5>
            <form className=" ">
              <div>
                <label className="labels" htmlFor="name">
                  Email:
                </label>
                <input
                  className="form-control bg-light my-3"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="labels" htmlFor="password">
                  Password:
                </label>
                <input
                  className="form-control bg-light my-3"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="my-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label " for="exampleCheck1">
                    Remember me
                  </label>
                </div>
                <div>
                  <a className="forgotButton" href="">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                onClick={handleClick}
                className="btn btn-primary mb-3 w-100"
                type="submit"
              >
                Sign in
              </button>
            </form>

            <button className="googleButton btn btn-dark text-white  w-100  ">
              <img className="px-1 mb-1" src={Diamond} alt="" /> or sign in with
              Google
            </button>
          </div>
        </div>
        <Footer />
      </div> */}
    </>
  );
}
