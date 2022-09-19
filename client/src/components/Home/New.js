import React, { useEffect, useState } from "react";
import request from "../../request";
import Banner from "../Banner/Banner";
import Nav from "../Navbar/Nav";
import Row from "../Row/Row";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const New = () => {
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
      <Row title="Popular Now" fetchUrl={request.fetchTrending} />
      <Row
        title="NEW NETFLIX ORIGINALS"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        title="Popular ScienceFiction Movies"
        fetchUrl={request.fetchScienceFictionMovies}
      />
      <Row title="Popular Top Rated Movies" fetchUrl={request.fetchTopRated} />
    </div>
  );
};
export default React.memo(New);
