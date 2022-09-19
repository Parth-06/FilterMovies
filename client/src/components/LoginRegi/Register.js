import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const regiuser = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Invaid Login Details");
    } else {
      navigate("/regiform", { state: { data: email } });
    }
  };
  return (
    <div className="login" id="login">
      <div className="banner_top" />
      <div className="nav_login">
        <h1>FilterMovies</h1>
        <button className="nav_button" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </div>
      <div className="regi_box">
        <h1>Unlimited Movies, Shows and More.</h1>
        <h3>Watch Anytime, Anywhere.</h3>
        <h4>Ready to watch? Enter your email to create your account</h4>
        <div className="mail_area">
          <form method="POST" onSubmit={regiuser}>
            <input
              type="email"
              className="mail_input"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />

            <button className="mail_button">Get Started</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
