/**
 * Require that an object is truthy, or else throw an error.
 * @template T
 * @param {T | null | undefined} object The object to be checked.
 * @return {T} The checked object.
 */
exports.requireTruthy = function(object) {
  if (!object) throw new Error("Object is falsy");
  return object;
};
