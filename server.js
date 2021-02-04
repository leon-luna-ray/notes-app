// add express server
const express = require('express');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid');

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
  // read the `db.json` file and return all saved notes as JSON. Not sure how to test this

  fetch('./db/db.json').then(console.log('get note route'))
  });

//Receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. Added id and timestamp.

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    time: moment().format(),
    title: req.body.title,
    text: req.body.text,
  };

  console.log(newNote);

  // Works from here, need to find a way to json and push to d
  // fs.writeFileSync('./db/db.json', JSON.stringify(newNote));


  // Successfully got the note to post, need to find a way to save it to json with push?

});
  // route to get all notes or one note
  // update note route (app.put())
  // delete note route

// The database will be a JSON file in which new entries will be pushed into the array to save. You will have to use the middleware to parse JSON.

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
