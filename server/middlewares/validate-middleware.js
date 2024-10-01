//? await schema.parseAsync(req.body) is the line where you use zod to validate the request body data against the defined schema
/*
.parse(data:unknown): T - synchronous

Given any zod schema, you can call its `.parse` method to check data is valid. If it is, a value is returned with full  
information! Otherwise an error is thrown.

.parseAsync(data:unknown): Promise<T> - asynchronous

If you use asynchronous [refinements] or transforms you will need to use parseAsync
*/
//next - middleware
const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body); // checks if it matches with our schema
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Please enter all the details";
    const reason = err.errors[0].message;
    const error = {
      status,
      message,
      reason,
    };
    // const message = error.errors[0].message;
    // res.status(400).json({ message: error });
    next(error);
  }
};

module.exports = validate;
