function initTeachersRoutes(router, mongoose) {
  const teacherSchema = new mongoose.Schema({
    name: String,
    subject: String,
    age: Number,
    gender: String,
  });

  const Teacher = mongoose.model("Teacher", teacherSchema);

  router.get("/teachers", async (req, res) => {
    const teachers = await Teacher.find();
    res.json(teachers);
  });

  router.post("/teacher", async (req, res) => {
    const teacherData = req.body;
    const teacher = new Teacher(teacherData);
    await teacher.save();
    res.json(teacher);
  });

  router.post("/teachers", async (req, res) => {
    const teachers = req.body;
    (teachers ?? []).map((teacher) => {
      new Teacher(teacher).save();
    });
  });

  router.put("/teachers/:id", async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(teacher);
  });

  router.delete("/teacher/:id", async (req, res) => {
    const teacher = await Teacher.deleteOne({ _id: req.params.id });
    res.json(teacher);
  });
}

module.exports = initTeachersRoutes;
