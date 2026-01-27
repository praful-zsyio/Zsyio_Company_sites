import axios from 'axios';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token && !config.skipAuth) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                });
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export const login = async (username, password) => {
    const response = await api.post('token/', { username, password });
    localStorage.setItem(ACCESS_TOKEN, response.data.access);
    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export const getProjects = () => api.get('projects/');
export const getServices = () => api.get('services/');
export const getTechnologies = () => api.get('services/technologies/');
export const getAbout = () => api.get('about/');
export const calculateEstimate = (data) => api.post('estimation/calculate/', data);
export const sendChatMessage = (message) => api.post('chatbot/', { message });
export const getSiteConfig = () => api.get('config/');

// Cart API
export const getCart = () => api.get('cart/');
export const addToCart = (serviceSlug, quantity) => api.post('cart/add_item/', { service_slug: serviceSlug, quantity });
export const submitContact = (data) => api.post('contact/', data, { skipAuth: true });

export default api;
