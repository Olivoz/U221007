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
  let contactElements = document.getElementById("contactElements");
  if (contactElements) contactElements.remove();
  contactElements = appendElement(app, "ul", null, "contactsElement");
  data.users.forEach((user) => {
    appendElement(contactElements, "li", `${user.name} - ${user.phone}`);
  });
}

function showContacts() {
  fetchData("contacts", loadContacts);
}
