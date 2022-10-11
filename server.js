const express = require("express");
const fs = require("fs");
const app = express();
const port = 5500;
const contacts = readData();

app.use(express.static("public"));
app.use(express.json());

function readData() {
  let data = fs.readFileSync("data.json").toString();
  let json = JSON.parse(data);
  return json.contacts;
}

app.get("/contacts", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send({ contacts: contacts });
});

app.post("/save", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  if (name && phone) {
    contacts.push({ name: name, phone: phone });
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
