import axios, { AxiosRequestConfig } from "axios"

export const ajax = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});
