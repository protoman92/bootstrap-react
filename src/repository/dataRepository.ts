import querystring from "querystring";

/** This repository allows synchronization of data with current URL. */
export function createURLSyncRepository(
  { location }: Pick<Window, "location">,
  client: RelativeHTTPClient
): APIRepository.URLSync {
  function urlParams() {
    return { ...querystring.parse(window.location.search.slice(1)) };
  }

  return {
    get: () => client.get(location.pathname, { params: urlParams() }),
    update: newData =>
      client.patch(location.pathname, newData, { params: urlParams() })
  };
}
