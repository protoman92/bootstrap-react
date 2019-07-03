import axios from "axios";

export default function(): GlobalClient {
  return {
    get: (url, config) => axios.get(url, config).then(({ data }) => data),
    post: (url, body, config) =>
      axios.post(url, body, config).then(({ data }) => data)
  };
}
