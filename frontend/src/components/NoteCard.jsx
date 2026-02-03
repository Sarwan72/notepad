import { useState } from "react";
import { summarizeTextAPI } from "../services/api";

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const [aiLoading, setAiLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSave = () => {
    onUpdate(note._id, { title, content });
    setIsEditing(false);
  };


  const handleSummarize = async () => {
    try {
      setAiLoading(true);
      const data = await summarizeTextAPI(content);
      setSummary(data.summary);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      console.error("FULL ERROR 👉", err);
    console.error("RESPONSE 👉", err?.response?.data);

      alert("Failed to summarize note");
    } finally {
      setAiLoading(false);
    }
  };

  const applySummary = () => {
    setContent(summary);
    onUpdate(note._id, { title, content: summary });
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow">
        {isEditing ? (
          <>
            <input
              className="w-full p-2 border rounded mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full p-2 border rounded mb-2 h-24"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-gray-700 whitespace-pre-line mt-2">
              {note.content}
            </p>

            {/* ✅ ACTION BUTTONS IN VIEW MODE */}
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(note._id)}
                className="text-red-600 font-medium"
              >
                Delete
              </button>

              <button
                onClick={handleSummarize}
                disabled={aiLoading}
                className="text-green-600 font-medium"
              >
                {aiLoading ? " " : " "}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ✅ SUMMARY POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-5 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-3">AI Summary</h3>

            <p className="text-gray-700 whitespace-pre-line mb-4">
              {summary}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Close
              </button>

              <button
                onClick={applySummary}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Replace Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
