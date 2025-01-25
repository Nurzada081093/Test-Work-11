import axios from 'axios';
import { mainApiUrl } from './globalConstants.ts';

const axiosRequest = axios.create({
  baseURL: mainApiUrl,
});

export default axiosRequest;