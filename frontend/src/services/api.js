import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export const signupAPI = async (data) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

export const loginAPI = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// ---------- NOTES ----------
export const fetchNotesAPI = async () => {
  const res = await API.get("/notes");
  return res.data;
};

export const createNoteAPI = async (data) => {
  const res = await API.post("/notes", data);
  return res.data;
};

export const updateNoteAPI = async (id, data) => {
  const res = await API.put(`/notes/${id}`, data);
  return res.data;
};

export const deleteNoteAPI = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};

// ---------- AI ----------
export const summarizeTextAPI = async (text) => {
  const res = await API.post("/ai/summarize", { text });
  return res.data;
};

export default API;
