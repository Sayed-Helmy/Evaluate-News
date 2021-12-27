require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.status(200).send("Server is Running");
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  const apiKey = process.env.API_KEY;
  const siteData = await fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${url}&lang=en`
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));
  const {
    agreement,
    confidence,
    irony,
    model,
    score_tag,
    subjectivity,
    status,
  } = siteData;
  res
    .status(200)
    .json({
      agreement,
      confidence,
      irony,
      model,
      score_tag,
      subjectivity,
      status,
    });
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});
