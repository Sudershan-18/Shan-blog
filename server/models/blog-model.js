const {Schema, model} = require("mongoose");

const blogSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: {
        publid_id: String,
        url: String,
    },
    author: {type: Schema.Types.ObjectId, ref:'User'}, //this means that we are refencing the author as the id of the 'user' (the logged in user)
}, {
    timestamps: true,
});

//create a model or collection
const Blog = new model('Blog', blogSchema);
module.exports = Blog;