import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../request";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [movie, setmovie] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchdata();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner_top_nav" />
      <div className="banner_content">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <h1 className="banner_des">{movie?.overview}</h1>
        <div className="banner_buttons">
          <button
            className="banner_button"
            onClick={() =>
              navigate("/player", {
                state: { movie: movie },
              })
            }
          >
            <p>
              <i className="fas fa-play"></i>Play
            </p>
          </button>
          <button
            className="banner_button_two"
            onClick={() => navigate("/mylist")}
          >
            <i className="fas fa-info-circle"></i>
            My List
          </button>
        </div>
      </div>
      <div className="banner_bottom" />
    </header>
  );
};

export default Banner;
