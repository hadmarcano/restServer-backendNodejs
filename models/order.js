const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

// Car Item Schema

const CartItemSchema = new mongoose.Schema(
    {
        product : {type : ObjectId, ref : 'Product'},
        name: String,
        price: Number,
        count: Number

    },
    {timestamps:true}
);

const CartItem = mongoose.model('CartItem',CartItemSchema);

// Order Schema

const orderSchema = new mongoose.Schema(
    {
        products: [CartItemSchema],
        transaction_id: {},
        amount:{type:Number},
        address: String,
        status:{
            type:String,
            enum: ['Not processed', 'Processing','Shipped','Delivered','Cancelled'], // enum means string objects
            default :'Not processed'
        },
        updated: Date,
        user: { type: ObjectId, ref:'User'}
    },
    {timestamps: true}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = {CartItem,Order};