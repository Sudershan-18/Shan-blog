const express = require("express");
const router = express.Router();
const { blogForm, getBlogById, editBlog, deleteBlog } = require("../controllers/blog-controller");
const upload = require("../middlewares/multer");

router.route("/create").post(upload.single("file"), blogForm);
router.route("/:id").get(getBlogById);

router.route("/edit/:id").patch(upload.single("file"), editBlog);
router.route("/delete/:id").delete(deleteBlog);

module.exports = router;