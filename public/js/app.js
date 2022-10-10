function appendElement(target, elementName, content, id) {
  let element = document.createElement(elementName);
  if (content) element.innerText = content;
  if (id) element.id = id;
  target.appendChild(element);
  return element;
}

function fetchData(URL, onLoad) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", onLoad);
  req.open("GET", URL);
  req.send();
}

function loadContacts() {
  const data = JSON.parse(this.responseText);
  let contactsElement = document.getElementById("contactsElement");
  if (contactsElement) contactsElement.remove();
  contactsElement = appendElement(app, "ul", null, "contactsElement");
  data.contacts.forEach((user) => {
    appendElement(contactsElement, "li", `${user.name} - ${user.phone}`);
  });
}

function showContacts() {
  fetchData("contacts", loadContacts);
}

function addContact() {
  if (!nameInput.value || !phoneInput.value) return;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showContacts);
  req.open("POST", "contacts");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(
    JSON.stringify({
      name: nameInput.value,
      phone: phoneInput.value,
    })
  );

  nameInput.value = "";
  phoneInput.value = "";
}
