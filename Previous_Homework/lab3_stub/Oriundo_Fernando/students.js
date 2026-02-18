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

export const getStudentById = async (id) => {
  if (id === undefined) throw "id parameter must be supplied";
  if (typeof id !== "string") throw "id parameter must be a string";

  id = id.trim();
  if (id.length === 0) throw "id parameter cannot be empty spaces";

  let students = await getStudents();
  let student = students.find((s) => s.id === id);

  if (!student) throw "student not found";
  return student;
};

export const studentsInCourse = async (courseName) => {
  if (courseName === undefined) throw "courseName parameter must be supplied";
  if (typeof courseName !== "string") throw "courseName parameter must be a string";

  courseName = courseName.trim();
  if (courseName.length === 0) throw "courseName cannot be empty spaces";

  let courses = await getCourses();
  let students = await getStudents();

  let matchingCourses = courses.filter(
    (c) => c.course_name.toLowerCase() === courseName.toLowerCase()
  );

  if (matchingCourses.length === 0) throw "no course exists with that courseName";

  let matchingCourseIds = new Set(matchingCourses.map((c) => c.id));

  let enrolled = students.filter((s) =>
    s.enrolled_courses.some((cid) => matchingCourseIds.has(cid))
  );

  if (enrolled.length === 0) throw "course exists but no students are enrolled";

  enrolled = enrolled.map((s, idx) => ({ s, idx })).sort((a, b) => {
      let lastA = a.s.last_name.toLowerCase();
      let lastB = b.s.last_name.toLowerCase();

      if (lastA < lastB) return -1;
      if (lastA > lastB) return 1;
      return a.idx - b.idx;
    })
    .map((x) => x.s);

  return enrolled;
};

export const getInstructorsByStudentID = async (studentId) => {    
  if (studentId === undefined) throw "studentId parameter must be supplied";
  if (typeof studentId !== "string") throw "studentId parameter must be a string";

  studentId = studentId.trim();
  if (studentId.length === 0) throw "studentId cannot be empty spaces";

  let students = await getStudents();
  let courses = await getCourses();
  let instructors = await getInstructors();

  let student = students.find((s) => s.id === studentId);
  if (!student) throw "student not found";

  if (!student.enrolled_courses || student.enrolled_courses.length === 0) {
    return {};
  }

  let courseMap = new Map(courses.map((c) => [c.id, c]));
  let instructorMap = new Map(instructors.map((i) => [i.id, i]));

  let result = {};

  for (let courseId of student.enrolled_courses) {
    let course = courseMap.get(courseId);
    if (!course) throw `course not found for course id: ${courseId}`;

    let inst = instructorMap.get(course.instructor);
    if (!inst) throw `instructor not found for instructor id: ${course.instructor}`;

    result[course.course_name] = `${inst.first_name} ${inst.last_name}`;
  }

  return result;  
};

export default {
  getStudentById,
  studentsInCourse,
  getInstructorsByStudentID,
};