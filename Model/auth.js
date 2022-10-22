const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    isVerify:{
        type:Boolean,
        required:false
    }
});

module.exports = mongoose.model('Authentication',dataSchema);

