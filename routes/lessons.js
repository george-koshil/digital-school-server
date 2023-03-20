
function initLessonsRoutes(router, mongoose) {
  const lessonSchema = new mongoose.Schema({
    name: String,
    teacher: String,
    subjectType: String
  });
  
  const Lesson = mongoose.model('Lesson', lessonSchema);

  router.get('/lessons', async (req, res) => {
    const lessons = await Lesson.find();
    res.json(lessons);
  });
  
  router.post('/lesson', async (req, res) => {
    const { name, date } = req.body;
    const lesson = new Lesson({ name, date });
    await lesson.save();
    res.json(lesson);
  });

  router.post('/lessons', async (req, res) => {
    const lessons = req.body;
  (lessons ?? []).map((lesson) => {
    new Lesson(lesson).save();
  })
  });
  
  router.put('/lessons/:id', async (req, res) => {
    const { id } = req.params;
    const { name, date } = req.body;
    const lesson = await Lesson.findByIdAndUpdate(id, { name, date }, { new: true });
    res.json(lesson);
  });
}

module.exports = initLessonsRoutes