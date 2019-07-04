exports.handleError = function(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  };
};
