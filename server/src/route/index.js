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
  router.get("", (req, res) => {
    res.status(200).send("Hello world");
  });

  const userRouter = createStandardRouter(express.Router(), {
    client,
    mongoModel: UserModel
  });

  router.use("/users/v1", userRouter);
  router.use("/users", userRouter);
  return router;
};
