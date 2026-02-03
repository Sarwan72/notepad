import { useEffect, useState } from "react";
import {
  fetchNotesAPI,
  createNoteAPI,
  updateNoteAPI,
  deleteNoteAPI,
} from "../services/api";

import NoteInput from "../components/NoteInput";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // <-- for username

  // Fetch all notes
  const navigate = useNavigate();
  const loadNotes = async () => {
    try {
      const data = await fetchNotesAPI();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    loadNotes();
  }, []);

  // Create note
  const handleCreate = async (data) => {
    try {
      const newNote = await createNoteAPI(data);
      setNotes((prev) => [newNote, ...prev]); // show instantly
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Update note
  const handleUpdate = async (id, data) => {
    try {
      const updated = await updateNoteAPI(id, data);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? updated : note)),
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await deleteNoteAPI(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">
          {user ? `Hello, ${user.name}` : "My Notepad"}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

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
