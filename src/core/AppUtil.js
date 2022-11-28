import Axios from 'axios'

function returnAxiosInstance() {
  return Axios.create()
}

// export default function get(url,header){
//   const axios = returnAxiosInstance();
//   return axios.get(url,header);
// }

export default function post(url, requestData, headers) {
  const axios = returnAxiosInstance()
  return axios.post(url, requestData, headers)
}
