/*
In express, controller refers to a part of your code that is responsible for handling the application logic.
Controllers are typically used to process incoming requests ( from router ), interact with models ( data sources ) and send responses back to clients.
They help organize your application by separating concerns and following the MVC design pattern.
*/

const User = require("../models/user-model");

// Home page logic
// asynchronous function
const home = async (req, res) => {
  try {
    res.status(200).send("Hello my name is SERIN SABU using Router");
  } catch (error) {
    console.log(error);
  }
};

// registration logic
// 1. Get Registration data : Retrieve user data (username, email, password)
// 2. Check Email Existence: Check if the email is already registered
// 3. Hash password: Secretly hash the password
// 4. Create User: Create a new user with hashed password
// 5. Save to Db: Save user data to the database
// 6. Respond: Respond with "Registration successful" or handle errors

//1.
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    //2.
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3. hash the password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound); or did it in user-model file

    // 4,5,6 done
    const createUser = await User.create({
      username,
      email,
      phone,
      password,
    });
    // await is written because it returns promises
    res.status(201).send({
      msg: "registration successful",
      token: await createUser.generateToken(),
      userId: createUser._id.toString(),
    });
  } catch (error) {
    // res.status(500).json("internal server error ");
    next(error);
  }
};

// Login page

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check for user validation if exists or not
    const userExists = await User.findOne({ email });

    // if does not exist
    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // console.log(userExists);
    // if exists
    const isPasswordValid = await userExists.comparePassword(password);
    // console.log("Password valid:", isPasswordValid);

    if (isPasswordValid) {
      let token;
      try {
        token = await userExists.generateToken();
        // console.log("Generated token:", token);
      } catch (error) {
        console.error("Error generating token:", error);
        return res.status(500).json({ message: "Error generating token" });
      }
      // send back the response saying login is successful
      res.status(200).send({
        message: "Login Successful",
        token: token,
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    // res.status(500).json("internal server error");
    next(error);
  }
};

// to send user data

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log("userData", userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
  }
};

const AuthController = { home, register, login, user };
module.exports = AuthController;
