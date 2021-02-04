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
}); // get

//Receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. Added id and timestamp.

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    time: moment().format(),
    title: req.body.title,
    text: req.body.text,
  };

  console.log(newNote);

  // Need to find out how to append
  fs.appendFile('./db/db.json', JSON.stringify(newNote));

  res.end();
  }); // post

  // Update note route
  app.put('/api/notes', (req, res) => {

  }); // update

  // delete note route (bonus)
  app.delete('/api/notes', (req, res) => {

  }); // delete


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
