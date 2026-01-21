import { useState } from "react";

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onUpdate(note._id, { title, content });
    setIsEditing(false);
  };

  return (
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
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
