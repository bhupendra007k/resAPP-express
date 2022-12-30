var express = require("express");
const Teachers=require('../models/Teachers')
const bcrypt = require('bcryptjs');

var router = express.Router();

const {
  teacherLoginGet,
  teacherLoginPost,
  teacherViewAllGet,
  updateStudentByIdGet,
  updateStudentByIdPost,
  deleteStudentById,
  teacherOptions,
  addStudentGet,
  addStudentPost,
} = require("../controllers/teacherController");

router.get("/student/:id", async (req, res, next) => {
  const studentId = req.params.id;
  console.log(studentId);

  try {
    const student = await Students.findOne({ _id: studentId });
    return res.status(200).json(student);
  } catch (err) {
    return res
      .status(500)
      .json({ message: `can't find student with id ${studentId}` });
  }
});

router.post('/addteacher',async function(req,res,next){
  const {name,password}=req.body;
  const saltRounds=10

  try{
    bcrypt.hash(password,saltRounds,async function(err,hash){
      try{
        if(!hash){
          return res.status(417).json({message:`unable to generate hash`})
  
        }
        
        var teacher=new Teachers({name:name,password:password,passwordHash:hash});
        await teacher.save();
        return res.status(200).json({ message:`teacher ${teacher.name} added successfully`});

      }
      catch(err){
        res.send(err.message)
      }
    })

  }
  catch(err){
    return res.status(500).json({message:`unable to add ${name}`})
  }
});


// router.post("/student/login", async (req, res, next) => {
//   const stuRoll = req.body.roll;
//   const student = await Students.findOne({ roll: stuRoll });

//   let jwtsecretKey = process.env.JWT_SECRET_KEY;
//   let data = { ...req.body };

//   const token = jwt.sign(data, jwtsecretKey);
//   try {
//     if (!student) {
//       return res.status(500).json({ message: "user doesn't exists" });
//     }
//     return res.status(200).json({ student: student, jwt: token });
//   } catch (err) {
//     return res.status(500).json({ message: "roll no. or dob invalid" });
//   }
// });

router.get('/login',teacherLoginGet);
router.post('/login',teacherLoginPost);
router.get('/viewall',teacherViewAllGet);
router.get('/edit/:id',updateStudentByIdGet);
router.post('/edit/:id',updateStudentByIdPost);
router.get('/delete/:id',deleteStudentById);
router.get('/option',teacherOptions);
router.get('/add',addStudentGet);
router.post('/add',addStudentPost);







module.exports = router;
