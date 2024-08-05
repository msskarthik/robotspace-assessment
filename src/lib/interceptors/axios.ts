import tokenStore from "$lib/stores/auth";
import axios from "axios";
import { get } from "svelte/store";

const Auth = axios.create({
    baseURL: "http://localhost:8055/auth/",
    timeout: 10000000,
    headers: {
        "Content-Type": "application/json",
    },
});

const Protected = axios.create({
    baseURL: "http://localhost:8055/",
    timeout: 10000000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add response interceptor for protected instance
Auth.interceptors.response.use((response) => response.data,
    error => Promise.reject(error)
);

// Add request interceptor for protected instance
Protected.interceptors.request.use((config) => {
    const { token } = get(tokenStore);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    error => Promise.reject(error)
);

// Add response interceptor for protected instance
Protected.interceptors.response.use((response) => response.data,
    error => Promise.reject(error)
);

export { Auth, Protected };