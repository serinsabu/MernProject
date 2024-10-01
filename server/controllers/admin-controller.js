const Contact = require("../models/contact-model");
const User = require("../models/user-model");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(400).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
    // console.log("users", users);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

// get user logic

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// update user logic

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    // updateOne({filter},($set: new data)) - update query of mongodb
    const updateUser = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );
    return res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

// delete users

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id; //get the id from the params that user has sent
    await User.deleteOne({ _id: id }); //match id that is saved in backend with current id that we are trying to delete
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// get all contacts

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(400).json({ message: "No Contacts Found" });
    }
    res.status(200).json(contacts);
    // console.log("contacts", contacts);
  } catch (error) {
    console.log(error);
  }
};

// delete contacts

const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("deleted contact id", req.params);
    const deletedData = await Contact.deleteOne({ _id: id }); // deleted with just one query
    // console.log("deleted data based on id", deletedData);
    return res.status(200).json("Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

const AdminController = {
  getUsers,
  getContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};
module.exports = AdminController;
