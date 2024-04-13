const express = require("express");
const allBlogs = require("../controllers/allBlogs-controller");
const router = express.Router();

router.route("").get(allBlogs);

module.exports = router;