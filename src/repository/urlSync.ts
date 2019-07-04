import querystring from "querystring";

/** This repository allows synchronization of data with current URL. */
export default function(
  window: Pick<Window, "location">,
  client: RelativeHTTPClient
): APIRepository.URLSync {
  function createParams() {
    return { ...querystring.parse(window.location.search.slice(1)) };
  }

  return {
    get: () => client.get(window.location.pathname, { params: createParams() }),
    update: newData =>
      client.patch(window.location.pathname, newData, {
        params: createParams()
      })
  };
}
