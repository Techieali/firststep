import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";
import logo from "../assets/img/logo.png";
import GoogleButton from "react-google-button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("success");
        history.push("/dashboard");
      })
      .catch((error) => {
        setError("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="mt-8">
      <div className="border border-blue-400 mx-auto w-11/8 md:w-2/4 rounded py-6 px-4 md:px-6 bg-indigo-400">
        {error !== null && (
          <div className="py-4 bg-white w-full text-red text-center mb-3">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="mx-auto bg-white py-8 px-4 md:px-8">
          <center>
            <img className="w-22 h-10" src={logo}></img>
            <p className="text-gray-600 p-2">Sign in to access your machine learning projects</p>
          </center>
          <form>
            <input
              type="email"
              className="bg-gray-400 mt-1 mb-3 p-1 w-full"
              name="userEmail"
              value={email}
              placeholder="sample@gmail.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
            <input
              type="password"
              className="bg-gray-400 mt-1 mb-3 p-1 w-full"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
            <center>
              <button
                className="bg-blue-600 rounded hover:bg-blue-500 p-1 text-white"
                onClick={(event) => {
                  signInWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                Login To Dashboard
              </button>
            </center>
          </form>
          <div className="bg-gray-700 h-1 mt-10"></div>
          <center className="pt-5">
            <GoogleButton
              onClick={() => {
                signInWithGoogle();
              }}
            />
          </center>
          <p className="text-center my-3">
            Don't have an account?{" "}
            <Link to="signUp" className="text-blue-500 hover:text-blue-600">
              Sign up here
            </Link>{" "}
            <br />{" "}
            {/* <Link
              to="passwordReset"
              className="text-blue-500 hover:text-blue-600"
            >
              Forgot Password?
            </Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
