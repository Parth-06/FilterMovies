import React, { useContext, useState, useEffect, createContext } from "react";
import Pusher from "pusher-js";
const Movieapi = createContext();

const MovieapiProvider = ({ children }) => {
  const [moviedata, setMoviedata] = useState([]);
  const [newData, setnewData] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch("/get_uniqueid", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setMoviedata(data);
    };
    fetchMovie();
  }, [newData]);

  useEffect(() => {
    const pusher = new Pusher("297ca2b606606f6b9311", {
      cluster: "ap2",
    });

    const channelmain = pusher.subscribe("updatesomthing");
    channelmain.bind("updated", (dataa) => {
      if (dataa) {
        console.log(dataa);
        setnewData(dataa);
      }
    });
  }, []);

  return (
    <Movieapi.Provider value={{ moviedata }}>{children}</Movieapi.Provider>
  );
};

export default MovieapiProvider;
export const UpdateData = () => {
  return useContext(Movieapi);
};
