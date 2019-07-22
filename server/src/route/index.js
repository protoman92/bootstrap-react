const express = require("express");
const {
  createStandardMongoDBRouter
} = require("bootstrap-nodejs-essentials/dist/route/standardMongo");
const { UserModel } = require("../mongo/user");

/**
 * Register all defined routes.
 * @param {Router} router A Router object.
 * @param {HTTPClient} client A HTTPClient instance.
 * @return {Router} The router object that has had its routes defined.
 */
module.exports = function(router, client) {
  router.get("", (req, res) => res.status(200).send("Hello world"));

  const userRouter = createStandardMongoDBRouter(express.Router(), {
    mongoModel: UserModel
  });

  router.use("/users/v1", userRouter);
  router.use("/users", userRouter);
  return router;
};
