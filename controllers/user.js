const User = require('../models/user');
const {Order} = require('../models/order');
const {errorHandler} = require('../helpers/dbErrorHandler');
const { use } = require('../routes/user');

// Middlewares rest

exports.userById = ( req, res ,next ,id ) => {
    User.findById(id).exec((err,user) =>{
        if(err || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req,res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req,res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }

    );
};

exports.addOrderToUserHistory = (req, res, next) => {

};

exports.purchaseHistory = (req, res) => {

};