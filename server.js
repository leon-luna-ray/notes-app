// add express server
const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML routes to get the pages to serve
app.get('/', (req, res) => {
  // This will join the directory name for the index
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Define notes page route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Get route in case they don't navigate to any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//API routes to get data
  app.get('/api/notes', (req, res) => {
    const notes = req.body;
    // should read the `db.json` file and return all saved notes as JSON.

    // Promise will pass the json data and pasrse.
    fetch('./db/db.json').then(data => {
        return data.json();
      }
    );
    // Parse json and res.send

  });
  // route to get all notes or one note
  // update note route (app.put())
  // delete note route

// The database will be a JSON file in which new entries will be pushed into the array to save. You will have to use the middleware to parse JSON.

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
