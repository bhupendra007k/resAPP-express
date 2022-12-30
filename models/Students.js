const mongoose=require('mongoose');

const { v4: uuidv4 } = require('uuid');


var DateOnly = require('mongoose-dateonly')(mongoose);

var studentsSchema=new mongoose.Schema({
    _id:{type:String,default:()=>uuidv4()},
    name:{
        type:String,
        required:true
    },
    roll:{
        type:Number,
        required:true,
        unique:true
        
    },
    score:{
        type:Number,
        min:1,
        max:1000,
        required:true,
        validate:{
            validator:x=>(0<x<=1000)?true:false,
            message:props=>`${props.value} exceeds the defined range`,
        }
    },
    dob:{
        type:DateOnly,
        required:true
    },
    createdAt:{
        type:Date,
        default:()=>Date.now(),
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:()=>Date.now(),
        immutable:false,
        options:{strict:false}
    }

},{id:false});

module.exports = mongoose.model("Students",studentsSchema) 