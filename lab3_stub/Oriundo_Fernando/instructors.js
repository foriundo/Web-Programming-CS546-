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

export const getInstructorRoster = async (instructorId) => {
  if (instructorId === undefined) throw "instructorId parameter must be supplied";
  if (typeof instructorId !== "string") throw "instructorId parameter must be a string";

  instructorId = instructorId.trim();
  if (instructorId.length === 0) throw "instructorId cannot be empty spaces";

  let instructors = await getInstructors();
  let courses = await getCourses();
  let students = await getStudents();

  let instructor = instructors.find((i) => i.id === instructorId);
  if (!instructor) throw "instructor not found";

  let instructorName = `${instructor.first_name} ${instructor.last_name}`;

  let taughtCourses = courses.filter((c) => c.instructor === instructorId).sort((a, b) => a.course_name.localeCompare(b.course_name));

  if (taughtCourses.length === 0) {
    return { instructorName, courses: [] };
  }

  let coursesOut = taughtCourses.map((course) => {
    let enrolled = [];

    for (let i = 0; i < students.length; i++) {
      let s = students[i];
      if (s.enrolled_courses.includes(course.id)) {
        enrolled.push({ s, idx: i });
      }
    }

    enrolled.sort((a, b) => {
      let la = a.s.last_name.toLowerCase();
      let lb = b.s.last_name.toLowerCase();

      if (la < lb) return -1;
      if (la > lb) return 1;
      return a.idx - b.idx;
    });

    return {
      courseName: course.course_name,
      enrolledStudents: enrolled.map((x) => `${x.s.first_name} ${x.s.last_name}`),
    };
  });

  return {
    instructorName,
    courses: coursesOut,
  };
};
    

export const instructorsByDepartment = async (department) => {
  if (department === undefined) throw "department parameter must be supplied";
  if (typeof department !== "string") throw "department parameter must be a string";

  department = department.trim();
  if (department.length === 0) throw "department cannot be empty spaces";

  let instructors = await getInstructors();

  let matches = instructors
    .map((inst, idx) => ({ inst, idx }))
    .filter(
      ({ inst }) => inst.department.toLowerCase() === department.toLowerCase()
    );

  if (matches.length === 0) throw "no instructors in that department";

  matches.sort((a, b) => {
    let la = a.inst.last_name.toLowerCase();
    let lb = b.inst.last_name.toLowerCase();

    if (la < lb) return -1;
    if (la > lb) return 1;
    return a.idx - b.idx;
  });

  return matches.map((x) => `${x.inst.first_name} ${x.inst.last_name}`);
};

export const getInstructorById = async (id) => {
  if (id === undefined) throw "id parameter must be supplied";
  if (typeof id !== "string") throw "id parameter must be a string";

  id = id.trim();
  if (id.length === 0) throw "id parameter cannot be empty spaces";

  let instructors = await getInstructors();
  let inst = instructors.find((i) => i.id === id);

  if (!inst) throw "instructor not found";
  return inst;  
};
export default {
  getInstructorRoster,
  instructorsByDepartment,
  getInstructorById,
};