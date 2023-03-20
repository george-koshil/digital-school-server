
function initSkippingsRoutes(router, mongoose) {
  const skipingsSchema = new mongoose.Schema({
    studentId: String,
    lessonId: String,
    skip: Boolean
  });
  
  const Skipings = mongoose.model('Skipings',  skipingsSchema)

  router.get('/skippings', async (req, res) => {
    const students = await Skipings.find();
    res.json(students);
  });
  
  router.post('/skipping', async (req, res) => {
    const skiping = new Skipings(req.body);
    await skiping.save();
    res.json(skiping);
  });
  
  router.delete('/skipping/:id', async (req, res) => {
    const { id } = req.params;
    const deletedSkipping = await Skipings.deleteOne({ _id: id})
    res.json(deletedSkipping );
  });
}

module.exports = initSkippingsRoutes