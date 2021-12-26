import React, { useRef, useState } from "react";
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
  const searchInput = useRef();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const url = searchInput.current.value;
    const checkUrl = urlCheck(url);
    if (checkUrl) {
      setError({ isError: false, msg: "" });
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
          console.log(data);
        });
    } else {
      setError({
        isError: true,
        msg: "Wrong Url,Please Provide a Valid Url..",
      });
    }
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="lookup"></label>
          <input type="text" id="lookup" ref={searchInput} />
          {error.isError && <p>{error.msg}</p>}
        </div>
        <button>LookUP</button>
      </form>
    </div>
  );
};

export default MainLanding;
