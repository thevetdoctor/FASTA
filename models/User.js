const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:string,
        required: True
    },
    email: {
        type:string,
        required: True
    },
    password: {
        type:string,
        required: True
    },
    date: {
        type: Date,
        default:Date.now
    }    
});

 

module.exports = User = mongoose.model('user', UserSchema);