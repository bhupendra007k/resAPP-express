const Students = require("../models/Students");
const Teachers = require("../models/Teachers");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const teacherLoginGet = async (req, res) => {
  res.render("teacher/teacherLogin");
};

const teacherLoginPost = async (req, res, next) => {
  let jwtsecretKey = process.env.JWT_SECRET_KEY;
  let data = { ...req.body };

  const token = jwt.sign(data, jwtsecretKey);
  console.log(token);

  
  const teacher = await Teachers.findOne({ name: data.name });
  console.log(teacher);

  try {
    bcrypt.compare(data.password, teacher.passwordHash, function (err, result) {
      if (!result) {
        // res.status(500).redirect({ message: "password did not match" });
        res.render("teacher/login",{error:"password did not match"})
      }
    //   res.status(200).json({ message: `${data.name} logged in successfully`, jwt: token });
      res.redirect("/teacher/option")
    });
  } catch (err) {
    res.render("error",{error:err,message:"password or username Invalid"});
  }
};

const teacherViewAllGet = async (req, res) => {
  try {
    const data = await Students.find();
    // res.json(data);
    res.render("teacher/viewall", {student : data});
  } catch (err) {
    res.send(err);
  }
};

const updateStudentByIdGet = async (req, res, next) => {
  const user = await Students.findById(req.params.id);
  res.render("teacher/edit", {student : user})
};

const updateStudentByIdPost = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    var user = await Students.findByIdAndUpdate(id, { ...data });
    await user.save();
    // res.status(200).json({message: `user with id ${id} updated successfully`});
    res.redirect("/teacher/viewall")
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" });
  }
};


const deleteStudentById = async (req, res) => {
  let student;
  const id = req.params.id;
  try {
    console.log(id);
    await Students.findByIdAndDelete(id);
    // res.status(200).json({ message: `user ${id} is deleted successfully` });
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
    const student = new Students({
        name : req.body.name,  
        roll : req.body.roll,             
        dob : req.body.dob, 
        score : req.body.score        
    })
  try {
    console.log(student.name);
    await student.save();
    // res.status(200).json({
    //   message: `${student.name} is added successfully`,
    // });
    res.render("teacher/addstudent")
  } catch (error) {
    return res.status(500).json({ message: `unable to add ${student.name} ` });
  }
};


module.exports={
    teacherLoginGet,
    teacherLoginPost,
    teacherViewAllGet,
    updateStudentByIdGet,
    updateStudentByIdPost,
    deleteStudentById,
    teacherOptions,
    addStudentGet,
    addStudentPost
}






