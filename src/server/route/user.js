/** @param {HTTPClient} client */
function getUser(client) {
  return async ({ params: { id } }, res) => {
    res.status(200).json(id);
  };
}

/**
 * Create the user router.
 * @param {import('express').Router} router
 * @param {HTTPClient} client
 * @return {import('express').Router}
 */
module.exports = function(router, client) {
  router.get("/:id", getUser(client));
  return router;
};
