/*
Schema : Defines the structure of the documents within a collection.
It specifies the fields, their types, and any additional constraints or validations
*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// instance of mongoose schema
// Model: acts as a high level abstraction that interacts with the database based schema. It represents a collection and provides an interface for querying, creating,
// updating, deleting documents in that collection.
// Models are chreated from schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure password with bcrypt
// a middleware
userSchema.pre("save", async function (next) {
  const user = this; // it has all the user data, so hash before it is saved in the database

  if (!user.isModified("password")) {
    // means password is already encrypted
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//  compare password with hashed password to check if the password is valid
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// JWT
// using methods you can create to define or create any number of functions or methods and can be access in any individual page
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        //payload
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      //signature
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// define the model or collection name - first letter must be capital
const User = new mongoose.model("User", userSchema); //pass collection name and structure of the user data , userSchema is defined above
module.exports = User;

/*
What is JWT?
JSON Web Token is an open standard (RFC 719) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object
- Tokens sucha as JWTs are typically not stored in database along with other user etails. Instead, they are issued by the server during the authentication process
and then stored on the client-side (eg: in browser in form of cookies or local storage) for later use.
- JWTs are often used for authentication and authorization in web applications
1. Authentication - Verifying the identity of a user or client
2. Authorization - Determining what actions a user or client is allowed to perform 

**Components of JWT**
- Header : Contains meta data about the token, such as the type of token and the signing algorithm being used.
- Payload : Contains claims or statements about an entity ( typically, the user ) and additional data.
Common claim includes userId, username, expiration time
- Signature : To verify that the sender of the JWT is who it says it is and to ensure that the message wasnt changed along the way , a signature is included



*/
