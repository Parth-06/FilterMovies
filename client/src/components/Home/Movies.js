import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import request from "../../request";
import Nav from "../Navbar/Nav";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Movies = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState("");

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

      <Row title="Crime Movies" fetchUrl={request.fetchCrimeMovies} />
      <Row title="Family Movies" fetchUrl={request.fetchFamilyMovies} />
      <Row title="Drama Movies" fetchUrl={request.fetchDramaMovies} />
      <Row title="Animation Movies" fetchUrl={request.fetchAnimationMovies} />
      <Row title="Fantasy Movies" fetchUrl={request.fetchFantasyMovies} />
      <Row title="History Movies" fetchUrl={request.fetchHistoryMovies} />
      <Row title="Music Movies" fetchUrl={request.fetchMusicMovies} />
      <Row
        title="ScienceFiction Movies"
        fetchUrl={request.fetchScienceFictionMovies}
      />
    </div>
  );
};
export default React.memo(Movies);
