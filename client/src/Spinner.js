import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);
  return (
    <ClipLoader
      color={"#FF0000"}
      loading={loading}
      size={50}
      width={9000}
      height={9000}
    />
  );
};

export default Spinner;
