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

  saveEntryInResearch = (researchName, entry) => {
    return this.service.post('/saveentry', {researchName, entry}) //research name is already in the entry
    .then((data)=>console.log(data));
  }
}

export default getPostsService;