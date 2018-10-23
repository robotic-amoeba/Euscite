import axios from 'axios';

class _EntriesService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL + '/research',
      withCredentials: true
    });
  }

  createNewResearch = (researchName, field) => {
    return this.service.post('/newresearch', { researchName, field })
      .then((data) => {
        return data;
      })
  }

  getUserPosts = (username) => {
    return this.service.get('/userentries', { username })
      .then((data) => {
        return data;
      })
  }

  getRandomPosts = () => {
    return this.service.get('/randomposts')
      .then((data) => {
        return data
      })
  }

  saveEntryInResearch = (researchName, entry) => {
    return this.service.post('/saveentry', { researchName, entry })
  }

  createBranchedResearch = (researchName, field) => {
    return this.service.post('/branchresearch', { researchName, field })
      .then((data) => {
        return data;
      })
  }
}

const EntriesService = new _EntriesService();
export default EntriesService;