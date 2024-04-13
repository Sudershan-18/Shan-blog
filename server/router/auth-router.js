//express.Router:
//In Express.js, express.router() is a mini Express application without all the server configurations but with the ability to define routes, middleware,
//and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organised and maintainable.

// https://expressjs.com/en/guide/routing.html
// Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

const express = require("express");
const router = express.Router();
//since we need to write 'service, about, contact, etc.' in below line
//its better to pass a reference
// const {home, register}  = require("../controllers/auth-controller");
const authcontrollers  = require("../controllers/auth-controller");
const {signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// router.get("/", (req, res) => {
//     res.status(200).send("brushing up my skills :), this is using router");
// });

//GET -> Read data
//POST -> Insert data
//PUT or PATCH -> Update data
//DELETE -> Delete data

//in this format, we can use chaining, which means that all the METHODs can be used in the same line
// router.route("/").get((req, res) => {
//     res.status(200).send("brushing up my skills :), this is using router");
// });
router.route("/").get(authcontrollers.home);
//this is kinda like dispatch and action
//.route is dispatch and .get is action
//.get is 'controller'
//action is the description of what you want to do and
//dispatch is the function that carries it out

// router.get("/register", (req, res) => {
//     res.status(200).send("This is resgistration page.");
// });

// router.route("/register").get((req, res) => {
//     res.status(200).send("This is resgistration page.");
// });
// router.route("/register").post(authcontrollers.register);
router.route("/register").post(validate(signupSchema), authcontrollers.register);
//we used zod validation, so it is passed as a middleware in the above line

router.route("/login").post(validate(loginSchema), authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;