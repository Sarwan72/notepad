import { useEffect, useState } from "react";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/note.api";

import NoteInput from "../components/NoteInput";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notes
  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Create note
  const handleCreate = async (data) => {
    try {
      const newNote = await createNote(data);
      setNotes((prev) => [newNote, ...prev]); // show instantly
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Update note
  const handleUpdate = async (id, data) => {
    try {
      const updated = await updateNote(id, data);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? updated : note))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">My Notepad 📝</h1>

        {/* Create Note */}
        <NoteInput onCreate={handleCreate} />

        {/* Notes List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500">
            No notes yet. Create your first note!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
