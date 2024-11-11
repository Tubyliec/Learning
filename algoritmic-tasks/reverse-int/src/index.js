module.exports = function reverse (n) {
    numberArray = ('' + Math.abs(n)).split('').map(Number);
    return Number(numberArray.reverse().join(''))
}
