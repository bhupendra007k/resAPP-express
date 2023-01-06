const Students = require("../models/Students");
const jwt = require("jsonwebtoken");
const LocalStorage = require('node-localstorage').LocalStorage,

localStorage = new LocalStorage('./scratch');
const studentLoginGet=async(req,res,next)=>{

    res.render("student/login",{message:''})

}

const studentLoginPost=async(req,res,next)=>{
    const {roll,dob} = req.body;
    try {
      const student = await Students.findOne({ roll: roll });
      genMonth=student.dob.month+1;
      let formattedNumber = genMonth.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      const str=`${student.dob.year}-${formattedNumber}-${student.dob.date}`
      const flag=(student.roll==roll&&str==dob)?true:false
      if (!flag) {
        
        res.render("student/login",{message:"Invalid Roll number or password"})
      }
    
    else{
      const token = jwt.sign(data, jwtsecretKey);
      localStorage.setItem('token',token)
      res.render("student/view",{one:student})
    }
    } catch (err) {
      res.render("/error",{ error: err});
    }
}

module.exports={
    studentLoginGet,
    studentLoginPost
}