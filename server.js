const express = require("express");
const fs = require("fs");
const app = express();
const port = 5500;
const contacts = readData();

app.use(express.static("public"));

function readData() {
  let data = fs.readFileSync("data.json").toString();
  return JSON.parse(data);
}

app.get("/contacts", (req, res) => {
  res.send(contacts);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
