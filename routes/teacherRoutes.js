var express = require("express");
const Teachers = require("../models/Teachers");
const bcrypt = require("bcryptjs");
const passport = require("passport");
var router = express.Router();

const {
  teacherLoginGet,
  teacherViewAllGet,
  updateStudentByIdGet,
  updateStudentByIdPost,
  deleteStudentById,
  teacherOptions,
  addStudentGet,
  addStudentPost,
} = require("../controllers/teacherController");

const initializePassport = require("../passport-config");

initializePassport(passport, (name) => Teachers.findOne({ name }));

function checkAuthenticated(req, res, next)
 {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/teacher/login");
  }
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/teacher/option');
  }
  next();
}

router
  .route("/login")
  .get(checkNotAuthenticated,teacherLoginGet)
  .post(
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/teacher/option",
      failureRedirect: "/teacher/login",
      failureFlash: true,
    })
  );
router.get("/viewall", checkAuthenticated, teacherViewAllGet);
router.get("/edit/:id", checkAuthenticated, updateStudentByIdGet);
router.post("/edit/:id", checkAuthenticated, updateStudentByIdPost);
router.get("/delete/:id", checkAuthenticated, deleteStudentById);
router.get("/option", checkAuthenticated, teacherOptions);
router.get("/add", checkAuthenticated, addStudentGet);
router.post("/add", checkAuthenticated, addStudentPost);

//add new Teacher

// router.post('/addteacher',async function(req,res,next){
//   const {name,password}=req.body;
//   const saltRounds=10

//   try{
//     bcrypt.hash(password,saltRounds,async function(err,hash){
//       try{
//         if(!hash){
//           return res.status(417).json({message:`unable to generate hash`})

//         }

//         var teacher=new Teachers({name:name,password:password,passwordHash:hash});
//         await teacher.save();
//         return res.status(200).json({ message:`teacher ${teacher.name} added successfully`});

//       }
//       catch(err){
//         res.send(err.message)
//       }
//     })

//   }
//   catch(err){
//     return res.status(500).json({message:`unable to add ${name}`})
//   }
// });

module.exports = router;
