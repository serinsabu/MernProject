/*
Error Handling
Error Handling refers to how Express catches and processes errors that occur both synchronously and asynchronously. 
Express comes with a default error handler so you don’t need to write your own to get started.

Catching Errors
It’s important to ensure that Express catches all errors that occur while running route handlers and middleware.

Errors that occur in synchronous code inside route handlers and middleware require no extra work. 
If synchronous code throws an error, then Express will catch and process it.

*/

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";
  const reason = err.reason || "Error from Backend";

  return res.status(status).json({ message, reason });
};

module.exports = errorMiddleware;
