module.exports = function check(str, bracketsConfig) {
  let bracketString = str;
  
  let bracketsArray = [];
  
  for (let number in bracketsConfig) {
    bracketsArray[number] = bracketsConfig[number][0] + bracketsConfig[number][1]; // pairing brackets from config
  }

  for (let i = 0; i <= str.length; i++) {
      for (let bracketNumber in bracketsConfig) {
        bracketString = bracketString.split(`${bracketsArray[bracketNumber]}`).join('');  // splitting a string by values ​​from an array
      }
  }

  if (bracketString.length == 0) {
      return (true);
  } else if (bracketString.length != 0) {
      return (false);
  }
}
