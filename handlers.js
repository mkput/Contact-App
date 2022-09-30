const { loadContact, findContact } = require('./utils/contact')

const homeHandlers = (req, res) => {  
  res.render('index', {
    layout : 'layouts/main-layout.ejs',
    title : 'Home',
  })
}

const aboutHandlers = (req, res) => {
  res.render('about', {
    layout : 'layouts/main-layout.ejs',
    title : 'About',
  })
}

const contactHandlers = (req, res) => {
  const contacts = loadContact();
  res.render('contact', {
    layout : 'layouts/main-layout.ejs',
    title : 'Contact',
    contacts,
  })
}

const detailsContactHandlers = (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    layout : 'layouts/main-layout.ejs',
    title : 'Contact',
    contact,
  })
}

const productHandlers = (req, res) => {
  res.send(`Product : ${req.params.id} <br/> Category : ${req.query.category}`)
}

const notFoundHandlers = (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
}

module.exports = { homeHandlers, 
                   aboutHandlers, 
                   contactHandlers, 
                   productHandlers,
                   notFoundHandlers,
                   detailsContactHandlers }