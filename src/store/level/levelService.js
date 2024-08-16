import axios from 'axios';
import { api_url } from '../../utils/base_url';

export const getLevelService = async () => {
  try {
    const response = await axios.get(`${api_url}/level`);
    // return
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(`err=>`, e);
    throw new Error(e?.message);
  }
};
export const setLevelService = async (args) => {
  console.log(`levelService set =>`, args);
  try {
    const response = await axios.post(`${api_url}/level`, { levels: args });
    return response.data;
  } catch (e) {
    console.log(`err=>`, e, `mgs=>`, e?.message);
    throw new Error(e?.message);
  }
};
