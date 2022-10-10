const { json } = require("express");
const fs = require("fs");

// create folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// make file contacts.json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((data) => data.nama === nama);
  return contact;
};

const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts);
};

const checkDuplicated = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContact(filteredContacts);
};

const updateContact = (newContact) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter(
    (contact) => contact.nama !== newContact.oldName
  );
  delete newContact.oldName;
  filteredContacts.push(newContact);
  saveContact(filteredContacts);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  checkDuplicated,
  deleteContact,
  updateContact,
};
