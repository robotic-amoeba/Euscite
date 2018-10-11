import axios from 'axios';

class getPostsService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/api/research',
      withCredentials: true
    });
  }

  getUserPosts = (username) => {
    return this.service.post('/userentries', {username})
    .then((data)=>{
      console.log(data);
      return data;
    })
  }
}

export default getPostsService;