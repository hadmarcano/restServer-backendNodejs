
const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

// new braintree.connect()
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREEmerchantId,
    publicKey: process.env.BRAINTREEpublicKey,
    privateKey: process.env.BRAINTREEprivateKey
  });


  // Middlewares Rest

exports.generateToken = (req,res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).send(err);
        }else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // Charge...
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if(error){
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
}
