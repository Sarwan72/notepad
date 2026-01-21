import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8001/api",
});




export const signupAPI = async (data) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};


export const loginAPI = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};




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
