const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    //this is a middleware so we need to use next, otherwise it will get stuck here
    //only if 'next' is used, it will go to authcontrollers.user
    const token = req.header("Authorization");  //NOTE: header not headers

    if(!token){ //this whole part is AUTHENTICATION
        return res.status(401).json({message: "Unauthorised HTTP, Token not provided!!"});
    }
    
    console.log("token from auth middleware", token);

    //Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix
    const jwtToken = token.replace("Bearer ", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        
        const userData = await User.findOne({email: isVerified.email}).
        select({
            password: 0,
        }); //we dont want the password in the request
        console.log(userData);

        //adding custom properties to request
        //this modified req will get passed to the authcontrollers.user
        //this req will have the data of the logged in user
        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        //In Express.js, req object is an object that contains information about the HTTP request.
        //By adding custom properties to req, you can pass information between middleware functions
        //or make it available in your route handlers.

        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorised. Invalid token!!"});
    }

};

module.exports = authMiddleware;