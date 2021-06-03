import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const {
        response: { status, statusText },
      } = error;
      notification.error({
        //jsx语法
        // eslint-disable-next-line no-unused-vars
        message: (h) => (
          <div>
            请求错误 <span style="color:red">{status}</span>:{options.url}
          </div>
        ),
        description: statusText,
      });
      return Promise.reject(error);
    });
}
export default request;
