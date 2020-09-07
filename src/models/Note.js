const mongoose= require('mongoose');
const {Schema}= mongoose;

let Note= new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    date:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Note',Note)