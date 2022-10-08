
require('dotenv').config();

const routes = require('./Routes/routes')
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(express.json());

// connection with db
mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error',(error)=>{
    console.log(error);
});

database.once('connected',()=>{
    console.log('Database Connected...!!!');
});


app.use('/api',routes);


// start server at 3000

app.listen(3000,()=>{
    console.log(`Server Started at ${3000}`);
});