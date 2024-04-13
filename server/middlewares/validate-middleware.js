//Given any Zod schema, you can call its '.parse' method to check 'data' is valid.
//If it is, a value is returned with full type information! Otherwise, an error is thrown.

const validate = (schema) => async (req, res, next) => {    //'schema' is the signupSchema which we defined in auth-validator.js
    try {
        //below line is the line where you use Zod to validate the request body data against the defined schema.
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the inputs properly";
        const extraDetails = err.errors[0].message;  //the errors which we are getting is an array from Zod, so lets take the first element
        
        const error = {status, message, extraDetails};
        
        // console.log(message);
        // res.status(400).json({msg: "validation failed!"});
        // res.status(400).json({msg: message});
        //since we have created error middleware now we will let it handle the errors
        next(error);
    }
};

module.exports = validate;