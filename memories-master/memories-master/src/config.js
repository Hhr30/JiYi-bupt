import axios from 'axios'
import VueCookies from 'vue-cookies'

const axio = axios.create({
  baseURL: 'https://api.ichrecorder.com',
  timeout: 5000
})

// axio.interceptors.request.use(function(config) {
//   return config
// }, function (error) {
//
//   return Promise.reject(error)
// })

axio.interceptors.response.use(function(response) {

  return response
}, function (error) {
  console.log('error', error.status)

  return Promise.reject(error)
})

axio.interceptors.request.use(function (config) {
  // 这里的config包含每次请求的内容

  // 从cookies中取出token，不要将token存在localstorage中
  const token = VueCookies.get('token')
  if (token) {
    // 添加headers
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
})

// axio.interceptors.response.use(function (config) {
//   // 这里的config包含每次请求的内容
//   let token = window.sessionStorage.getItem('token')
//   if (token) {
//     // 添加headers
//     config.headers.token = `${token}`;
//     config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//   } else {}
//   return config;
// }, function (err) {
//   return Promise.reject(err);
// })
export default axio