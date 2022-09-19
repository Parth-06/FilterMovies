import React, { useEffect, useState } from "react";
import request from "../../request";
import Banner from "../Banner/Banner";
import Nav from "../Navbar/Nav";
import Row from "../Row/Row";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const TvShow = () => {
  const [userdata, setUserdata] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const Callmainpage = async () => {
      try {
        const res = await fetch("/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const user = await res.json();
        setUserdata(user);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience");
        navigate("/login");
      }
    };
    Callmainpage();
  }, []);
  return (
    <div>
      <Nav userdata={userdata} />
      <Banner />
      <Row title="TV Shows" fetchUrl={request.fetchTVMovies} />
      <Row title="Comedy Shows" fetchUrl={request.fetchComedyMovies} />
      <Row title="Documentries" fetchUrl={request.fetchDocumentaries} />
      <Row title="Crime Shows" fetchUrl={request.fetchCrimeMovies} />
      <Row title="Family Shows" fetchUrl={request.fetchFamilyMovies} />
      <Row title="History Shows" fetchUrl={request.fetchHistoryMovies} />
      <Row
        title="ScienceFiction Shows"
        fetchUrl={request.fetchScienceFictionMovies}
      />
    </div>
  );
};
export default React.memo(TvShow);
