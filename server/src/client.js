const axios = require("axios").default;

/** @return {HTTPClient} A HTTPClient instance */
module.exports = function createClient() {
  return {
    get: (url, config) => axios.get(url, config).then(({ data }) => data),
    post: (url, body, config) =>
      axios.post(url, body, config).then(({ data }) => data),
    patch: (url, body, config) =>
      axios.patch(url, body, config).then(({ data }) => data),
    delete: (url, body, config) =>
      axios.delete(url, { ...config, data: body }).then(({ data }) => data),
    head: (url, config) => axios.head(url, config).then(({ data }) => data)
  };
};
