const express = require('express');
const router = express.Router();

// middlewares from controllers

const {
    signup,
    signin,
    signout,
} = require('../controllers/auth');

// middlewares from validator

const {userSignupValidator} = require('../validator/index');

// Routes

router.post('/signup',userSignupValidator, signup);
router.post('/signin',signin);
router.get('/signout',signout);

module.exports = router;
