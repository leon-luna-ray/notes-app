// add express server
const express = require('express');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid');
const db = fs.readFileSync('./db/db.json');
const notes = JSON.parse(db);

// Sets up the Express App`
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

//Receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. Added id and timestamp.

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

app.delete('/api/notes/:id', (req, res) => {
    console.log('delete request recived!')
});

// * `DELETE /api/notes/:id` should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.




  // // Update note route
  // app.put('/api/notes', (req, res) => {
  //   const content = JSON.parse(file_content);
  //   const updatedNote = content[req.id];
  //   updatedNote.push(req);

  // }); // update

  // // delete note route (bonus)
  // app.delete('/api/notes', (req, res) => {

  // }); // delete

  // Get route in case they don't navigate to any route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// }); // *


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
