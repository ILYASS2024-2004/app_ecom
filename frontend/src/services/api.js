import axios from 'axios';

// L'URL de ton backend Spring Boot
const API_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_URL,
});

// Intercepteur : Ajoute le token à chaque requête si on est connecté
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // On stockera le token ici plus tard
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;