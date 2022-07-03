const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote, } = require("../../lib/notes.js");
let notes = require("../../db/db.json");
const path = require("path");
const fs = require("fs");

//get all notes
router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//get single note
router.get("/notes/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

//post a note with new ID
router.post("/notes", (req, res) => {
req.body.id = notes.length.toString();

if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
} else {
    const note = createNewNote(req.body, notes);
    res.json(note);
}
});

router.delete('/notes/:id', (req, res) => {
    res.send("Note deleted")
  })

module.exports = router;