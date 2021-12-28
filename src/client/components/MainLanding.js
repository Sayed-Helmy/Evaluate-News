import React, { useState } from "react";
import { icons } from "../images/index";
import searchIcon from "../images/Icons_Search.png";
import loadingIcon from "../images/loading.svg";
const urlCheck = (url) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(url);
};
const MainLanding = () => {
  const [error, setError] = useState({ isError: false, msg: "" });
  const [siteData, setSiteData] = useState();
  const [search, setSearch] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const url = search;
    const checkUrl = urlCheck(url);
    if (checkUrl) {
      setError({ isError: false, msg: "" });
      setIsLoading(true);
      fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status.code === "212") {
            return setError({
              isError: true,
              msg: data.status.msg,
            });
          }
          setSiteData(data);
          setIsLoading(false);
        });
    } else {
      setError({
        isError: true,
        msg: "Wrong Url,Please Provide a Valid Url..",
      });
    }
  };
  const checkClass = urlCheck(search) ? null : { color: "red" };
  return (
    <div className="landing-sec">
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            type="text"
            id="lookup"
            placeholder="Enter URL Here"
            onChange={(e) => setSearch(e.target.value)}
            style={checkClass}
          />
          {error.isError && <p>{error.msg}</p>}
        </div>
        <button disabled={isloading}>
          <img src={searchIcon} alt="" />
        </button>
      </form>
      <div className="result">
        {isloading && (
          <div className="loading">
            <img src={loadingIcon} alt="" />
          </div>
        )}
        <h4>Site Results</h4>
        {siteData && (
          <div className="site-data">
            {Object.entries(siteData)
              .filter(([key, value]) => key !== "status" && value.code !== "0")
              .map(([key, value], index) => {
                return (
                  <div key={key} className="icons-holder">
                    <div>
                      <img src={icons[index]} alt="" />
                      <p>{key}</p>
                    </div>
                    <span>{value}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLanding;
