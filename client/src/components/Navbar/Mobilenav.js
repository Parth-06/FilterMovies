import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mobilenav.css";
const Mobilenav = () => {
  const navigate = useNavigate();
  return (
    <div className="Mobilenav">
      <div className="categories">
        <p onClick={() => navigate("/")}>Home</p>
        <p onClick={() => navigate("/tvshow")}>Tv Shows</p>
        <p onClick={() => navigate("/movies")}>Movies</p>
        <p onClick={() => navigate("/new")}>New & Popular</p>
        <p onClick={() => navigate("/mylist")}>My List</p>
        <p onClick={() => navigate("/logout")}>Sign Out</p>
      </div>
      <div className="bottom_cross" onClick={() => navigate(-1)}>
        <i class="fas fa-times"></i>
      </div>
    </div>
  );
};

export default Mobilenav;
