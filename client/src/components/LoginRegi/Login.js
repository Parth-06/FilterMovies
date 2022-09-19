import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginuser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      toast.error("Invaid Login Details");
    } else {
      toast.success("Login successfully");
      navigate("/profile", { state: { data: email, pass: password } });
    }
  };

  const filltest = (e) => {
    e.preventDefault();
    const Eval = (e.target.value = "trial@gmail.com");
    setEmail(Eval);
    const Pass = (e.target.value = "password@123");
    setPassword(Pass);
  };
  return (
    <div className="login" id="login">
      <div className="banner_top" />
      <div className="nav_login" id="nav_login">
        <h1>FilterMovies</h1>
      </div>
      <div className="signin">
        <h1>Sign In</h1>
        <div className="box">
          <input
            type="email"
            placeholder="Email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="Password"
            placeholder="Password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="button_test" onClick={filltest}>
            Fill Test Credentials
          </button>
          <button className="button_in" onClick={loginuser}>
            Sign In
          </button>
        </div>
        <div className="sign_up_text">
          <p style={{ color: "rgb(100, 100, 100)" }}>New?</p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            &nbsp; Sign Up Now
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
