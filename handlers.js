const { loadContact, findContact, addContact } = require("./utils/contact");
const { validationResult } = require("express-validator");

const homeHandlers = (req, res) => {
  const mahasiswa = [
    {
      nama: "Khawaril",
      email: "khawarilputra@gmial.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout.ejs",
    title: "Home",
    mahasiswa,
  });
};

const aboutHandlers = (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "About",
  });
};

const contactHandlers = (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Contact",
    contacts,
    msg: req.flash("msg"),
  });
};

const detailsContactHandlers = (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout.ejs",
    title: "Contact",
    contact,
  });
};

const productHandlers = (req, res) => {
  res.send(`Product : ${req.params.id} <br/> Category : ${req.query.category}`);
};

const notFoundHandlers = (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
};

const addContactHandlers = (req, res) => {
  res.render("add-contact", {
    title: "Tambah Data Contact",
    layout: "layouts/main-layout.ejs",
  });
};

const saveContactHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("add-contact", {
      title: "Tambah Data Contact",
      layout: "layouts/main-layout.ejs",
      errors: errors.array(),
    });
  } else {
    addContact(req.body);
    req.flash("msg", "Data Berhasil ditambahkan");
    res.redirect("/contact");
  }
};

module.exports = {
  homeHandlers,
  aboutHandlers,
  contactHandlers,
  productHandlers,
  notFoundHandlers,
  detailsContactHandlers,
  addContactHandlers,
  saveContactHandler,
};
