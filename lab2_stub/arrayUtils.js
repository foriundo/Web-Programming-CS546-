/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let trimmedArrayStats = (array, trimCount) => {
  //trimmedArrayStats
  if (array === undefined) throw "array is required";
  if (!Array.isArray(array)) throw "array must be an array";
  if (array.length === 0) throw "array must not be empty";

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== "number" || !Number.isFinite(array[i])) {
      throw "array must contain only numbers";
    }
  }

  if (trimCount === undefined) throw "trimCount is required";
  if (typeof trimCount !== "number" || !Number.isInteger(trimCount)) {
    throw "trimCount must be an integer";
  }
  if (trimCount < 0) throw "trimCount must be >= 0";
  if (trimCount * 2 >= array.length) {
    throw "trimCount removes too many elements";
  }

  const sorted = [...array].sort((a, b) => a - b);
  const trimmed = sorted.slice(trimCount, sorted.length - trimCount);

  const count = trimmed.length;
  const sum = trimmed.reduce((a, b) => a + b, 0);
  const mean = sum / count;

  let median;
  if (count % 2 === 1) {
    median = trimmed[Math.floor(count / 2)];
  } else {
    median = (trimmed[count / 2 - 1] + trimmed[count / 2]) / 2;
  }

  const freq = {};
  for (let n of trimmed) freq[n] = (freq[n] || 0) + 1;

  let maxFreq = Math.max(...Object.values(freq));
  let mode = 0;
  if (maxFreq > 1) {
    const modes = Object.keys(freq)
      .filter(k => freq[k] === maxFreq)
      .map(Number)
      .sort((a, b) => a - b);
    mode = modes.length === 1 ? modes[0] : modes;
  }

  const min = trimmed[0];
  const max = trimmed[trimmed.length - 1];

  return {
    mean: Number(mean.toFixed(2)),
    median: Number(median.toFixed(2)),
    mode: Array.isArray(mode) ? mode.map(x => Number(x.toFixed(2))) : Number(mode.toFixed(2)),
    range: Number((max - min).toFixed(2)),
    minimum: Number(min.toFixed(2)),
    maximum: Number(max.toFixed(2)),
    count,
    sum: Number(sum.toFixed(2))
  };  
};

let mergePairsUnique = (...args) => {
  /*
  mergePairsUnique
  this function takes in a variable number of arrays that's what the ...args signifies
  */
  if (args.length === 0) throw "at least one array is required";

  const result = {};

  for (let arr of args) {
    if (!Array.isArray(arr)) throw "each argument must be an array";
    if (arr.length !== 2) throw "each array must have exactly two elements";

    const key = String(arr[0]);
    const val = arr[1];

    if (!result[key]) result[key] = [];
    if (!result[key].includes(val)) result[key].push(val);
  }

  return result; 
};

let commonElementsStable = (...args) => {
  /*commonElementsStable
  this function takes in a variable number of arrays that's what the ...args signifies
  */
  if (args.length < 2) throw "at least two arrays are required";

  for (let arr of args) {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw "each argument must be a non-empty array";
    }
  }

  const equals = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((v, i) => v === b[i]);
    }
    return a === b;
  };

  const result = [];

  for (let item of args[0]) {
    if (result.some(x => equals(x, item))) continue;

    let inAll = true;
    for (let i = 1; i < args.length; i++) {
      if (!args[i].some(x => equals(x, item))) {
        inAll = false;
        break;
      }
    }
    if (inAll) result.push(item);
  }

  return result;
};

export { trimmedArrayStats, mergePairsUnique, commonElementsStable 
}; 
