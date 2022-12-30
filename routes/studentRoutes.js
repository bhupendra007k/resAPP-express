var express = require('express');
var router = express.Router();
const Teachers=require('../models/Teachers')
const Students=require('../models/Students')
// const jwt=require('jsonwebtoken')
const{ studentLoginGet,
  studentLoginPost}=require('../controllers/studentsController')

/* GET users listing. */





// router.get("/:id", async (req, res, next) => {
//   const studentId = req.params.id;
//   console.log(studentId);

//   try {
//     const student = await Students.findById(studentId );
//     return res.status(200).json(student);
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: `can't find student with id ${studentId}` });
//   }
// });



// router.post('/login',async function(req,res,next){
//   let jwtsecretKey=process.env.JWT_SECRET_KEY
//   let data={...req.body}

//   const token=jwt.sign(data,jwtsecretKey);

//   const {username,password}=req.body
//   const teacher=await Teachers.findOne({username:username})
//   console.log(teacher);

//   try{
//     bcrypt.compare(password,teacher.passwordHash,function(err,result){
//       if(!result){
//         return res.status(500).json({message:"password did not match"})
  
//       }
//       return res.status(200).json({message:`${username} logged in successfully`,jwt:token})
    
//     })

//   }
//   catch(err){
//     return res.status(500).json({message:"username or passwor invalid"})

//   }

// })

router.get('/login',studentLoginGet);
router.post('/login',studentLoginPost);








module.exports = router;
