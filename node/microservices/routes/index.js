console.log("Starting routes index.js file connection...");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String,
  description: String
}, { collection: 'notings' });

const Noting = mongoose.model('Noting', noteSchema);

// Admin server page
router.get('/', async function (req, res, next) {
  res.render('index');
});

// CRUD operations

router.post('/createNote', async function (req, res, next) {
  try {
    await Noting.create(req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: "An error occurred while creating the note" });
  }
});

router.post('/readNote', async function (req, res, next) {
  try {
    let data;
    if (req.body.cmd == 'all') {
      data = await Noting.find().lean();
    } else {
      data = await Noting.find({ _id: req.body._id }).lean();
    }
    res.json({ notings: data });
  } catch (error) {
    console.error('Error reading note:', error);
    res.status(500).json({ error: "An error occurred while reading the note" });
  }
});

router.post('/updateNote', async function (req, res, next) {
  try {
    await Noting.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: "An error occurred while updating the note" });
  }
});

router.post('/deleteNote', async function (req, res, next) {
  try {
    const id = req.body._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await Noting.deleteOne({ _id: id });
    console.log('Delete result:', result);
    res.json({ response: "success" });
    
    // After successful deletion, instruct the client to reload the page
    res.reload();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: "An error occurred while deleting the note" });
  }
});

router.post('/getNotes', async function (req, res, next) {
  try {
    const data = await Noting.find().lean();
    res.json({ notings: data });
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({ error: "An error occurred while getting the notes" });
  }
});

router.post('/saveNote', async function (req, res, next) {
  try {
    await Noting.create(req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: "An error occurred while saving the note" });
  }
});

module.exports = router;


