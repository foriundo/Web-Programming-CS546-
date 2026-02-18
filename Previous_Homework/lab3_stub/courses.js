//Export the following functions using ES6 Syntax
import axios from "axios";

let studentsUrl = "https://gist.githubusercontent.com/graffixnyc/cc90ea979b1154ac0723db6836487173/raw/534613a0e7f88f91a73b6b7d2f00afb41966724d/students.json";
let coursesUrl = "https://gist.githubusercontent.com/graffixnyc/48d339a9be4828b9180456c9dd65e86a/raw/d714026734fd00d35092f20e71b8025536e1eb69/courses.json";
let instructorsUrl = "https://gist.githubusercontent.com/graffixnyc/6024ad5ae58e05f08142bd1ba7cf6291/raw/34b06695d017dd3a6908da656cd1864be7371a3a/instructors.json";

async function getStudents() {
  let { data } = await axios.get(studentsUrl);
  return data;
}

async function getCourses() {
  let { data } = await axios.get(coursesUrl);
  return data;
}

async function getInstructors() {
  let { data } = await axios.get(instructorsUrl);
  return data;
}

export const getMostPopularCourses = async () => {
 let courses = await getCourses();
  let students = await getStudents();

  if (!courses || courses.length === 0) throw "no courses in dataset";

  let enrollCount = new Map();
  for (let c of courses) {
    enrollCount.set(c.id, 0);
  }

  for (let s of students) {
    for (let cid of s.enrolled_courses) {
      if (enrollCount.has(cid)) {
        enrollCount.set(cid, enrollCount.get(cid) + 1);
      }
    }
  }

  let popular = courses
    .map((c) => ({
      name: c.course_name,
      count: enrollCount.get(c.id),
    }))
    .filter((x) => x.count > 0);

  popular.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  return popular.map((x) => x.name);
};

export const getDepartmentCourseStats = async (department) => {
  if (department === undefined) throw "department parameter must be supplied";
  if (typeof department !== "string") throw "department parameter must be a string";

  department = department.trim();
  if (department.length === 0) throw "department cannot be empty spaces";

  let courses = await getCourses();
  let instructors = await getInstructors();

  let deptCourses = courses.filter(
    (c) => c.department.toLowerCase() === department.toLowerCase()
  );

  if (deptCourses.length === 0) throw "department does not exist";

  let deptNameCased = deptCourses[0].department;

  let totalCourses = deptCourses.length;

  let totalCredits = 0;
  for (let c of deptCourses) {
    totalCredits += Number(c.credits);
  }

  let averageCredits = Number((totalCredits / totalCourses).toFixed(2));

  let instructorIds = [...new Set(deptCourses.map((c) => c.instructor))];

  let instructorObjs = instructorIds.map((id) => {
    let inst = instructors.find((i) => i.id === id);
    if (!inst) throw `instructor not found for instructor id: ${id}`;
    return inst;
  });

  let sorted = instructorObjs.map((inst, idx) => ({ inst, idx })).sort((a, b) => {
      let la = a.inst.last_name.toLowerCase();
      let lb = b.inst.last_name.toLowerCase();

      if (la < lb) return -1;
      if (la > lb) return 1;
      return a.idx - b.idx;
    })
    .map((x) => `${x.inst.first_name} ${x.inst.last_name}`);

  return {
    department: deptNameCased,
    totalCourses,
    totalCredits,
    averageCredits,
    instructors: sorted,
  };
};

export const getCourseById = async (id) => {
  if (id === undefined) throw "id parameter must be supplied";
  if (typeof id !== "string") throw "id parameter must be a string";

  id = id.trim();
  if (id.length === 0) throw "id parameter cannot be empty spaces";

  let courses = await getCourses();
  let course = courses.find((c) => c.id === id);

  if (!course) throw "course not found";
  return course;
};

export default {
  getMostPopularCourses,
  getDepartmentCourseStats,
  getCourseById,
};
