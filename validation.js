const { checkDuplicated } = require("./utils/contact");
const { body, check } = require("express-validator");

const addDataValidation = [
  body("nama").custom((value) => {
    const duplicated = checkDuplicated(value);
    if (duplicated) {
      throw new Error("Nama sudah digunakan");
    }
    return true;
  }),
  check("email").isEmail().withMessage("Email tidak valid!"),
  check("nohp").isMobilePhone("id-ID").withMessage("No HP tidak valid!"),
];

module.exports = { addDataValidation };
