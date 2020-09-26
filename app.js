// Generic import

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

// import routers

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const brainTreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

// app - express

const app = express();

// db modern connection

const db = async () => {
    try{
        const success = await mongoose.connect(process.env.DATABASE,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB connected');
    }catch(e){
        console.log('DB Connection Error',e);
    }
}

// Excute DB connection

db() 

// Middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes Middlewares

// app.use('/api',authRoutes);
// app.use('/api',userRoutes);
// app.use('/api',categoryRoutes);
// app.use('/api',productRoutes);
// app.use('/api',brainTreeRoutes);
// app.use('/api',orderRoutes);

// Port

const port = process.env.PORT || 8000;

// Listen port

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});

