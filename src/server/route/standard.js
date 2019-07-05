const { handleError } = require("./util");

/** @param {MongoModel} mongoModel */
function createData(mongoModel) {
  return handleError(async ({ body }, res) => {
    const [{ _id: id, ...data }] = await mongoModel.create([body]).lean();
    res.status(200).json({ id, data });
  });
}

/** @param {MongoModel} mongoModel */
function getData(mongoModel) {
  return handleError(async ({ params: { id } }, res) => {
    const { _id, ...data } = await mongoModel.findById(id).lean();
    res.status(200).json({ id, ...data });
  });
}

/** @param {MongoModel} mongoModel */
function updateData(mongoModel) {
  return handleError(async ({ body, params: { id } }, res) => {
    await mongoModel.updateOne({ _id: id }, body).lean();
    res.status(200).json(body);
  });
}

/**
 * Create a standard router that supports GET/POST/PATCH using a mongodb model.
 * @typedef Args
 * @property {HTTPClient} client A HTTP client.
 * @property {MongoModel} mongoModel A MongoDB model.
 * @param {Router} router A router object.
 * @param {Args} args Dependencies.
 * @return {Router} The router object that has had its routes defined.
 */
module.exports = function(router, { mongoModel }) {
  router.post("", createData(mongoModel));
  router.get("/:id", getData(mongoModel));
  router.patch("/:id", updateData(mongoModel));
  return router;
};
