const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote, } = require("../../lib/notes.js");
const { notes } = require("../../db/db.json");

router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
});

module.exports = router;