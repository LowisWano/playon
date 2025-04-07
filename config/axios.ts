import axios from "axios"

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000",
  // baseURL: "http://192.168.50.136:8000",
})