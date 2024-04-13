const adminMiddleware = async (req, res, next) => {
    try {
        //since authmiddleware is called first, it can share the req which contains the data of logged in user
        console.log("data of user is: ", req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message: "Access denied. You are not an admin!"});
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = adminMiddleware;