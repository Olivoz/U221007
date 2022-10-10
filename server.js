const express = require("express");
const fs = require("fs");
const app = express();
const port = 5500;
const contacts = readData();

app.use(express.static("public"));
app.use(express.json());

function readData() {
  let data = fs.readFileSync("data.json").toString();
  let contactsJSON = JSON.parse(data);
  let contacts = new Map();
  contactsJSON.contacts.forEach((contact) => {
    contacts.set(contact.name, contact);
  });
  return contacts;
}

app.get("/contacts", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send({ contacts: Array.from(contacts.values()) });
});

app.post("/contacts", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  if (name && phone) {
    if (contacts.has(name)) {
      res.status(400);
      res.send("Name already taken");
      return;
    }

    contacts.set(name, { name: name, phone: phone });
    res.status(200);
    res.end();
  } else {
    res.status(400);
    res.send("Request must be a valid json with name and phone.");
  }
});

app.delete("/contacts", (req, res) => {
  const name = req.body.name;
  if (name) {
    if (contacts.delete(name)) {
      res.status(200);
      res.end();
    } else {
      res.status(400);
      res.end("No contact found");
    }
  } else {
    res.status(400);
    res.send("Request must be a valid json with name");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
