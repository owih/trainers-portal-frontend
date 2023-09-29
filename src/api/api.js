import axios from 'axios';

class Api {
  constructor() {
    this.base = import.meta.env.VITE_BACKEND_URL;
  }

  getToken = () => {
    return localStorage.getItem('token');
  };

  getHeader = () => {
    return {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    };
  };

  request = async (method, path, data) => {
    const url = this.base + path;
    const header = this.getHeader();

    if (method === 'get' || method === 'delete') {
      return axios[method](url, header);
    }
    return axios[method](url, data, header);
  };

  updateToken = (token) => {
    localStorage.setItem('token', token);
  };

  removeToken = () => {
    localStorage.removeItem('token');
  };
}

export default new Api();
