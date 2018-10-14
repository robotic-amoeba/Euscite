import axios from 'axios';

class getPostsService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/api/research',
      withCredentials: true
    });
  }

  getUserPosts = (username) => {
    return this.service.get('/userentries', {username})
    .then((data)=>{
      return data;
    })
  }

  getRandomPosts = () => {
    return this.service.get('/randomposts')
    .then((data)=>{
      return data
    })
  }
}

export default getPostsService;