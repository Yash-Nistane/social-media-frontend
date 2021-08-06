import React, { useEffect, useContext, useRef, useState } from "react";
import { loginCall, signUpCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./signup.css";
import { useHistory } from "react-router-dom";
import axios from "../../helpers/axios";

/**
 * @author
 * @function SignUp
 **/

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [relationship, setRelationship] = useState("");
  const [bio, setBio] = useState("");

  const { user, error, isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      //console.log(res);

      if (res.status == 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        history.push("/");
      }
    } catch (err) {
      const res = err.response;
      //dispatch({ type: "LOGIN_FAILURE", payload: err });
      if (res.status == 404 || res.status == 400) {
        alert(res.data);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    //console.log("hdhfhsahf", email, password, name);

    if (!name || !email || !password || !city || !relationship || !bio) {
      alert("Please enter all the details !!");
    } else {
      dispatch({ type: "SIGNUP_START" });
      try {
        const res = await axios.post("/auth/register", {
          username: name,
          email: email,
          password: password,
          city: city,
          relationship: relationship,
          desc: bio,
        });
        console.log(res.data);

        if (res.status == 200) {
          dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
          history.push("/");
        } else {
          alert("Username already exist !");
        }
      } catch (err) {
        dispatch({ type: "SIGNUP_FAILURE", payload: err });
        console.log(err.response);
        alert(err.response.data);
      }
    }
  };

  // animation

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  });

  return (
    <>
      <div>
        <div class="container-login" id="container">
          <div class="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              {/* <div class="social-container">
              <a href="#" class="social">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span> */}
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Relationship"
                onChange={(e) => setRelationship(e.target.value)}
              />
              <input
                type="text"
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
              />

              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Sign in</h1>
              {/* <div class="social-container">
              <a href="#" class="social">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span> */}
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#">Forgot your password?</a>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button class="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button class="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
