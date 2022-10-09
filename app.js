const express = require("express");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const {
  homeHandlers,
  aboutHandlers,
  contactHandlers,
  productHandlers,
  notFoundHandlers,
  detailsContactHandlers,
  addContactHandlers,
  saveContactHandler,
} = require("./handlers");
const { addDataValidation } = require("./validation");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayout);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);
app.use(cookieParser("secret"));
app.use(flash());

app.get("/", homeHandlers);

app.get("/about", aboutHandlers);

app.get("/contact", contactHandlers);

app.post("/contact", addDataValidation, saveContactHandler);

app.get("/contact/add", addContactHandlers);

app.get("/contact/:nama", detailsContactHandlers);

app.get("/product/:id", productHandlers);

app.use("/", notFoundHandlers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
