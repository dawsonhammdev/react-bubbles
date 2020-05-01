import React, { useState } from "react";


import { axiosWithAuth } from "../utils/axiosWithAuth";

const intialState = {
  username: "",
  password: "",
  isFetching: false
};

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState(intialState);

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLogin({ ...login, isFetching: true });
    axiosWithAuth()
      .post("api/login", login)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/api/colors");
      })
      .catch(err => {
        console.log(err, "sorry, an error has occured while logging you in");
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <img
        className="bubble"
        src="https://images.unsplash.com/photo-1501740326664-5571ff5e30a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="buble picture"
      />
      <h3>Login</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            label="Username"
            type="text"
            name="username"
            placeholder="username"
            value={login.username}
            onChange={handleChange}
          />
          <br />
          <input
            label="Password"
            type="password"
            name="password"
            placeholder="password"
            value={login.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Log In</button>
          {login.isFetching && "Please wait...logging you in"}
        </form>
      </div>
    </div>
  );
};

export default Login;
