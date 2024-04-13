const Blog = require("../models/blog-model");

const allBlogs = async (req, res) => {
    try {
        const response = await Blog.find()
            .populate('author', ['username'])
            .sort({createdAt: -1})
            .limit(20); //all the blogs will be inside this response
        if(!response){
            //no document is found
            res.status(404).json({msg: "No blog found!!"});
        }
        res.status(200).json({msg: response
            
        });
    } catch (error) {
        console.log(`allBlogs error: ${error}`);
    }
};

module.exports = allBlogs;