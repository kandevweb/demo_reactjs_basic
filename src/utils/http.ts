import axios, { AxiosInstance } from 'axios'

class Http {
  instace: AxiosInstance

  constructor() {
    this.instace = axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instace

export default http
