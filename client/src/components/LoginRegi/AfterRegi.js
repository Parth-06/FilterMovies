import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const AfterRegi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { data } = location.state;

  const regiuser = async (e) => {
    e.preventDefault();

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        email: data,
        password,
      }),
    });

    const dataa = await res.json();

    if (res.status === 422) {
      toast.error("Email already exists");
    } else if (res.status === 401) {
      toast.error("Invalid Password");
    } else {
      toast.success("Registered successfully");
      navigate("/login");
    }
  };
  return (
    <div className="AfterRegi" id="AfterRegi">
      <div className="nav_login">
        <h1>FilterMovies</h1>
        <button className="nav_button" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </div>
      <div className="regi_area">
        <h1>Create a password to start bingeing now</h1>
        <h3>Just one more step and you are done!</h3>
        <h3>We hate filling forms too :)</h3>
        <form className="after_form_area" onSubmit={regiuser}>
          <input
            type="text"
            placeholder="Name"
            className="after_form_input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="Email"
            placeholder="Email"
            value={data}
            className="after_form_input"
          />
          <input
            type="password"
            placeholder="Password"
            className="after_form_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="after_form_button">Create</button>
        </form>
      </div>
    </div>
  );
};

export default AfterRegi;
