import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const Editprofile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updatename, setupdatename] = useState("");
  const { alldata } = location.state;

  const Update_name = async () => {
    if (updatename === "") {
      toast.error("Please Enter Somthing");
    } else {
      const res = await fetch("/updatename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: alldata.email,
          updatedname: updatename,
          username: alldata.User,
        }),
      });

      const dataa = await res.json();

      if (res.status !== 210 || !dataa) {
        toast.error("Error Updating");
      } else {
        toast.success("Updated");
        navigate("/manageprofile", {
          state: { data: alldata.email },
        });
      }
    }
  };

  return (
    <div className="edit_profile">
      <div className="banner_top" />
      <div className="nav_login">
        <h1>FilterMovies</h1>
      </div>
      <div className="edit_box">
        <h1>Edit Profile</h1>
        <div className="edit_name">
          <img src={alldata.img_path} alt="name" />
          <input
            type="text"
            placeholder={alldata.Name}
            className="edit_text"
            onChange={(e) => setupdatename(e.target.value)}
          />
        </div>
        <div className="edit_buttons">
          <button className="continue_btn" onClick={Update_name}>
            Continue
          </button>
          <button
            className="cancel_btn"
            onClick={() =>
              navigate("/manageprofile", {
                state: { data: alldata.email },
              })
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
