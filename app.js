const express = require('express')
const expressLayout = require('express-ejs-layouts')
const { homeHandlers, aboutHandlers, contactHandlers, productHandlers, notFoundHandlers, detailsContactHandlers } = require('./handlers')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.static('public'))

app.get('/', homeHandlers)

app.get('/about', aboutHandlers)

app.get('/contact', contactHandlers)

app.get('/contact/:nama', detailsContactHandlers)

app.get('/product/:id', productHandlers)

app.use('/', notFoundHandlers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})