const mongoose=require('mongoose')
const { v4: uuidv4, stringify } = require('uuid');
// const bcrypt = require('bcryptjs');



var teachersSchema=new mongoose.Schema({
    _id:{type:String,default:()=>uuidv4()},
    name:{
        type:String,
        required:true
    },
    password:{ type:String,
        validate: {
            validator: function(v) {
                var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
                return  re.test(v)
            },
            message: 'Password is invalid.'
        }
    },
    passwordHash:{
        type:String
    },
    createdAt:{
        type:Date,
        default:()=>Date.now(),
        immutable:true
    },


},{id:false});


module.exports = mongoose.model("Teachers",teachersSchema) 