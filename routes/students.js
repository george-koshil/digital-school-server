
function initStudentRoutes(router, mongoose) {
  const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String,
    gender: String,
    hobby: String
  });
  
  const Student = mongoose.model('Student', studentSchema)

  router.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
  });
  
  router.post('/student', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  });
  
  router.post('/students', async (req, res) => {
    const students = req.body;
  
    (students ?? []).map((student) => {
      new Student(student).save();
    })
  });
  
  router.put('/student/:id', async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.json(student);
  });

  router.delete("/student/:id", async (req, res) => {
    const student = await Student.deleteOne({ _id: req.params.id });
    res.json(student);
  });

}

module.exports = initStudentRoutes