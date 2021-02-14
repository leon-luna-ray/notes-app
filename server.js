// Add express server
const express = require('express');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid');
const db = fs.readFileSync('./db/db.json');
const notes = JSON.parse(db);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

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

//API routes to get data 
app.get('/api/notes', (req, res) => {
  return res.json(notes);
}); // get

// Receive a new note add it to the `db.json` file, and then return the new note to the client. Added id and timestamp properties with moment and uuid.

app.post('/api/notes', (req, res) => {
    const newNote = {
    id: uuid.v4(),
    time: moment().format(),
    title: req.body.title,
    text: req.body.text,
  };

  // Add note to the notes db then write file.
  notes.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), err => {
    if (err) {
        console.log(err)
    } 
  });

  res.send(newNote);
}); // post route

//Delete Route
app.delete('/api/notes/:id', (req, res) => {

    for (let i = 0; i < notes.length; i++) {
      if(notes[i].id === req.params.id) {
        // Spice to remove the note with that id from the array.
        notes.splice(i, 1);
      }
    }

    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), err => {
    if (err) {
        console.log(err)
    } 
  });
    res.send(notes);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
