console.log("Starting routes index.js file connection...");

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "instert string"

// Initialize MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB Atlas
client.connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Define the schema and model
const noteSchema = new mongoose.Schema({
  title: String,
  description: String
}, { collection: 'notings' });

const notings = mongoose.model('notings', noteSchema);

const userDataSchema = new mongoose.Schema({
  sleep_direction: String,
  time_spent: Number
}, { collection: 'UserData' });

const userData = mongoose.model('UserData', userDataSchema);

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

router.post('/readData', async function (req, res, next) {
  try {
    let data;
    if (req.body.cmd == 'all') {
      data = await userData.find().lean();
    } else {
      data = await userData.find({ _id: req.body._id }).lean();
    }
    res.json({ userData: data });
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

router.post('/updateData', async function (req, res, next) {
  try {
    await userData.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: "An error occurred while updating the note" });
  }
});

// cruD   Should use DELETE . . . we'll fix this is Cloud next term
router.post('/deleteNote', async function (req, res, next) {
  try {
    const result = await notings.deleteOne({ _id: req.body._id });
    if (result.deletedCount === 1) {
      res.json({ response: "success" });
    } else {
      res.json({ response: "fail" });
    }
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

router.post('/getData', async function (req, res, next) {
  try {
    const data = await userData.find().lean();
    res.json({ userData: data });
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

router.post('/saveData', async function (req, res, next) {
  try {
    await userData.create(req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: "An error occurred while saving the note" });
  }
});

module.exports = router;     
