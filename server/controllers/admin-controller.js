const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password:0});
        console.log(users);
        //this will fetch all the users into the 'users' variable
        //but this will also fetch the passwords as well and we dont want that
        //writing password:0 will fetch the details without the passwords.
        if(!users || users.length === 0){
            res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

//fetch single user's details
const getUserById = async (req, res) => {   //when admin will click on edit button corresponding to a user, its id will be sent to backend and it will find it in db
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

//deleting a user -> only admin has the access
const deleteUserById = async (req, res) => {
    try {
        //if someone is passing data in URL, then we can get it using params
        const id = req.params.id;
        await User.deleteOne({_id: id}); //if any _id in db matches with the id passed in url then delete it
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        next(error);
    }
};

//updating user
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body; //this will contain all the data that the user will type in
        const updatedData = await User.updateOne({_id: id},{
            $set: updatedUserData,  //this is the syntax, replace old data with the new data
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length === 0){
            res.status(404).json({ message: "No contacts found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

//deleting a contact -> only admin has the access
const deleteContactById = async (req, res) => {
    try {
        //if someone is passing data in URL, then we can get it using params
        const id = req.params.id;
        await Contact.deleteOne({_id: id}); //if any _id in db matches with the id passed in url then delete it
        return res.status(200).json({message: "Contact deleted successfully"});
    } catch (error) {
        console.log("error while deleting contact");
        next(error);
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById };