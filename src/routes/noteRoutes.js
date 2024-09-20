const express = require("express");
const noteRouter = express.Router();
const { getNotes, updateNote, deleteNote, createNote } = require("../controller/noteController.js");
const auth = require("../middlewares/auth.js");

noteRouter.get("/", auth, getNotes);

noteRouter.post("/",  auth, createNote);

noteRouter.delete("/:noteId", auth, deleteNote);

noteRouter.put(":noteId", auth, updateNote);

module.exports = noteRouter