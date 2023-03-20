const express = require('express');
const mongoose = require('mongoose');
const initStudentRoutes = require('./students')
const initTeachersRoutes = require('./teachers')
const initLessonsRoutes = require('./lessons');
const initSkippingsRoutes = require('./skippings');

const router = express.Router();

mongoose
  .connect(
    "mongodb+srv://kayfat:Uxxrnshdgkv22june+-@digitalschool.qp2obbn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Db success connected"))
  .catch((error) => console.log(error));

[
  initStudentRoutes, 
  initTeachersRoutes, 
  initLessonsRoutes,
  initSkippingsRoutes,
]
  .forEach(initRoutes => initRoutes(router, mongoose))

module.exports = router;
