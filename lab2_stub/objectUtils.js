/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEqualityIgnore = (obj1, obj2, ignoreKeys) => {
  //deepEqualityIgnore
  if (obj1 === undefined || obj2 === undefined) {
    throw "obj1 and obj2 are required";
  }
  if (obj1 === null || obj2 === null) {
    throw "obj1 and obj2 must be objects";
  }
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    throw "obj1 and obj2 must be objects";
  }
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    throw "obj1 and obj2 must not be arrays";
  }

  if (ignoreKeys === undefined) {
    throw "ignoreKeys is required";
  }
  if (!Array.isArray(ignoreKeys)){
    throw "ignoreKeys must be an array";
    }
  if (ignoreKeys.length === 0) {
    throw "ignoreKeys must not be empty";
  }

  for (let i = 0; i < ignoreKeys.length; i++) {
    if (typeof ignoreKeys[i] !== "string") {
      throw "each element in ignoreKeys must be a string";
    }
  }

  let ignore = new Set(ignoreKeys);

  let equal = (a, b) => {
    if (a === b) {
      return true;
    }

    if (typeof a !== typeof b) {
      return false;
    }

    if (a === null || b === null){
       return false;
      }

    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a) || !Array.isArray(b)){ 
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }

      for (let i = 0; i < a.length; i++) {
        if (!equal(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }

    if (typeof a === "object") {
      let aKeys = Object.keys(a);
      let bKeys = Object.keys(b);

      for (let i = 0; i < aKeys.length; i++) {
        let k = aKeys[i];
        if (ignore.has(k)) {
          continue;
        }
        if (!(k in b)) {
          return false;
        }
        if (!equal(a[k], b[k])) {
          return false;
        }
      }

      for (let i = 0; i < bKeys.length; i++) {
        let k = bKeys[i];
        if (ignore.has(k)) {
          continue;
        }
        if (!(k in a)) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  return equal(obj1, obj2);
};

let commonKeyValuePaths = (obj1, obj2) => {
  //commonKeyValuePaths
  if (obj1 === undefined || obj2 === undefined) {
    throw "Both objects are required";
  }

  if (obj1 === null || obj2 === null) {
    throw "Objects must not be null";
  }

  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    throw "Inputs must be objects";
  }

  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    throw "Inputs must not be arrays";
  }

  if (Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0) {
    throw "Objects must not be empty";
  }

  if (Object.keys(obj1).length < 2 || Object.keys(obj2).length < 2) {
    throw "Objects must have at least two key/value pairs";
  }

  let collection = (obj, prefix) => {
    let res = {};
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let path;

      if (prefix) {
        path = prefix + "." + k;
      } else {
        path = k;
      }

      let val = obj[k];

      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        let inner = collection(val, path);
        let innerKeys = Object.keys(inner);

        for (let j = 0; j < innerKeys.length; j++) {
          let innerPath = innerKeys[j];
          res[innerPath] = inner[innerPath];
        }
      } else {
        if (!Array.isArray(val)) {
          res[path] = val;
        }
      }
    }

    return res;
  };

  let a = collection(obj1, "");
  let b = collection(obj2, "");

  let result = [];
  let aKeys = Object.keys(a);

  for (let i = 0; i < aKeys.length; i++) {
    let key = aKeys[i];

    if (key in b && a[key] === b[key]) {
      result.push(key);
    }
  }

  result.sort();
  return result;
};

let calculateObjectChained = (object, funcs) => {
  //calculateObjectChained
  if (object === undefined) {
    throw "object is required";
  }

  if (object === null) {
    throw "object must be an object";
  }

  if (typeof object !== "object") {
    throw "object must be an object";
  }

  if (Array.isArray(object)) {
    throw "object must not be an array";
  }

  if (funcs === undefined) {
    throw "funcs is required";
  }

  if (!Array.isArray(funcs)) {
    throw "funcs must be an array";
  }

  if (funcs.length === 0) {
    throw "funcs must not be empty";
  }

  for (let i = 0; i < funcs.length; i++) {
    if (typeof funcs[i] !== "function") {
      throw "each element in funcs must be a function";
    }
  }

  let result = {};
  let keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let val = object[key];

    if (typeof val !== "number" || Number.isFinite(val) === false) {
      throw "object values must be numbers";
    }

    let v = val;

    for (let j = 0; j < funcs.length; j++) {
      v = funcs[j](v);
    }

    v = Math.abs(v);
    v = Math.cbrt(v);

    result[key] = Number(v.toFixed(3));
  }

  return result;
};

export { deepEqualityIgnore, commonKeyValuePaths, calculateObjectChained };