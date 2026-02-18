//you can use this file to create helper functions if you wish. You do not have to use it if you do not want to.

import axios from "axios";

// TODO: Paste your lab's *raw* gist URLs here
const STUDENTS_URL = "PASTE_STUDENTS_JSON_URL_HERE";
const COURSES_URL = "PASTE_COURSES_JSON_URL_HERE";
const INSTRUCTORS_URL = "PASTE_INSTRUCTORS_JSON_URL_HERE";

// In-memory cache (still fetched via axios; not saved to disk)
let _studentsCache = null;
let _coursesCache = null;
let _instructorsCache = null;

function assertUrlSet(url, name) {
  if (!url || url.includes("PASTE_")) {
    throw `${name} URL is not set in helpers.js. Paste the raw gist URL.`;
  }
}

export const getStudents = async () => {
  if (_studentsCache) return _studentsCache;
  assertUrlSet(STUDENTS_URL, "students.json");
  const { data } = await axios.get(STUDENTS_URL);
  if (!Array.isArray(data)) throw "students.json did not return an array";
  _studentsCache = data;
  return data;
};

export const getCourses = async () => {
  if (_coursesCache) return _coursesCache;
  assertUrlSet(COURSES_URL, "courses.json");
  const { data } = await axios.get(COURSES_URL);
  if (!Array.isArray(data)) throw "courses.json did not return an array";
  _coursesCache = data;
  return data;
};

export const getInstructors = async () => {
  if (_instructorsCache) return _instructorsCache;
  assertUrlSet(INSTRUCTORS_URL, "instructors.json");
  const { data } = await axios.get(INSTRUCTORS_URL);
  if (!Array.isArray(data)) throw "instructors.json did not return an array";
  _instructorsCache = data;
  return data;
};

// Validation: must exist, be a string, and not be empty after trim.
// Returns trimmed string.
export const assertString = (val, varName) => {
  if (val === undefined) throw `${varName} parameter must be supplied`;
  if (typeof val !== "string") throw `${varName} parameter must be a string`;
  const trimmed = val.trim();
  if (trimmed.length === 0) throw `${varName} parameter cannot be empty spaces`;
  return trimmed;
};

export const fullName = (obj) => `${obj.first_name} ${obj.last_name}`;

// Stable sort by a key (tie-breaker = original index)
export const stableSortByKey = (arr, keyFn) => {
  return arr
    .map((item, idx) => ({ item, idx, key: keyFn(item) }))
    .sort((a, b) => {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return a.idx - b.idx;
    })
    .map((x) => x.item);
};