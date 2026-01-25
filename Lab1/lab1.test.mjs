import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
//FunctionOne
// console.log(lab1.functionOne([987, 1234, -49])); // returns and then outputs: [30, 11, 17]
// console.log(lab1.functionOne([5, 10, 99])); // returns and then outputs: [5, 1, 27] 
// console.log(lab1.functionOne([5])); // returns and then outputs: [0]
// console.log(lab1.functionOne([19, 29, 199])); // returns and then outputs: [11, 13, 30]
// console.log(lab1.functionOne([-9999, 111, 808])); // returns and then outputs: [45, 3, 23]

console.log(lab1.functionTwo(["hello", "world", "AEIOU"])); // returns and then outputs: {hello: 2, world: 4, AEIOU: 0} 
console.log(lab1.functionTwo(["banana", "Programming", "sky"])); // returns and then outputs: {banana: 2, Programming: 5, sky: 3} 
console.log(lab1.functionTwo(["xyz"])); // returns and then outputs:  {xyz: 3}
console.log(lab1.functionTwo([])); // returns and then outputs: {}
console.log(lab1.functionTwo(["B2B!!!", "Shh...", "rhythm"])); // returns and then outputs: {B2B!!!: 1, Shh...: 2, rhythm: 5}