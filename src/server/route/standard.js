const { handleError } = require("./util");

/** @param {MongoModel} mongoModel */
function createData(mongoModel) {
  return handleError(async ({ body }, res) => {
    const [{ _id: id }] = await mongoModel.create([body]);
    res.status(200).json({ id, ...body });
  });
}

/** @param {MongoModel} mongoModel */
function getData(mongoModel) {
  return handleError(async ({ query: { limit, ...query } }, res) => {
    let data = await mongoModel
      .find(
        Object.entries(query)
          .map(([key, value]) => ({
            [key]: { $eq: value }
          }))
          .reduce((acc, val) => ({ ...acc, ...val }), {})
      )
      .limit(limit)
      .lean();

    data = data.map(({ _id: id, ...datum }) => ({ id, ...datum }));
    res.status(200).json({ data });
  });
}

/** @param {MongoModel} mongoModel */
function findDataByID(mongoModel) {
  return handleError(async ({ params: { id } }, res) => {
    const { _id, ...data } = await mongoModel.findById(id).lean();
    res.status(200).json({ id, ...data });
  });
}

/** @param {MongoModel} mongoModel */
function updateDataByID(mongoModel) {
  return handleError(async ({ body, params: { id } }, res) => {
    await mongoModel.updateOne({ _id: id }, body).lean();
    res.status(200).json(body);
  });
}

/**
 * Create a standard router that supports GET/POST/PATCH using a mongodb model.
 * @typedef Args Arguments for the creation of the router.
 * @property {HTTPClient} client A HTTP client.
 * @property {MongoModel} mongoModel A MongoDB model.
 * @param {Router} router A router object.
 * @param {Args} args Dependencies.
 * @return {Router} The router object that has had its routes defined.
 */
module.exports = function(router, { mongoModel }) {
  router.get("", getData(mongoModel));
  router.post("", createData(mongoModel));
  router.get("/:id", findDataByID(mongoModel));
  router.patch("/:id", updateDataByID(mongoModel));
  return router;
};
