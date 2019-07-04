/** @param {MongoModel.User} userModel */
function getUser(userModel) {
  /** @param {Request} req */
  return async ({ params: { id } }, res) => {
    const { _id, ...user } = await userModel.findById(id);
    res.status(200).json({ id, ...user });
  };
}

/**
 * Create the user router.
 * @typedef Args
 * @property {HTTPClient} client
 * @property {MongoModel.User} userModel
 * @param {import('express').Router} router
 * @param {Args} args
 * @return {import('express').Router}
 */
module.exports = function(router, { userModel }) {
  router.get("/:id", getUser(userModel));
  return router;
};
