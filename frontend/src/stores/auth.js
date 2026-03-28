import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:  JSON.parse(localStorage.getItem('user'))  || null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      const { data } = await axios.post('/api/auth/login', credentials);
      this.token = data.token;
      this.user  = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',  JSON.stringify(data.user));
    },
    logout() {
      this.token = null; this.user = null;
      localStorage.clear();
    }
  }
});