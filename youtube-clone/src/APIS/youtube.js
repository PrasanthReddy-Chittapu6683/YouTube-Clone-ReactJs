import axios from 'axios';
const KEY = "AIzaSyCzqS41EKgugCUGk5F2lYwpwrTk6f1UjGA";
// https://youtube.googleapis.com/youtube/v3/videos?
// part=snippet%2CcontentDetails%2Cstatistics&
// chart=mostPopular&
// regionCode=IN&
// key=AIzaSyCzqS41EKgugCUGk5F2lYwpwrTk6f1UjGA

// https://youtube.googleapis.com/youtube/v3/search?
// part=snippet&
// maxResults=25&
// q=codeevolution&
// key=[YOUR_API_KEY] 

export default axios.create({
    // baseURL: 'https://www.googleapis.com/youtube/v3',
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: KEY
    }
})