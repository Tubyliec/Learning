
// You should implement your task here.

module.exports = function towelSort(matrix) {
  if (matrix == null) {
    return [];
  } else {
  return matrix.reduce(function (result, current, i) {
   return result.concat((i % 2 === 0) ? current : current.reverse());
}, [])}
}
