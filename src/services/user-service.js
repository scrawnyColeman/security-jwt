import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = 'http://localhost:8080/api/test';

const fetchBoardContent = (endpoint) => {
  return axios.get(`${BASE_URL}/${endpoint}`, { headers: authHeader() });
};

class UserService {
  getPublicContent() {
    return axios.get(`${BASE_URL}/all`);
  }
  getUserBoard() {
    return fetchBoardContent('user');
  }
  getModeratorBoard() {
    return fetchBoardContent('mod');
  }
  getAdminBoard() {
    return fetchBoardContent('admin');
  }
}

export default new UserService();
