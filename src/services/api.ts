import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.88.56:3333', // Your API endpoint URL
})