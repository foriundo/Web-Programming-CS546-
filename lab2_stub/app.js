/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script and the type module property*/

import { trimmedArrayStats, mergePairsUnique, commonElementsStable } from "./arrayUtils.js";
import { findIsograms, weaveChars, spliceSwap } from "./stringUtils.js";
import { deepEqualityIgnore, commonKeyValuePaths, calculateObjectChained } from "./objectUtils.js";

// ---------------- trimmedArrayStats ----------------
try {
  const res = trimmedArrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20], 1);
  console.log("trimmedArrayStats PASS:", res);
} catch (e) {
  console.error("trimmedArrayStats should have passed but failed:", e);
}

try {
  trimmedArrayStats([1, 2, 3], 2); // trimCount*2 >= length -> should throw
  console.error("trimmedArrayStats should have failed but did not error");
} catch (e) {
  console.log("trimmedArrayStats FAIL (expected):", e);
}

// ---------------- mergePairsUnique ----------------
try {
  const res = mergePairsUnique(
    ["foo", "bar"],
    [5, "John"],
    ["foo", "bar"],
    ["foo", "not bar"],
    ["foo", "not bar"]
  );
  console.log("mergePairsUnique PASS:", res);
} catch (e) {
  console.error("mergePairsUnique should have passed but failed:", e);
}

try {
  mergePairsUnique([]); // array not length 2 -> should throw
  console.error("mergePairsUnique should have failed but did not error");
} catch (e) {
  console.log("mergePairsUnique FAIL (expected):", e);
}

// ---------------- commonElementsStable ----------------
try {
  const arr1 = [5, 7, 5, 9];
  const arr2 = [20, 5, 7, 5];
  const res = commonElementsStable(arr1, arr2);
  console.log("commonElementsStable PASS:", res);
} catch (e) {
  console.error("commonElementsStable should have passed but failed:", e);
}

try {
  commonElementsStable([1, 2, 3]); // only one array -> should throw
  console.error("commonElementsStable should have failed but did not error");
} catch (e) {
  console.log("commonElementsStable FAIL (expected):", e);
}

// ---------------- findIsograms ----------------
try {
  const res = findIsograms("Hi mom, At noon, I'm going to take my kayak to the lake");
  console.log("findIsograms PASS:", res);
} catch (e) {
  console.error("findIsograms should have passed but failed:", e);
}

try {
  findIsograms("   "); // empty after trim -> should throw
  console.error("findIsograms should have failed but did not error");
} catch (e) {
  console.log("findIsograms FAIL (expected):", e);
}

// ---------------- weaveChars ----------------
try {
  const res = weaveChars("Hi! 123");
  console.log("weaveChars PASS:", res);
} catch (e) {
  console.error("weaveChars should have passed but failed:", e);
}

try {
  weaveChars(""); // empty string -> should throw
  console.error("weaveChars should have failed but did not error");
} catch (e) {
  console.log("weaveChars FAIL (expected):", e);
}

// ---------------- spliceSwap ----------------
try {
  const res = spliceSwap("Patrick", "Hill", 2);
  console.log("spliceSwap PASS:", res);
} catch (e) {
  console.error("spliceSwap should have passed but failed:", e);
}

try {
  spliceSwap("h", "e", 2); // not enough length -> should throw
  console.error("spliceSwap should have failed but did not error");
} catch (e) {
  console.log("spliceSwap FAIL (expected):", e);
}

// ---------------- deepEqualityIgnore ----------------
try {
  const a = { x: 1, meta: { updatedAt: "yesterday" }, y: 2 };
  const b = { y: 2, x: 1, meta: { updatedAt: "today" } };
  const res = deepEqualityIgnore(a, b, ["updatedAt"]);
  console.log("deepEqualityIgnore PASS:", res);
} catch (e) {
  console.error("deepEqualityIgnore should have passed but failed:", e);
}

try {
  deepEqualityIgnore({}, {}, []); // ignoreKeys empty -> should throw
  console.error("deepEqualityIgnore should have failed but did not error");
} catch (e) {
  console.log("deepEqualityIgnore FAIL (expected):", e);
}

// ---------------- commonKeyValuePaths ----------------
try {
  const first = { name: { first: "Patrick", last: "Hill" }, age: 46, school: "Stevens" };
  const second = { name: { first: "Patrick", last: "Hill" }, age: 20, active: true };
  const res = commonKeyValuePaths(first, second);
  console.log("commonKeyValuePaths PASS:", res);
} catch (e) {
  console.error("commonKeyValuePaths should have passed but failed:", e);
}

try {
  commonKeyValuePaths({ a: 1 }, { b: 2 }); // each must have >=2 key/value pairs -> should throw
  console.error("commonKeyValuePaths should have failed but did not error");
} catch (e) {
  console.log("commonKeyValuePaths FAIL (expected):", e);
}

// ---------------- calculateObjectChained ----------------
try {
  const res = calculateObjectChained(
    { a: 3, b: -7, c: 5 },
    [(n) => n * 2, (n) => n - 1]
  );
  console.log("calculateObjectChained PASS:", res);
} catch (e) {
  console.error("calculateObjectChained should have passed but failed:", e);
}

try {
  calculateObjectChained({ a: 3, b: -7 }, (n) => n * 2); // funcs not array -> should throw
  console.error("calculateObjectChained should have failed but did not error");
} catch (e) {
  console.log("calculateObjectChained FAIL (expected):", e);
}
