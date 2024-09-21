const note = require("../models/note");
const noteModel = require("../models/note");

const createNote = async (req, res) => {

    const { title, description } = req.body;

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });

    try {

        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
};

const updateNote = async (req, res) => {

    const id = req.params.noteId;
    const { title, description } = req.body;

    const updateFeilds = {
        title: title,
        description: description,
        userId: req.userId
    };

    try {

        const updatedNote = await noteModel.findByIdAndUpdate(id, updateFeilds, { new: true });

        // Check if the note was found and updated
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error("Error updating note:", error.message); // Log error message
        console.error("Error stack trace:", error.stack);     // Log error stack trace for debugging

        // Send a more detailed error response (helpful for debugging)
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }

};

const getNotes = async (req, res) => {

    try {

        const notes = await noteModel.find({ userId: req.userId });
        res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }

};

const deleteNote = async (req, res) => {

    const noteId = req.params.noteId;
    try {
        const note = await noteModel.findByIdAndDelete(noteId);
        res.status(202).json(note);
    } catch (error) {
        console.error("Error updating note:", error.message); // Log error message
        console.error("Error stack trace:", error.stack);     // Log error stack trace for debugging

        // Send a more detailed error response (helpful for debugging)
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports = { createNote, updateNote, getNotes, deleteNote }