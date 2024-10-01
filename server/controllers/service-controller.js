const Service = require("../models/service-model");

const Services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      return res.status(404).json({ msg: "No service found" });
    }
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Services;
