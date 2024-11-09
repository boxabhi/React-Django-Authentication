import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const register = (username, email, password, password2) => {
  return axios.post(API_URL + 'register/', {
    username,
    email,
    password,
    password2
  });
};

export const login = (username, password) => {
  return axios.post(API_URL + 'login/', {
    username,
    password
  });
};

export const getProfile = (token) => {
  return axios.get(API_URL + 'profile/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
