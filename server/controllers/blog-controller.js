const Blog = require("../models/blog-model");
const cloudinary = require("../utils/cloudinary");

const blogForm = async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const { title, summary, content, author } = req.body;

        //since multer is used, it is temporarily storing the file in disk and giving us the file path, passing this path of the file into upload function
        const result_clodinary = await cloudinary.uploader.upload(req.file.path, {
            folder: "shan_blog",
        });
        console.log(result_clodinary);

        const blog = await Blog.create({
            title,
            summary,
            content,
            cover: {
                public_id: result_clodinary.public_id,
                url: result_clodinary.secure_url,
            },
            author,
        });

        res.status(201).json({ message: "Blog created successfully", blog }); // Added a success message and the created blog to the response
    } catch (error) {
        console.log("Blog form error: ", error);
        res.status(500).json({ error: "Internal server error from blog controller blog form" });
    }
};

const getBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Blog.findOne({_id: id}).populate('author', ['username']);
        // console.log(`res: ${data}`);
        return res.status(200).json(data);
    } catch (error) {
        console.log("getBlogById error: ", error);
        res.status(500).json({ error: "Internal server error from blog controller getBlogById" });
    }
};

const editBlog = async (req, res) => {
    console.log("Request Body:", req.body);
    try {
        const id = req.params.id;
        const { title, summary, content } = req.body;

        let result_clodinary = null;
        if(req.file){
            //since multer is used, it is temporarily storing the file in disk and giving us the file path, passing this path of the file into upload function
            result_clodinary = await cloudinary.uploader.upload(req.file.path, {
                folder: "shan_blog",
            });
            console.log(result_clodinary);
        }

        const blog = await Blog.updateOne({_id: id}, {
            title,
            summary,
            content,
            cover: result_clodinary ? {
                public_id: result_clodinary.public_id,
                url: result_clodinary.secure_url,
            } : Blog.cover,
        });

        res.status(201).json({ message: "Blog updated successfully", blog }); // Added a success message and the updated blog to the response
    } catch (error) {
        console.log("Edit blog server error: ", error);
        res.status(500).json({ error: "Internal server error from blog controller edit blog" });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        //we may add logic to delete the file from cloudinary as well, its easy :D
        await Blog.deleteOne({_id: id});
        return res.status(200).json({message: "Blog deleted successfully"});
    } catch (error) {
        // next(error);
        // console.log("deleteBlog error: ", error);
        res.status(500).json({message: "blog not deleted, internal server error."})
    }
};

module.exports = {blogForm, getBlogById, editBlog, deleteBlog};