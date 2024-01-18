import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({ baseURL: API_URL });

export function getImages() {
  return instance.get("/api/images");
}

export async function saveTemplate(id, json) {
  instance.post(`/api/templates/${id}`, json);
}

export async function loadTemplate(id, json) {
  return instance.get(`/api/templates/${id}`);
}

export async function newTemplate(title) {
  return new Promise((resolve) => {
    instance.post(`/api/templates`, { title: title }).then((res) => {
      resolve(res);
    });
  });
}
