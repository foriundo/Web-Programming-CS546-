/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let findIsograms = (str) => {
  //findIsograms
  if (str === undefined){ 
    throw "str is required";
  }

  if (typeof str !== "string"){ 
    throw "str must be a string";
  }

  str = str.trim();
  if (str.length === 0){ 
    throw "str cannot be empty";
  }

  let words = str.split(/\s+/);
  let result = [];

  for (let word of words) {
    let core = word.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
    let letters = core.toLowerCase().match(/[a-z]/g);
    if (!letters){ 
      continue;
    }

    let set = new Set(letters);
    if (set.size === letters.length){ 
      result.push(word);
    }
  }

  return result;
};

let weaveChars = (str) => {
  //weaveChars
  if (str === undefined) {
    throw "str is required";
  }

  if (typeof str !== "string") {
    throw "str must be a string";
  }

  if (str.trim().length === 0) {
    throw "str cannot be empty";
  }

  let count = 0;
  let res = "";

  for (let ch of str) {
    if (/[A-Za-z]/.test(ch)) {
      count++;
      if (count % 5 === 0) res += "#";
      else if (count % 3 === 0) res += "$";
      else if (count % 2 === 0) res += "*";
      else res += ch;
    } else {
      res += ch;
    }
  }

  return res;
};

let spliceSwap = (str1, str2, num) => {
  //spliceSwap
  if (str1 === undefined || str2 === undefined){
     throw "Both strings are required";
    }
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw "Inputs have to be strings";
  }

  str1 = str1.trim();
  str2 = str2.trim();
  
  if (str1.length === 0 || str2.length === 0) {
    throw "Strings cannot be empty";
  }

  if (num === undefined || typeof num !== "number" || !Number.isInteger(num) || num < 1) {
    throw "num must be a positive integer";
  }
  if (str1.length < num || str2.length < num) {
    throw "Strings must be at least num characters long";
  }

  return `${str2.slice(0, num)}${str1.slice(num)} | ${str1.slice(0, num)}${str2.slice(num)}`;
};

export { findIsograms, weaveChars, spliceSwap };