import axios from 'axios';

class _AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/auth',
      withCredentials: true
    });
  }

  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    console.log( process.env.REACT_APP_API_URL)
    return this.service.get('/currentuser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

const AuthService = new _AuthService();
export default AuthService;