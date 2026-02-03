import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user.id, 
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ message: "Server error while creating note" });
  }
};


export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ message: "Server error while fetching notes" });
  }
};


export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Get note error:", error);
    res.status(500).json({ message: "Server error while fetching note" });
  }
};


export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ message: "Server error while updating note" });
  }
};


export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ message: "Server error while deleting note" });
  }
};
