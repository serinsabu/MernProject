const { Schema, model, mongo } = require("mongoose");

// contact schema because anyboady can contact and it is not necessary that registered users only can contact
const contactSchema = new Schema({
  // schema destructured from mongoose
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// create a collection
const Contact = new model("Contact", contactSchema);
module.exports = Contact;
