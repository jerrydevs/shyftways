const db = require('./db');
const Student = require('../db/models/student');

const seed = async () => {
  await db.sync({ force: true });

  await Student.create({
    first_name: 'Jerry',
    last_name: 'Zhang',
    date_of_birth: Date.now()
  })
}

seed();