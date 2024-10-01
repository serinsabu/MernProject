require("dotenv").config(); // you can use .env after this line
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// middleware

// handling cors policy
var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// this line of code adds express middleware that parses incoming request bodies with JSON payloads. Its important to place this
// before any routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests
// and it should be applied at the beginning of your middleware stack to ensure that its available for all subsequent route handlers
app.use(express.json());

//Mount the Router : To use the router in your main Express app, you can "mount" it at a specificURL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// admin route
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);

const PORT = 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
});
