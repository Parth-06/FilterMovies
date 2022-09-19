import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Spinner from "../../Spinner";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState([]);
  const { data } = location.state;

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
      if (res.status === 400 || !dataa) {
        toast.error("Invaid Login Details");
      }
    };
    alluser();
  }, []);

  useEffect(() => {
    const Logoutpage = async () => {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
    };
    Logoutpage();
  }, []);

  const profileuser = async (username) => {
    const res = await fetch("/profilelogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data,
        username,
      }),
    });

    const dataa = await res.json();

    if (res.status === 400 || !dataa) {
      toast.error("Invaid Login Details");
    } else {
      navigate("/");
    }
  };

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
            <h1>Who's Watching?</h1>
            <div className="all_boxes">
              <div className="single_box" onClick={() => profileuser("User1")}>
                <img src={userDetails[0].img_path} alt="name" />
                <h3>{userDetails[0].Name}</h3>
              </div>
              <div className="single_box" onClick={() => profileuser("User2")}>
                <img src={userDetails[1].img_path} alt="name" />
                <h3>{userDetails[1].Name}</h3>
              </div>
              <div className="single_box" onClick={() => profileuser("User3")}>
                <img src={userDetails[2].img_path} alt="name" />
                <h3>{userDetails[2].Name}</h3>
              </div>
              <div className="single_box" onClick={() => profileuser("User4")}>
                <img src={userDetails[3].img_path} alt="name" />
                <h3>{userDetails[3].Name}</h3>
              </div>
            </div>

            <div className="profile_Button">
              <h4>*To Edit User Names Click on Manage Profiles</h4>
              <button
                className="profile_btn"
                onClick={() =>
                  navigate("/manageprofile", {
                    state: { data: data },
                  })
                }
              >
                Manage Profiles
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
