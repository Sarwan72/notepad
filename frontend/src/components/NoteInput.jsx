import { useState } from "react";

const NoteInput = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    onCreate({ title, content });

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <h2 className="text-lg font-semibold">Create Note</h2>

      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-24"
      />

      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Add Note
      </button>
    </form>
  );
};

export default NoteInput;
