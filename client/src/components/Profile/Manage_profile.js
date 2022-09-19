import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../Spinner";
import "./Profile.css";

const Manage_profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const alluser = async () => {
      const res = await fetch("/alluser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data,
        }),
      });

      const dataa = await res.json();
      setUserDetails(dataa);
    };
    alluser();
  }, []);

  return (
    <>
      {userDetails[0] === undefined ||
      userDetails[1] === undefined ||
      userDetails[2] === undefined ||
      userDetails[3] === undefined ? (
        <>
          <div className="spinner_page">
            <Spinner />
          </div>
        </>
      ) : (
        <div className="profile">
          <div className="banner_top" />
          <div className="nav_login">
            <h1>FilterMovies</h1>
          </div>
          <div className="profile_box">
            <h1>Manage Profile's</h1>
            <div className="all_boxes">
              <div
                className="single_box"
                onClick={() =>
                  navigate("/editprofile", {
                    state: { alldata: userDetails[0] },
                  })
                }
              >
                <div className="box_cover">
                  <i class="fas fa-pen"></i>
                </div>
                <img src={userDetails[0].img_path} alt="name" />
                <h3>{userDetails[0].Name}</h3>
              </div>
              <div
                className="single_box"
                onClick={() =>
                  navigate("/editprofile", {
                    state: { alldata: userDetails[1] },
                  })
                }
              >
                <div className="box_cover">
                  <i class="fas fa-pen"></i>
                </div>
                <img src={userDetails[1].img_path} alt="name" />
                <h3>{userDetails[1].Name}</h3>
              </div>
              <div
                className="single_box"
                onClick={() =>
                  navigate("/editprofile", {
                    state: { alldata: userDetails[2] },
                  })
                }
              >
                <div className="box_cover">
                  <i class="fas fa-pen"></i>
                </div>
                <img src={userDetails[2].img_path} alt="name" />
                <h3>{userDetails[2].Name}</h3>
              </div>
              <div
                className="single_box"
                onClick={() =>
                  navigate("/editprofile", {
                    state: { alldata: userDetails[3] },
                  })
                }
              >
                <div className="box_cover">
                  <i class="fas fa-pen"></i>
                </div>
                <img src={userDetails[3].img_path} alt="name" />
                <h3>{userDetails[3].Name}</h3>
              </div>
            </div>
            <div className="profile_Button">
              <button
                className="manageprofile_btn"
                onClick={() =>
                  navigate("/profile", {
                    state: { data: data },
                  })
                }
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Manage_profile;
