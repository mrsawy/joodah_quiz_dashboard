import axios from 'axios';
import { api_url } from '../../utils/base_url';

export const loginService = async (args) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, args);
    if (response?.data?.token) {
      localStorage.setItem('token', response?.data?.token);
    }
    if (response?.data?.id) {
      localStorage.setItem('id', response?.data?.id);
    }
    return response.data;
  } catch (e) {
    console.log(`e=>`, e);
  }
};

export const checkLoggedService = async () => {
  let token = localStorage.getItem('token');
  let id = localStorage.getItem('id');
  //

  const response = await axios.post(`${api_url}/auth/checkAuth`, { id, token });
  if (response?.data?.token) {
    localStorage.setItem('token', response?.data?.token);
  }
  if (response?.data?.id) {
    localStorage.setItem('id', response?.data?.id);
  }
  return response.data;
};
