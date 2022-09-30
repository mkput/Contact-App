const { json } = require('express')
const fs = require('fs')

// create folder data
const dirPath = "./data"
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}

// make file contacts.json
const dataPath = "./data/contacts.json"
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
  const contacts = JSON.parse(fileBuffer)
  return contacts
}

const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((data) => data.nama === nama)
  return contact
}

module.exports = { loadContact, findContact }