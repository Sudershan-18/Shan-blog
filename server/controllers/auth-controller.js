//In an Express.js application, a controller refers to a part of your code that is responsible for handling the application's logic.
//Controllers are typically use to process incoming requests, interact with models(data sources), and send responses back to clients.
//They help organise your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const User = require("../models/user-model");
const bcrypt = require("bcrypt");

//Home Logic

//since we are using async, we should always use try, catch as a good practice
//though there is a library in express named asynchandler, which throws the error automatically, without calling this try and catch
const home = async (req, res) => {
    try{
        res.status(200).send("brushing up my skills :), this is using router");
    } catch (error) {
        console.log(error);
    }
};

//Steps:
//1. Get Registration data: username, email, phone
//2. Hash Password: Securely hash the password
//3. Create User: Create a new user with hashed password
//4. Save to DB: save user data to the database
//5. Repond: respond with the 'Registration sucessful' or handle errors.

const register = async (req, res) => {
    try {
        // console.log(req.body);
        // res.status(200).send("This is resgistration page. (using controllers again)");
        // res.status(200).send({message: req.body});

        const { username, email, phone, password } = req.body;
        
        //quick note: we need to use await whenever we use findOne
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "email already exists"});
        }
        
        //hash the password
        //This is on way to save the hash_password, but we want to keep the code, lets do it in the user schema itself
        // const saltRound = 10; //the more is the saltRound, the more complex will be the hash password
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({
            username, 
            email, 
            phone, 
            password
        });

        res.status(201).send({
            msg: "Registration successful :)", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString(),
            //NOTE: _id is actually an Object so we need to convert it into string
            //In most cases, converting _id to a string is a good practice because it ensures consistency
            //and compatibility across different JWT libraries and systems. It also aligns with the expectation
            //that claims that JWTs is represented as strings.
        });
    } catch (error) {
        // console.log(error);
        // res.status(500).send("Internal server error");

        //since we made the error handler now, we do not want to send the res of error to the client but to the error middleware(backend)
        next(error);    //after that we can share the error with the client
    }
};

//What is JWT?
//JSON Web Token is an open standard that defines a compact and self contained way
//for securely transmitting information between parties as a JSON object.
//JWTs are often used for authentication and authorization in web application.
//1. Authentication: verifying the identity of a user or client. (verification)
//2. Authorization: determining what actions a user or client is allowed to perform. (check if they are allowed to edit something, some post or not)

//eg: some people booked rooms in a hotel.
//firstly when they will check in, in the hotel, they will be authenticated or verified that if they have booked some room or not?
//after that they will be given access cards to their respective room
//they will only be 'authorised' to enter their own room with the access key

//Componenets of a JWT:
//Header: contains metadata about the token, such as the type of token(JSON in this case) and additional data.
//Payload: contains claims or statements about an entity(typically, the user) and additional data.
//common claims like user ID, username, expiration time, BUT NOT THE PASSWORD as it is a sensitive infomation which we do not want to send as a JSON token
//Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way
//BTW, these components are encoded

//NOTE: Tokens, such as JWTs are typically not stored in the database along with other user's details. Instead, they are issued by the server during the authentication process
//and then stored on the client-side(e.g. in cookies or local storage) for later use.
//more details later....

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist);
        //if we find an email, then userExist will contain all the details corresponding to that email

        if(!userExist){
            return res.status(400).json({ message: "Invalid Credentials !!"});
        }

        // const user = await bcrypt.compare(password, userExist.password);
        //we want to create a function in user-model to compare password like we did while creating the JWT
        const user = await userExist.comparePassword(password);
        
        if(user){
            res.status(200).send({
                msg: "Login successful :)", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({message: "Incorrect email or password !!"});
            //401 means Unauthorised
        }

    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

//user logic - to send user's data

const user = async (req, res) => {
    try {
        //the only thing to figure out is that from where am I gonna get this req.user
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}

module.exports = { home, register, login, user };