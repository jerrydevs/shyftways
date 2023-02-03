const router = require("express").Router();

const Student = require('../db/models/student');

const createStudent = async (req, res) => {
  const { body } = req;
  console.log({body});

  const firstName = body.firstName;
  const lastName = body.lastName;
  const dateOfBirth = body.dateOfBirth;

  const newStudent = await Student.create({
    first_name: firstName,
    last_name: lastName,
    date_of_birth: dateOfBirth,
  });

  console.log({newStudent});

  return res.status(201).json(newStudent)
}

const getStudents = async (req, res) => {
  let allStudents;
  try {
    allStudents = await Student.findAll()
  } catch (error) {
    console.error(error);
    return
  }

  return res.status(200).json(allStudents);
};

router.route('/student').post(createStudent);
router.route('/students').get(getStudents)

module.exports = router;
