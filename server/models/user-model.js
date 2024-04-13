//Schema: defines the structure of the documents within a collection.
//It specifies the field, their types, and any additional constraints or validations.
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

//secure the password with the bcrypt
//first arguement is the function that we are targetting
//which means that before saving we want to hash the password
userSchema.pre('save', async function(next){    //here next is just a middleware
    // console.log("pre method", this); //the data inside this has not been stored in the db yet
    const user = this;

    if(!user.isModified("password")){   //we are checking if password is modified or not
        next(); //if the password is not changed then just go to the next execution which is to save the data in the database
    }

    try {
        const saltRound = await bcrypt.genSalt(10); //the more is the saltRound, the more complex will be the hash password
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

//compare the password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

//JWT
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),    //'this' is payload
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error(error);
    }
};
//IMPORTANT: .methods is used to create more functions
//also called instance method

//Model: Acts as a higher-level abstraction that interacts with the database based
//on the defined schema. It represents a collection and provides an interface for
//querying, creating, updating, and deleting documents in that collection.
//Models are created from schemas and enable you to work with MongoDB data in a more
//structured manner in your application.

//define the model or collection name
//users, services, contacts in mongodb database webiste are the name of collections
//in the below line, it is a convention to use Upper case for the first letter of the collection/model name
//in mongodb databse/website, it will automatically be created as 'users'
const User = new mongoose.model("User", userSchema);
//first arguement is name of model, second is the schema which is defined above
module.exports = User;