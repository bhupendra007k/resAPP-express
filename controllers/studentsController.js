const Students = require("../models/Students");
const jwt = require("jsonwebtoken");

const studentLoginGet=async(req,res,next)=>{

    res.render("student/login")

}

const studentLoginPost=async(req,res,next)=>{
    const {roll,dob} = req.body;
    const student = await Students.findOne({ roll: roll });
  
    let jwtsecretKey = process.env.JWT_SECRET_KEY;
    let data = { ...req.body };
    let formattedNumber = student.dob.month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })

    const str=`${student.dob.year}-${formattedNumber}-${student.dob.date}`
  
    const token = jwt.sign(data, jwtsecretKey);
    const flag=(student.roll==roll&&str==dob)?true:false
    try {
      if (!flag) {
        // res.status(500).json({ message: "user doesn't exists" });
        res.render("student/login",{error:"dob and roll mismatched"})
      }
    // res.status(200).json({ student: student, jwt: token });
    res.render("student/view",{one:student})
    } catch (err) {
      res.render("/error",{ error: err });
    }
}

module.exports={
    studentLoginGet,
    studentLoginPost
}