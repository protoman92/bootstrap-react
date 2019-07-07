const express = require("express");
const createStandardRouter = require("./standard");
const { UserModel } = require("../mongo/user");

/**
 * Register all defined routes.
 * @param {Router} router A Router object.
 * @param {HTTPClient} client A HTTPClient instance.
 * @return {Router} The router object that has had its routes defined.
 */
module.exports = function(router, client) {
  router.use(
    "/v1/users",
    createStandardRouter(express.Router(), { client, mongoModel: UserModel })
  );

  return router;
};
