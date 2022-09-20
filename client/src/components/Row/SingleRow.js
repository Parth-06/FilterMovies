import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Row.css";
import { useNavigate } from "react-router-dom";
import { UpdateData } from "../../Context/Context";
const base_url = "https://image.tmdb.org/t/p/original/";
const url =
  "https://ik.imagekit.io/ma2ncam6qv/Untitled_R7srzMTPv.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1663707609125";
const SingleRow = ({ movie }) => {
  const [isHovered, setisHovered] = useState(false);
  const navigate = useNavigate();
  const { moviedata } = UpdateData();

  const addList = async (id) => {
    const res = await fetch("/add_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id,
      }),
    });
    if (res.status === 210) {
      toast.success("Added");
    }
  };
  const removeList = async (id) => {
    const res = await fetch("/remove_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id,
      }),
    });

    if (res.status === 210) {
      toast.error("Removed");
    }
  };
  return (
    <div
      className="card"
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <img
        src={`${base_url}${movie.backdrop_path}`}
        alt={movie.name}
        className="posters"
        onClick={() =>
          navigate("/player", {
            state: { movie: movie },
          })
        }
      />
      <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
      <div className="bottomblack" />
      {isHovered && (
        <>
          <div className="hover">
            <div className="image-video-container">
              <img src={`${base_url}${movie.backdrop_path}`} alt={movie.name} />
              <video
                src={url}
                autoPlay
                muted
                loop
                onClick={() =>
                  navigate("/player", {
                    state: { movie: movie },
                  })
                }
              />
              <div
                className="movie_name"
                onClick={() =>
                  navigate("/player", {
                    state: { movie: movie },
                  })
                }
              >
                {movie?.title || movie?.name || movie?.original_name}
              </div>
              <div className="icons">
                <i
                  className="far fa-play-circle"
                  style={{ fontSize: "30px" }}
                  title="Play"
                  onClick={() =>
                    navigate("/player", {
                      state: { movie: movie },
                    })
                  }
                ></i>
                {moviedata.includes(movie.id) ? (
                  <i
                    className="fas fa-check"
                    title="Remove"
                    onClick={() => removeList(movie)}
                  ></i>
                ) : (
                  <i
                    className="fas fa-plus-circle"
                    onClick={() => addList(movie)}
                    title="Add to List"
                  ></i>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleRow;
