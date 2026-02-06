/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script and the type module property*/

import { trimmedArrayStats, mergePairsUnique, commonElementsStable } from "./arrayUtils.js";
import { findIsograms, weaveChars, spliceSwap } from "./stringUtils.js";
import { deepEqualityIgnore, commonKeyValuePaths, calculateObjectChained } from "./objectUtils.js";

/* arrayUtils.js*/
/* trimmedArrayStats Tests */
try {
  // Should Pass
  const trimmedArrayStatsOne = trimmedArrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20], 1);
  console.log("trimmedArrayStats passed successfully");
} catch (e) {
  console.error("trimmedArrayStats failed test case");
}
try {
  // Should Fail
  const trimmedArrayStatsTwo = trimmedArrayStats([], 1);
  console.error("trimmedArrayStats did not error");
} catch (e) {
  console.log("trimmedArrayStats failed successfully");
}

/* mergePairsUnique Tests */
try {
  // Should Pass
  const mergePairsUniqueOne = mergePairsUnique(["foo", "bar"], [5, "John"], ["foo", "bar"], ["foo", "not bar"], ["foo", "not bar"]);
  console.log("mergePairsUnique passed successfully");
} catch (e) {
  console.error("mergePairsUnique failed test case");
}
try {
  // Should Fail
  const mergePairsUniqueTwo = mergePairsUnique([]);
  console.error("mergePairsUnique did not error");
} catch (e) {
  console.log("mergePairsUnique failed successfully");
}

/* commonElementsStable Tests */
try {
  // Should Pass
  const commonElementsStableOne = commonElementsStable([5, 7, 5, 9], [20, 5, 7, 5]);
  console.log("commonElementsStable passed successfully");
} catch (e) {
  console.error("commonElementsStable failed test case");
}
try {
  // Should Fail
  const commonElementsStableTwo = commonElementsStable([1, 2, 3]);
  console.error("commonElementsStable did not error");
} catch (e) {
  console.log("commonElementsStable failed successfully");
}

/* stringUtils.js*/
/* findIsograms Tests */
try {
  // Should Pass
  const findIsogramsOne = findIsograms("Wow! Did you see that racecar go?");
  console.log("findIsograms passed successfully");
} catch (e) {
  console.error("findIsograms failed test case");
}
try {
  // Should Fail
  const findIsogramsTwo = findIsograms(" ");
  console.error("findIsograms did not error");
} catch (e) {
  console.log("findIsograms failed successfully");
}

/* weaveChars Tests */
try {
  // Should Pass
  const weaveCharsOne = weaveChars("abc", "12345");
  console.log("weaveChars passed successfully");
} catch (e) {
  console.error("weaveChars failed test case");
}

try {
  // Should Fail
  const weaveCharsTwo = weaveChars("abc", 123);
  console.error("weaveChars did not error");
} catch (e) {
  console.log("weaveChars failed successfully");
}

/* spliceSwap Tests */
try {
  // Should Pass
  const spliceSwapOne = spliceSwap("Fernando", "Oriundo", 2);
  console.log("spliceSwap passed successfully");
} catch (e) {
  console.error("spliceSwap failed test case");
}
try {
  // Should Fail
  const spliceSwapTwo = spliceSwap("h", "Hello", 2);
  console.error("spliceSwap did not error");
} catch (e) {
  console.log("spliceSwap failed successfully");
}

/* objectUtils.js*/

/* deepEqualityIgnore Tests */
try {
  // Should Pass
  const a = { x: 1, meta: { updatedAt: "yesterday" }, y: 2 };
  const b = { y: 2, x: 1, meta: { updatedAt: "today" } };
  const deepEqualityIgnoreOne = deepEqualityIgnore(a, b, ["updatedAt"]);
  console.log("deepEqualityIgnore passed successfully");
} catch (e) {
  console.error("deepEqualityIgnore failed test case");
}
try {
  // Should Fail
  const a = { x: 1, meta: { updatedAt: "yesterday" }, y: 2 };
  const b = { y: 2, x: 1, meta: { updatedAt: "today" } };
  const deepEqualityIgnoreTwo = deepEqualityIgnore(a, b, []);
  console.error("deepEqualityIgnore did not error");
} catch (e) {
  console.log("deepEqualityIgnore failed successfully");
}

/* commonKeyValuePaths Tests */
try {
  // Should Pass
  const first = { name: { first: "Patrick", last: "Hill" }, age: 46, school: "Stevens" };
  const second = { name: { first: "Patrick", last: "Hill" }, age: 20, active: true };
  const commonKeyValuePathsOne = commonKeyValuePaths(first, second);
  console.log("commonKeyValuePaths passed successfully");
} catch (e) {
  console.error("commonKeyValuePaths failed test case");
}
try {
  // Should Fail
  const commonKeyValuePathsTwo = commonKeyValuePaths({ a: 1 }, { b: 2 });
  console.error("commonKeyValuePaths did not error");
} catch (e) {
  console.log("commonKeyValuePaths failed successfully");
}

/* calculateObjectChained Tests */
try {
  // Should Pass
  const calculateObjectChainedOne = calculateObjectChained(
    { a: 3, b: -7, c: 5 },
    [n => n * 2, n => n - 1]
  );
  console.log("calculateObjectChained passed successfully");
} catch (e) {
  console.error("calculateObjectChained failed test case");
}
try {
  // Should Fail
  const calculateObjectChainedTwo = calculateObjectChained({ a: 1 }, n => n * 2);
  console.error("calculateObjectChained did not error");
} catch (e) {
  console.log("calculateObjectChained failed successfully");
}