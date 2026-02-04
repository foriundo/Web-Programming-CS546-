/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let findIsograms = (str) => {
  //findIsograms
  if (str === undefined) throw "str is required";
  if (typeof str !== "string") throw "str must be a string";
  str = str.trim();
  if (str.length === 0) throw "str must not be empty";

  const words = str.split(/\s+/);
  const result = [];

  for (let word of words) {
    const core = word.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
    const letters = core.toLowerCase().match(/[a-z]/g);
    if (!letters) continue;

    const set = new Set(letters);
    if (set.size === letters.length) result.push(word);
  }

  return result;
};

let weaveChars = (str) => {
  //weaveChars
  if (str === undefined) throw "str is required";
  if (typeof str !== "string") throw "str must be a string";
  if (str.trim().length === 0) throw "str must not be empty";

  let count = 0;
  let out = "";

  for (let ch of str) {
    if (/[A-Za-z]/.test(ch)) {
      count++;
      if (count % 5 === 0) out += "#";
      else if (count % 3 === 0) out += "$";
      else if (count % 2 === 0) out += "*";
      else out += ch;
    } else {
      out += ch;
    }
  }

  return out;
};

let spliceSwap = (str1, str2, num) => {
  //spliceSwap
  if (str1 === undefined || str2 === undefined) throw "both strings are required";
  if (typeof str1 !== "string" || typeof str2 !== "string") throw "inputs must be strings";
  str1 = str1.trim();
  str2 = str2.trim();
  if (str1.length === 0 || str2.length === 0) throw "strings must not be empty";

  if (num === undefined || typeof num !== "number" || !Number.isInteger(num) || num < 1) {
    throw "num must be a positive integer";
  }
  if (str1.length < num || str2.length < num) {
    throw "strings must be at least num characters long";
  }

  return `${str2.slice(0, num)}${str1.slice(num)} | ${str1.slice(0, num)}${str2.slice(num)}`;
};

export { findIsograms, weaveChars, spliceSwap };