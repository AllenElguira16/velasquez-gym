import axios, { AxiosRequestConfig } from "axios"

export const ajax = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
