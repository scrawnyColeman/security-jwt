import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth';

class AuthService {
  async login(username, password) {
    const authData = {
      username,
      password,
    };
    const response = await axios.post(`${BASE_URL}/signin`, authData);
    const { data } = response;
    data.accessToken && localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

  logout(){
    localStorage.removeItem('user');
  }

  async register(username, email, password){
    const data = {
      username,
      email,
      password
    }
    return await axios.post(`${BASE_URL}/signup`, data);
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();