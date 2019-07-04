const axios = require("axios").default;

/** @return {HTTPClient} */
module.exports = function createClient() {
  return {
    get: (url, config) => axios.get(url, config).then(({ data }) => data),
    post: (url, body, config) =>
      axios.post(url, body, config).then(({ data }) => data)
  };
};
