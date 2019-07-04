/**
 * @template T
 * @param {T | null | undefined} object
 * @return {NonNullable<T>}
 */
exports.requireTruthy = function(object) {
  if (!object) throw new Error("Object is falsy");
  return object;
};
