const mongoose = require('mongoose');
const {ObjecId} = mongoose.Schema;

// Car Item Schema

const CarItemSchema = new mongoose.Schema(
    {
        product : {type : ObjecId, ref : 'Product'},
        name: String,
        price: Number,
        count: Number

    },
    {timestamps:true}
);

const CarItem = mongoose.model('CarItem',CarItemSchema);

// Order Schema

const orderSchema = new mongoose.Schema(
    {
        products: [CarItemSchema],
        transaction_id: {},
        amount:{type:Number},
        address: String,
        status:{
            type:String,
            enum: ['Not processed', 'Processing','Shipped','Delivered','Cancelled'], // enum means string objects
            default :'Not processed'
        },
        updated: Date,
        user:{ type: ObjecId, ref:'User'}
    },
    {timestamps: true}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = {CarItem,Order};