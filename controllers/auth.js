const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const {errorHandler} = require('../helpers/dbErrorHandler');

// Middlewares

exports.signup = (req,res) => {
    const user = new User(req.body);
    user.save((err,user)=>{
        if (err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt =undefined;
        user.hashed_password = undefined;
        res.json({user});
    })
}




exports.signin = (req,res) => {
    // find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if( err || !user){
            return res.status(400).json({
                error: "User with that email does not exist. please signup"
            });
        }
        // if user found make sure the email and password
        //create authenticated
        if(!user.authenticated(password)){
            return res.status(401).json({
                error: "Email and password dont match"
            });
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // Persist the token as 't' in cookie with expires date
        res.cookie("t", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
        //return response with user and token to client frontend
        const {_id, name, email, role} = user;
        return res.json( {
            token,
            user: {
                 _id, 
                 name, 
                 email, 
                 role
            } 
        });

    });

}; 

exports.signout = (req,res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success"});
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req,res, next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();

};

exports.isAdmin = (req, res, next) =>{
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
}