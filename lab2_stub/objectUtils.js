/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEqualityIgnore = (obj1, obj2, ignoreKeys) => {
  //deepEqualityIgnore
  if (!obj1 || !obj2) throw "objects required";
  if (typeof obj1 !== "object" || typeof obj2 !== "object") throw "inputs must be objects";
  if (Array.isArray(obj1) || Array.isArray(obj2)) throw "inputs must not be arrays";

  if (!Array.isArray(ignoreKeys) || ignoreKeys.length === 0) {
    throw "ignoreKeys must be a non-empty array";
  }

  const ignore = new Set(ignoreKeys);

  const equal = (a, b) => {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;

    if (typeof a === "object" && a && b) {
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      for (let k of keys) {
        if (ignore.has(k)) continue;
        if (!(k in a) || !(k in b)) return false;
        if (!equal(a[k], b[k])) return false;
      }
      return true;
    }
    return false;
  };

  return equal(obj1, obj2);
};

let commonKeyValuePaths = (obj1, obj2) => {
  //commonKeyValuePaths
  if (!obj1 || !obj2) throw "objects required";
  if (typeof obj1 !== "object" || typeof obj2 !== "object") throw "inputs must be objects";
  if (Array.isArray(obj1) || Array.isArray(obj2)) throw "inputs must not be arrays";
  if (Object.keys(obj1).length < 2 || Object.keys(obj2).length < 2) {
    throw "objects must have at least two keys";
  }

  const collect = (obj, prefix = "") => {
    let res = {};
    for (let k in obj) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (typeof obj[k] === "object" && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(res, collect(obj[k], path));
      } else {
        res[path] = obj[k];
      }
    }
    return res;
  };

  const a = collect(obj1);
  const b = collect(obj2);

  return Object.keys(a)
    .filter(p => p in b && a[p] === b[p])
    .sort();
};

let calculateObjectChained = (object, funcs) => {
  //calculateObjectChained
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    throw "object must be a plain object";
  }
  if (!Array.isArray(funcs) || funcs.length === 0) throw "funcs must be a non-empty array";

  for (let fn of funcs) {
    if (typeof fn !== "function") throw "all funcs must be functions";
  }

  const result = {};
  for (let k in object) {
    if (typeof object[k] !== "number" || !Number.isFinite(object[k])) {
      throw "object values must be numbers";
    }
    let v = object[k];
    for (let fn of funcs) v = fn(v);
    v = Math.cbrt(Math.abs(v));
    result[k] = Number(v.toFixed(3));
  }

  return result;
};

export { deepEqualityIgnore, commonKeyValuePaths, calculateObjectChained };