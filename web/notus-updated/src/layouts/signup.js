import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import logo from "../assets/img/logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("success");
      history.push("/dashboard");
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/8 md:w-2/4 rounded py-6 px-4 md:px-6 bg-indigo-400">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <div className="mx-auto bg-white py-8 px-4 md:px-8">
          <center>
            <img className="w-22 h-10" src={logo}></img>
            <p className="text-gray-600 p-2">
              Sign in to access your machine learning projects
            </p>
          </center>
          <form className="">
            <input
              type="text"
              className="bg-gray-400 mt-1 mb-3 p-1 w-full rounded"
              name="displayName"
              value={displayName}
              placeholder="Name"
              id="displayName"
              onChange={(event) => onChangeHandler(event)}
            />
            <input
              type="email"
              className="bg-gray-400 mt-1 mb-3 p-1 w-full rounded"
              name="userEmail"
              value={email}
              placeholder="Email"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />

            <input
              type="password"
              className="bg-gray-400 mt-1 mb-3 p-1 w-full rounded"
              name="userPassword"
              value={password}
              placeholder="Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
            <center>
              <button
                className="bg-blue-600 rounded hover:bg-blue-500 p-1 text-white"
                onClick={(event) => {
                  createUserWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                Sign Up
              </button>
            </center>
          </form>
          <p className="text-center my-3">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Sign in here
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
