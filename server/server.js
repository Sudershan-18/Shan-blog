//Authentication?
//Authorization?
//What is a JSON format?
//What are the different kinds of format?
//Middleware meaning?
//Promise?
//bcrypt documentation?
//middleware?
//status codes?
//Zod validation?
//Type script?
//HTML full form and what it is?
//CSS full form and what it is?
//errorhandler EXPRESS?
//params?
//multer?
//parsing?
//why to use multer with FormData?

//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
// const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const allBlogsRoute = require("./router/all-blogs-router");
const blogRoute = require("./router/blog-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//handling CORS policy
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

//we need to tell our express app that it should use 'json' format, otherwise it cannot display the json format
//this is nothing but a middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(upload.none());
//This line of code adds Express middleware that parses incoming request bodies with JSON payloads. It's important to place this
//before any routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests and
//it should be applied at the beginning of your middleware stack to ensure it is available for all subsequent route handlers.

//Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
//since we are using router, it wont execute the app.METHOD, instead it will execute the router.METHOD which are inside the auth-router.js
app.use("/api/auth", authRoute); //we can leave the path empty but its kind of a convention to call it api, REST api
//now we can delete/comment out the app.METHOD code
//did this to make code look clean.

//Routing: refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
//Each route can have one or more handler functions, which are executed when the route is matched.

//app.get() -> set up a route handler for HTTP GET requests.
//"/" -> PATH
//(req, res) => {...} -> HANDLER(the function executed when the route is matched) an arrow function for handling(and sending) the request and constructing the response(server will send the res, database can send the response as well)
//res.json("Hello world!!") -> sends the message "Hello world!!" when someone accesses this route
// app.get("/", (req, res) => {
//     res.status(200).send("brushing up my skills :)");
// });

// app.get("/register", (req, res) => {
//     res.status(200).send("This is resgistration page.");
// });

app.use("/api/form", contactRoute);
// app.use("/api/data", serviceRoute);

//defining admin route
app.use("/api/admin", adminRoute);

//for getting all the blogs
app.use("/api/blogs", allBlogsRoute);

//this route is for creating a blog
app.use("/api/blog", blogRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
    //A 'port' in backend development serves as a designated endpoint for communication between servers and clients, facilitating the exchange of data over a network.
    //In the context of frontend development, the term 'port' refers to the port number on which your local development server is serving your frontend application for testing and development purposes.
    //listen() in Express is like telling your app to start listening for visitors on a specific address and port, much like how Node listens for connections.
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
});