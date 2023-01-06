const Students = require("../models/Students");
const Teachers = require("../models/Teachers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const teacherLoginGet = async (req, res) => {
  res.render("teacher/teacherLogin", { message: "" });
};

// const teacherLoginPost = async (req, res, next) => {
//   let data = { ...req.body };
//   const teacher = await Teachers.findOne({ name: data.name });
//   console.log(teacher);

//   try {
//     bcrypt.compare(data.password, teacher.passwordHash, function (err, result) {
//       if (!result) {
//         res.render("teacher/teacherLogin", {
//           message: "password or username Invalid",
//         });
//       } else {
//         res.redirect("/teacher/option");
//       }
//     });
//   } catch (err) {
//     res.render("error", {
//       error: err,
//       message: "password or username Invalid",
//     });
//   }
// };

// const del =async(req,res)=>{
//   req.logOut();
//   return res.render('teacher/teacherLogin')
// }


const teacherViewAllGet = async (req, res) => {
  try {
    const data = await Students.find();
    res.render("teacher/viewall", { student: data });
  } catch (err) {
    res.send(err);
  }
};

const updateStudentByIdGet = async (req, res, next) => {
  const user = await Students.findById(req.params.id);
  res.render("teacher/edit", { student: user });
};

const updateStudentByIdPost = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    var user = await Students.findByIdAndUpdate(id, { ...data });
    await user.save();

    res.redirect("/teacher/viewall");
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const deleteStudentById = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    await Students.findByIdAndDelete(id);

    res.redirect("/teacher/viewall");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `unable to delete user with id:${id}` });
  }
};
const teacherOptions = async (req, res) => {
  res.render("teacher/option");
};

const addStudentGet = async (req, res) => {
  res.render("teacher/addstudent");
};

const addStudentPost = async (req, res) => {
  updated_month = req.body.dob.month;
  const student = new Students({
    name: req.body.name,
    roll: req.body.roll,
    dob: req.body.dob,
    score: req.body.score,
  });
  try {
    console.log(student.name);
    await student.save();

    res.render("teacher/addstudent");
  } catch (error) {
    return res.status(500).json({ message: `unable to add ${student.name} ` });
  }
};

module.exports = {
  teacherLoginGet,
  teacherViewAllGet,
  updateStudentByIdGet,
  updateStudentByIdPost,
  deleteStudentById,
  teacherOptions,
  addStudentGet,
  addStudentPost,
};
