require('dotenv').config();
console.log("Starting routes index.js file connection...");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const SpotifyWebApi = require("spotify-web-api-node");
const lyricsFinder = require("lyrics-finder");
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: true }))

//const uri = "instert string"
const uri =
process.env.MONGO_ID;

// Initialize MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB Atlas
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Connect to MongoDB Atlas using Mongoose
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Define the schema and model
const noteSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { collection: "notings" }
);

const notings = mongoose.model("notings", noteSchema);

const userDataSchema = new mongoose.Schema(
  {
    sleep_direction: String,
    time_spent: Number,
  },
  { collection: "UserData" }
);

const userData = mongoose.model("UserData", userDataSchema);

// Admin server page
router.get("/", async function (req, res, next) {
  res.render("index");
});

// CRUD operations

router.post("/createNote", async function (req, res, next) {
  try {
    await notings.create(req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the note" });
  }
});

router.post("/readNote", async function (req, res, next) {
  try {
    let data;
    if (req.body.cmd == "all") {
      data = await notings.find().lean();
    } else {
      data = await notings.find({ _id: req.body._id }).lean();
    }
    res.json({ notings: data });
  } catch (error) {
    console.error("Error reading note:", error);
    res.status(500).json({ error: "An error occurred while reading the note" });
  }
});

router.post("/readData", async function (req, res, next) {
  try {
    let data;
    if (req.body.cmd == "all") {
      data = await userData.find().lean();
    } else {
      data = await userData.find({ _id: req.body._id }).lean();
    }
    res.json({ userData: data });
  } catch (error) {
    console.error("Error reading note:", error);
    res.status(500).json({ error: "An error occurred while reading the note" });
  }
});

router.post("/updateNote", async function (req, res, next) {
  try {
    await notings.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the note" });
  }
});

router.post("/updateData", async function (req, res, next) {
  try {
    await userData.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the note" });
  }
});

// cruD   Should use DELETE . . . we'll fix this is Cloud next term
router.post("/deleteNote", async function (req, res, next) {
  try {
    const result = await notings.deleteOne({ _id: req.body._id });
    if (result.deletedCount === 1) {
      res.json({ response: "success" });
    } else {
      res.json({ response: "fail" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the note" });
  }
});

router.post("/getNotes", async function (req, res, next) {
  try {
    const data = await notings.find().lean();
    res.json({ notings: data });
  } catch (error) {
    console.error("Error getting notes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the notes" });
  }
});

router.post("/getData", async function (req, res, next) {
  try {
    const data = await userData.find().lean();
    res.json({ userData: data });
  } catch (error) {
    console.error("Error getting notes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the notes" });
  }
});

router.post("/saveNote", async function (req, res, next) {
  try {
    await notings.create(req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "An error occurred while saving the note" });
  }
});

router.post("/saveData", async function (req, res, next) {
  try {
    await userData.create(req.body);
    res.json({ response: "success" });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "An error occurred while saving the note" });
  }
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
      //spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch(() => {
    res.sendStatus(400)
  })
})

const fetch = require('node-fetch'); // Ensure you have 'node-fetch' installed

router.get('/lyrics', async (req, res) => {
  const { artist, track } = req.query;
  const accessToken = process.env.GENIUS_ID; // Replace with your actual Genius API token
  const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(track)} ${encodeURIComponent(artist)}`;

  try {
    const geniusResponse = await fetch(apiUrl, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const json = await geniusResponse.json();

    // Log the complete JSON to debug
    console.log("Genius API response:", JSON.stringify(json));

    if (!json.response || json.response.hits.length === 0) {
      console.log('No results found for:', track, artist);
      res.status(404).json({ lyrics: "No lyrics found" });
      return;
    }

    const songPath = json.response.hits[0].result.api_path;

    // Fetching lyrics from song API path
    const lyricsResponse = await fetch(`https://api.genius.com${songPath}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const lyricsJson = await lyricsResponse.json();

    // Debugging output to inspect what is fetched
    console.log("Lyrics fetch response:", JSON.stringify(lyricsJson));

    const lyrics = lyricsJson.response.song.url; // Assuming you might want to link to the lyrics page

    res.json({ lyrics: lyrics || "Lyrics not available" });
  } catch (error) {
    console.error("Failed to fetch lyrics:", error);
    res.status(500).json({ error: "An error occurred while fetching lyrics." });
  }
});
module.exports = router;
