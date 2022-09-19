import React, { useEffect, useState } from "react";
import request from "../../request";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Nav from "../Navbar/Nav";
const Home = () => {
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
    <div className="home">
      <Nav userdata={userdata} />
      <Banner />
      <Row title="ORIGINALS" fetchUrl={request.fetchNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Family Shows" fetchUrl={request.fetchFamilyMovies} />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row
        title="Popular ScienceFiction Movies"
        fetchUrl={request.fetchScienceFictionMovies}
      />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Animation Movies" fetchUrl={request.fetchAnimationMovies} />
      <Row title="History Shows" fetchUrl={request.fetchHistoryMovies} />
    </div>
  );
};

export default React.memo(Home);
