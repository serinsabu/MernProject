const Contact = require("../models/contact-model");
// contact page
const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "message sent succesfully" });
  } catch (error) {
    // return res.status(500).json({ message: "message not delivered" });
    next(error);
  }
};

module.exports = contactForm;
