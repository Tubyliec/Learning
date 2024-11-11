const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let arr = [];
    let start = 0;
    for (let i = 0; i < expr.length / 10; i++) {
        arr[i] = expr.slice(start, start + 10);
        start += 10;
    }

    function replaceNumbers (item) {
        return item.replace(/11/ig, '-').replace(/10/ig, '.').replace(/0/ig, '').replace("**********", ' ');
    }

    let newArr = arr.map(replaceNumbers)

    let morseCode = newArr.join(' ');

    let phraseConverted = [];

    let wordInCode = morseCode.split("   ");

    wordInCode.map(function (word) {
        word.split(" ").map(function (letter) {
            phraseConverted.push(MORSE_TABLE[letter]);
        });
        phraseConverted.push(" ");
    }) 

    let finish = phraseConverted.join('');
    let phraseWithoutSpace = finish.slice(0, -1);
    return phraseWithoutSpace;

}

module.exports = {
    decode
}