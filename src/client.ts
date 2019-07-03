import axios, { AxiosRequestConfig } from "axios";

export default function({
  baseURL
}: Pick<AxiosRequestConfig, "baseURL">): GlobalClient {
  return {
    get: (url, config) =>
      axios.get(url, { baseURL, ...config }).then(({ data }) => data),
    post: (url, body, config) =>
      axios.post(url, body, { baseURL, ...config }).then(({ data }) => data)
  };
}
