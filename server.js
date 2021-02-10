// add express server
const express = require('express');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid');
const noteDb = fs.readFileSync('./db/db.json');
const notes = JSON.parse(noteDb);
let db = require('./db/db.json');

console.log(noteDb);
console.log(notes);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// let notes = notesDb.json();



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

// app.post('/api/notes', (req, res) => {
//   console.log(req)
//   res.send(req)`
// }); // post route

// app.post('/api/notes', (req, res) => {
//   const newNote = {
//     id: uuid.v4(),
//     time: moment().format(),
//     title: req.body.title,
//     text: req.body.text,
//   };

//   // Need to find out how to append currently not working
//   fs.writeFile(noteDb, newNote);

//   res.send(newNote);v
  
//   console.log(newNote);
//   }); // post

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
