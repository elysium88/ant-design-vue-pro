import axios from "axios";
import { notification } from "ant-design-vue";

// function request(options) {
//   return axios(options)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((error) => {
//       console.log(error);
//       const {
//         response: { status, statusText },
//       } = error;
//       notification.error({
//         //jsx语法
//         // eslint-disable-next-line no-unused-vars
//         message: (h) => (
//           <div>
//             请求错误 <span style="color:red">{status}</span>:{options.url}
//           </div>
//         ),
//         description: statusText,
//       });
//       return Promise.reject(error);
//     });
// }

// create an axios instance
const request = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL:
    "https://www.fastmock.site/mock/7ae47df5ca44ce2596d4ed362376c969/test", //fastMock数据
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    const {
      response: { status, statusText },
    } = error;
    notification.error({
      //jsx语法
      // eslint-disable-next-line no-unused-vars
      message: (h) => (
        <div>
          请求错误 <span style="color:red">{status}</span>
        </div>
      ),
      description: statusText,
    });
    return Promise.reject(error);
  }
);

export default request;
