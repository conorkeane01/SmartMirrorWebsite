console.log("Starting routes index.js file connection...");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Mongoose, Schema } = require('mongoose'); // Destructure Mongoose and Schema from mongoose

const oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

const noteSchema = new Schema({
  notingId: Schema.Types.ObjectId,
  title: String,
  image: String,
  address: String,
  description: String
}, { collection: 'notings' });

const notings = oldMong.model('notings', noteSchema);

// Admin server page
router.get('/', async function (req, res, next) {
  res.render('index');
});

// CRUD operations

router.post('/createNote', async function (req, res, next) {
  try {
    await notings.create(req.body);
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
      data = await notings.find().lean();
    } else {
      data = await notings.find({ _id: req.body._id }).lean();
    }
    res.json({ notings: data });
  } catch (error) {
    console.error('Error reading note:', error);
    res.status(500).json({ error: "An error occurred while reading the note" });
  }
});

router.post('/updateNote', async function (req, res, next) {
  try {
    await notings.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: "An error occurred while updating the note" });
  }
});

router.post('/deleteNote', async function (req, res, next) {
  try {
    const id = req.body._id;
    if (!mongoose.Types.ObjectId.isValid(id)) { // Ensure mongoose is imported correctly
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = await notings.deleteOne({ _id: id });
    console.log('Delete result:', result);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: "An error occurred while deleting the note" });
  }
});

router.post('/getNotes', async function (req, res, next) {
  try {
    const data = await notings.find().lean();
    res.json({ notings: data });
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({ error: "An error occurred while getting the notes" });
  }
});

router.post('/saveNote', async function (req, res, next) {
  try {
    await notings.create(req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: "An error occurred while saving the note" });
  }
});

module.exports = router;


