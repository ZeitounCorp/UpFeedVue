import axios from 'axios';

export const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://sheltered-woodland-77617.herokuapp.com';

const Api = axios.create({ baseURL });

export default Api;
