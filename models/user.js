const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    googleID: {
        type:String
    },
    thumbnail: {
        type:String
    },
    preOrders:{
        type: [Object]
    },
    newOrder: {
        type: [Object]
    },
    useraddress:{
        type:String,
        default:"update-address"
    },
    wallet:{
        type:Number,
        default:1200
    }
},{timestamps:true});

const User = mongoose.model('user',userSchema);
module.exports = User;