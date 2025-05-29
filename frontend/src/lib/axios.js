import axios from "axios"



// Make the URL to be dynamic for production
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: BASE_URL
})

export default api