//in mongoDB, a 'collection' is a group of related 'documents' or data entries

const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDb = async () => {
    try {
        //this connectDb function will return a promise, as we are using await
        await mongoose.connect(URI);
        console.log("connection successful to DB");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;