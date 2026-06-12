import axios from 'axios';

export const BASE_URL = 'https://travelpal-backend-de3k.onrender.com/api';
export const SOCKET_IO_URL = 'https://travelpal-backend-de3k.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

let userToken = '';

export const setToken = (token: string) => { userToken = token; };
export const getToken = () => userToken;

api.interceptors.request.use((config) => {
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.data.token) {
        setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (email: string, password: string, fullname: string, username: string) => {
    try {
      const response = await api.post('/user/register', {
        email, password, fullname, username,
        country: 'Nigeria', city: 'Lagos'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: () => { setToken(''); },
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
};

export const groupService = {
  getAll: async (destination?: string) => {
    const params = destination ? `?destination=${destination}` : '';
    const response = await api.get(`/groups${params}`);
    return response.data;
  },
  getById: async (groupId: string) => {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;
  },
  join: async (groupId: string) => {
    const response = await api.post(`/group-members/groups/${groupId}/join`);
    return response.data;
  },
};

export const messageService = {
  getByGroup: async (groupId: string) => {
    const response = await api.get(`/chats/${groupId}/messages?limit=50`);
    return response.data;
  },
  send: async (groupId: string, messageText: string) => {
    const response = await api.post('/chats/send', {
      groupId, messageText, messageType: 'text'
    });
    return response.data;
  },
};

export const emergencyService = {
  sendAlert: async (groupId: string) => {
    const response = await api.post('/safety/emergency', { groupId });
    return response.data;
  },
};

export default api;