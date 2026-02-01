import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
//FunctionOne
console.log(lab1.functionOne([987, 1234, -49])); // returns and then outputs: [30, 11, 17]
console.log(lab1.functionOne([5, 10, 99])); // returns and then outputs: [5, 1, 27] 
console.log(lab1.functionOne([5])); // returns and then outputs: [0]
console.log(lab1.functionOne([19, 29, 199])); // returns and then outputs: [11, 13, 30]
console.log(lab1.functionOne([-9999, 111, 808])); // returns and then outputs: [45, 3, 23]

//FunctionTwo
console.log(lab1.functionTwo(["hello", "world", "AEIOU"])); // returns and then outputs: {hello: 2, world: 4, AEIOU: 0} 
console.log(lab1.functionTwo(["banana", "Programming", "sky"])); // returns and then outputs: {banana: 2, Programming: 5, sky: 3} 
console.log(lab1.functionTwo(["xyz"])); // returns and then outputs:  {xyz: 3}
console.log(lab1.functionTwo([])); // returns and then outputs: {}
console.log(lab1.functionTwo(["B2B!!!", "Shh...", "rhythm"])); // returns and then outputs: {B2B!!!: 1, Shh...: 2, rhythm: 5}

//FunctionoThree
console.log(lab1.functionThree("Hello world from Stevens")); // returns and then outputs: {mostCommonLength: 5, words: "Hello, world", averageLength: 5}
console.log(lab1.functionThree("This is a test.")); // returns and then outputs: {mostCommonLength: 1, words: "a", averageLength: 3}
console.log(lab1.functionThree("OneWord")); // returns and then outputs: {mostCommonLength: 7, words: "OneWord", averageLength: 7}
console.log(lab1.functionThree("")); // returns and then outputs: {mostCommonLength: 0, words: null, averageLength: 0}
console.log(lab1.functionThree("I am programming now! now!")); // returns and then outputs: {mostCommonLength: 4, words: "now!, now!", averageLength: 4}

//FunctionFour
console.log(lab1.functionFour([3, "guitar", 1, "bass", -10, "bass", 3]));  // returns and then outputs: ["bass", "guitar", -10, 1, 3]
console.log(lab1.functionFour(["apple", "orange", "kiwi", 10, -2, 2])); // returns and then outputs: ["apple", "kiwi", "orange", -2, 2, 10]
console.log(lab1.functionFour([100, "Zebra", "Ant", 50, -100])); // returns and then outputs: ["Ant", "Zebra", -100, 50, 100]
console.log(lab1.functionFour(["one", "two", "three", "two", 7, 8, 7]));// returns and then outputs: ["two", "one", "three", 8, 7]
console.log(lab1.functionFour([1, -1, 2, -2, 0, "AaA", "bb", "bb!"])); // returns and then outputs: ["bb", "bb!", "AaA", -2, 0, 2, -1, 1]
