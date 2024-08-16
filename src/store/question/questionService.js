import axios from 'axios';
import { api_url } from '../../utils/base_url';

export const addQuestionsService = async (formData) => {
  try {
    const response = await axios.post(`${api_url}/questions/add-one`, formData);
    // console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(`err=>`, e);
    return e;
  }
};
export const editQuestionsService = async (formData) => {
  try {
    const response = await axios.post(
      `${api_url}/questions/edit-one`,
      formData
    );
    // console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(`err=>`, e);
    return e;
  }
};
export const getQuestionsService = async (levelId) => {
  try {
    const response = await axios.get(`${api_url}/questions`, {
      params: { levelId },
    });
    return response.data;
  } catch (e) {
    console.log(`err=>`, e);
    return e;
  }
};
export const deleteQuestionService = async (args) => {
  try {
    const response = await axios.delete(`${api_url}/questions`, { data: args });
    return response.data;
  } catch (e) {
    console.log(`err=>`, e);
    return e;
  }
};
