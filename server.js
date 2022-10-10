const express = require("express");
const fs = require("fs");
const app = express();
const port = 5500;
const contacts = readData();

app.use(express.static("public"));
app.use(express.json());

function readData() {
  let data = fs.readFileSync("data.json").toString();
  return JSON.parse(data);
}

app.get("/contacts", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(contacts);
});

app.post("/contacts", (req, res) => {
  if (req.body.name && req.body.phone) {
    contacts.contacts.push({ name: req.body.name, phone: req.body.phone });
    res.status(200);
    res.end();
  } else {
    res.status(400);
    res.send("Request must be a valid json with name and phone.");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
