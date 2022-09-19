import axios from "../../axios";
import React, { useEffect, useRef, useState } from "react";
import "./Row.css";
import SingleRow from "./SingleRow.js";
import LazyLoad from "react-lazy-load";

const Row = ({ title, fetchUrl }) => {
  const [movies, setmovies] = useState([]);
  const [showarrow, setshowarrow] = useState(false);
  const arrowref = useRef([]);
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl, { crossDomain: true });
      setmovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const handlerightscroll = () => {
    arrowref.current.scrollBy(1254, 0);
  };
  const handleleftscroll = () => {
    arrowref.current.scrollBy(-1254, 0);
  };

  return (
    <div
      className="main_row"
      onMouseEnter={() => setshowarrow(true)}
      onMouseLeave={() => setshowarrow(false)}
    >
      <div className="left_silder" onClick={handleleftscroll}>
        <i
          className="fas fa-chevron-left"
          style={showarrow ? {} : { display: "none" }}
        ></i>
      </div>
      <div className="right_silder" onClick={handlerightscroll}>
        <i
          className="fas fa-chevron-right"
          style={showarrow ? {} : { display: "none" }}
        ></i>
      </div>
      <div
        className="row"
        ref={(element) => {
          arrowref.current = element;
        }}
      >
        <h2>{title}</h2>

        <div className="posters_main">
          {movies.map((movie) => {
            return <SingleRow movie={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default React.memo(Row);
