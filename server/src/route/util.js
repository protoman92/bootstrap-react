/**
 * Wrap a request handler to provide error-handling.
 * @param {RequestHandler} fn The original request handler.
 * @return {RequestHandler} The resulting request handler.
 */
exports.handleError = function(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  };
};
