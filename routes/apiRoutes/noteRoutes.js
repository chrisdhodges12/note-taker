const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote, } = require("../../lib/notes.js");
let notes = require("../../db/db.json");
const path = require("path");
const fs = require("fs");


//get all notes
router.get("/notes", (req, res) => {
    let results = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//get single note by ID
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
        res.status(400).send("The note is not formatted properly.");
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

//delete note



module.exports = router;