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

/**
 * @swagger
 *  definitions:
 *   NewUser:
 *      type: object
 *      required:
 *          - email
 *          - password
 *      properties:
 *          name:
 *              type: string
 *          email:
 *              type: string
 *          password:
 *              type: string
 */

/**
 * @swagger
 * /api/signup:
 *  post:
 *    summary: Create a User or User Register
 *    description: Use to request an user register
 *    requestBody:
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/NewUser'
 *    produces:
 *      - application/json
 *    responses:
 *      "200":
 *         description: Object with user registered!
 *      "400":
 *         description: A bad request response!
 */
router.post('/signup',userSignupValidator, signup);

/**
 * @swagger   
 * /api/signin: 
 *  post:
 *    summary: signin user
 *    description: Use to request signin user
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                  type: string
 *                  required: true
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  required: true
 *                  description: password user valid
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.post("/signin", signin);       

/**
 * @swagger
 * /api/signout:
 *  get:
 *      summary: signout user
 *      description: Use to request logout user
 *      responses:
 *          "200":
 *              description: A succesfull response
 */
router.get('/signout',signout);

module.exports = router;
