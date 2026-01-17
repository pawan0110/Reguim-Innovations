import axios from "axios"

const api = axios.create({
    baseURL: "https://reguim-innovations.onrender.com"
    withCredentials: true
})

export default api;
