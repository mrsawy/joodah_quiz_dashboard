import axios from 'axios';
import { api_url } from './../../utils/base_url';

export const getUsersService = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const id = localStorage.getItem('id');
    const response = await axios.get(`${api_url}/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set token in request headers
        id,
      },
    });
    return response.data;
  } catch (e) {
    console.log(`err=>`, e);
  }
  // return {};
};

export const deleteUserService = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/users`, {
      data: { userId: id },
    });
    // console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(`err=>`, e);
  }
  // return {};
};
