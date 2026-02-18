/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let trimmedArrayStats = (array, trimCount) => {
  //trimmedArrayStats
  if (array === undefined) {
    throw "An array is required";
  }
  if (Array.isArray(array) === false) {
    throw "An array has to be an array";
  }
  if (array.length === 0) {
    throw "The array cannot be empty";
  }

  let i = 0;
  while (i < array.length) {
    let val = array[i];
    if (typeof val !== "number" || Number.isFinite(val) === false) {
      throw "array must only contain numbers";
    }
    i = i + 1;
  }

  if (trimCount === undefined) {
    throw "trimCount is required";
  }
  if (typeof trimCount !== "number") {
    throw "trimCount has to be a integer";
  }
  if (Number.isInteger(trimCount) === false) {
    throw "trimCount has to be integer";
  }
  if (trimCount < 0) {
    throw "trimCount must be >= 0";
  }
  if (trimCount * 2 >= array.length) {
    throw "trimCount removes too many elements";
  }

  let copy = [];
  i = 0;
  while (i < array.length) {
    copy[i] = array[i];
    i = i + 1;
  }

  copy.sort(function (a, b) {
    return a - b;
  });

  let start = trimCount;
  let end = copy.length - trimCount;
  let trimmed = [];
  let tIndex = 0;

  i = start;
  while (i < end) {
    trimmed[tIndex] = copy[i];
    tIndex = tIndex + 1;
    i = i + 1;
  }

  let count = trimmed.length;

  let sum = 0;
  i = 0;
  while (i < trimmed.length) {
    sum = sum + trimmed[i];
    i = i + 1;
  }

  let mean = sum / count;

  let median = 0;
  if (count % 2 === 1) {
    let midIndex = (count - 1) / 2;
    median = trimmed[midIndex];
  } else {
    let rightMid = count / 2;
    let leftMid = rightMid - 1;
    median = (trimmed[leftMid] + trimmed[rightMid]) / 2;
  }

  let freq = {};
  i = 0;
  while (i < trimmed.length) {
    let num = trimmed[i];
    let key = String(num);

    if (freq[key] === undefined) {
      freq[key] = 1;
    } else {
      freq[key] = freq[key] + 1;
    }

    i = i + 1;
  }

  let maxFreq = 0;
  for (let k in freq) {
    if (freq[k] > maxFreq) {
      maxFreq = freq[k];
    }
  }

  let mode = 0;

  if (maxFreq > 1) {
    let modes = [];
    let mCount = 0;

    for (let k in freq) {
      if (freq[k] === maxFreq) {
        modes[mCount] = Number(k);
        mCount = mCount + 1;
      }
    }

    modes.sort(function (a, b) {
      return a - b;
    });

    if (modes.length === 1) {
      mode = modes[0];
    } else {
      mode = modes;
    }
  }

  let minimum = trimmed[0];
  let maximum = trimmed[trimmed.length - 1];
  let range = maximum - minimum;

  let meanRounded = Number(mean.toFixed(2));
  let medianRounded = Number(median.toFixed(2));
  let rangeRounded = Number(range.toFixed(2));
  let minRounded = Number(minimum.toFixed(2));
  let maxRounded = Number(maximum.toFixed(2));
  let sumRounded = Number(sum.toFixed(2));

  let modeRounded;

  if (Array.isArray(mode) === true) {
    modeRounded = [];
    i = 0;
    while (i < mode.length) {
      modeRounded[i] = Number(mode[i].toFixed(2));
      i = i + 1;
    }
  } else {
    modeRounded = Number(mode.toFixed(2));
  }

  return {
    mean: meanRounded,
    median: medianRounded,
    mode: modeRounded,
    range: rangeRounded,
    minimum: minRounded,
    maximum: maxRounded,
    count: count,
    sum: sumRounded
  };
};

let mergePairsUnique = (...args) => {
  /*
  mergePairsUnique
  this function takes in a variable number of arrays that's what the ...args signifies
  */
  if (args.length === 0){
    throw "An array is required";
  } 

  let result = {};

  for (let arr of args) {
    if(arr == undefined){
      throw "Inputs must exist"
    }

    if (!Array.isArray(arr)){
      throw "Each argument must be an array";
    } 

    if (arr.length === 0){
      throw "The array must not be empty";
    } 

    if (arr.length !== 2){
      throw "Each array must have exactly two elements";
    } 

    let key = String(arr[0]);
    let val = arr[1];

    if (!result[key]){
      result[key] = [];
    } 
    if (!result[key].includes(val)){
      result[key].push(val);
    } 
  }

  return result;
};

let commonElementsStable = (...args) => {
  /*commonElementsStable
  this function takes in a variable number of arrays that's what the ...args signifies
  */
  if (args.length < 2){ 
    throw "at least two arrays are required";
  }

  for (let arr of args) {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw "each argument must be a non-empty array";
    }
  }

  let equals = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length){ 
        return false;
      }
      return a.every((v, i) => v === b[i]);
    }
    return a === b;
  };

  let result = [];

  for (let item of args[0]) {
    if (result.some((x) => equals(x, item))){ 
      continue;
    }

    let inAll = true;
    for (let i = 1; i < args.length; i++) {
      if (!args[i].some((x) => equals(x, item))) {
        inAll = false;
        break;
      }
    }
    if (inAll){ 
      result.push(item);
    }
  }

  return result;
};

export { trimmedArrayStats, mergePairsUnique, commonElementsStable };
