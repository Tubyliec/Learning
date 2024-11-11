module.exports = function toReadable (number) {
    let result = [];
    let ones = number % 10;
    let tens = Math.floor(number % 100 / 10);
    let hundreds = Math.floor(number / 100);

    if (number === 0) {
        return 'zero';
    }

    if (hundreds > 0) {
        result.push([undefined, 'one hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred'][hundreds]);
    }

    if (tens === 1) {
        result.push(['ten', 'eleven', 'twelve', 'thirteen','fourteen', 'fifteen', 'sixteen', 'seventeen','eighteen', 'nineteen'][ones]);
    } else {
        if (tens > 1) {
            result.push([undefined, undefined, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'][tens]);
        }
        if (ones > 0) {
            result.push([undefined, 'one' , 'two' , 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][ones]);
        }
    }

    return result.join(' ');
}
