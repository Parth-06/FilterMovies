import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = ({ userdata }) => {
  const [color, setcolor] = useState(false);

  const [isHovered, setisHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const changecolor = () => {
    if (window.scrollY >= 90) {
      setcolor(true);
    } else {
      setcolor(false);
    }
  };

  window.addEventListener("scroll", changecolor);

  return (
    <div className={color ? "nav" : "nav_bg"}>
      <h1 onClick={() => navigate("/")}>FilterMovies</h1>
      <div className="nav_contents">
        <p
          onClick={() => navigate("/")}
          style={
            location.pathname === "/"
              ? { fontWeight: "700" }
              : { fontWeight: "500" }
          }
        >
          Home
        </p>
        <p
          onClick={() => navigate("/tvshow")}
          style={
            location.pathname === "/tvshow"
              ? { fontWeight: "700" }
              : { fontWeight: "500" }
          }
        >
          Tv Shows
        </p>
        <p
          onClick={() => navigate("/movies")}
          style={
            location.pathname === "/movies"
              ? { fontWeight: "700" }
              : { fontWeight: "500" }
          }
        >
          Movies
        </p>
        <p
          onClick={() => navigate("/new")}
          style={
            location.pathname === "/new"
              ? { fontWeight: "700" }
              : { fontWeight: "500" }
          }
        >
          New & Popular
        </p>
        <p
          onClick={() => navigate("/mylist")}
          style={
            location.pathname === "/mylist"
              ? { fontWeight: "700" }
              : { fontWeight: "500" }
          }
        >
          My List
        </p>
      </div>
      <div className="nav_mobile" id="nav_mobile">
        <p onClick={() => navigate("/categories")}>
          Categories <i className="fas fa-caret-down"></i>
        </p>
      </div>
      <div
        className="avatar"
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
      >
        <img src={userdata.img_path} alt="name" />
        {isHovered ? (
          <i className="fas fa-caret-up"></i>
        ) : (
          <i className="fas fa-caret-down"></i>
        )}
        {isHovered && (
          <div className="profile_nav">
            <div className="profilenav_avatars">
              <ul>
                <li
                  className="nav_li"
                  id="nav_li"
                  onClick={() =>
                    navigate("/profile", {
                      state: { data: userdata.email },
                    })
                  }
                >
                  <i className="fas fa-users"></i>
                  <p>Change User</p>
                </li>

                <li
                  className="nav_li"
                  id="nav_li"
                  style={{ marginTop: "0.7rem" }}
                  onClick={() =>
                    navigate("/manageprofile", {
                      state: { data: userdata.email },
                    })
                  }
                >
                  <i
                    class="fas fa-pen"
                    style={{
                      fontSize: "19px",
                      marginLeft: "0.5rem",
                      marginRight: "0.6rem",
                    }}
                  ></i>
                  <p>Manage Profiles</p>
                </li>
                <li className="sign_out_li" onClick={() => navigate("/logout")}>
                  <p>Sign Out</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
