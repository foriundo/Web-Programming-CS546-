export const functionOne = (arr) => {
  // Implement function 1 here
  let res = []
  for  (let i of arr){
    let first_sum = 0;
    
    for ( let j of String(Math.abs(i))){
      first_sum += Number(j);
    }

    let temp = 0;
    let final_sum = first_sum;

    while (first_sum > 9){
      for (let k of String(first_sum)){
        temp += Number(k)
      }
      first_sum = temp;
      final_sum += temp;
      temp = 0;
    }
    
    res.push(final_sum);

  }
  return res; //return result
};

export const functionTwo = (arr) => {
  // Implement function 2 here

  if(arr.length === 0){
    return {}
  }

  let res = {}

  for (let i of arr){
    let word = i.toLowerCase()
    let counter = 0;

    let mySet = new Set(word);
    let arr_word = [...mySet];
    // console.log(arr_word);

    for (let j of arr_word){

      if( /^[A-Za-z]$/.test(j)){
      
        if ( j !== 'a' && j !== 'e' && j !== 'i' && j !== 'o' && j !== 'u'){
          counter ++;
      }
    }
    }
    res[word] = counter;
    counter = 0;

  }

  return res; //return result
};

export const functionThree = (str) => {
  // Implement function 3 here
  let obj =  {mostCommonLength: 0, words: null, averageLength: 0}
  if(str.length === 0){
    return obj;
  }
  let new_arr = str.split(" ");
  let avg = 0;
  let commonLength = {};

  for(let x of new_arr){
    avg += x.length;
    commonLength[x.length] = (commonLength[x.length] || 0) + 1;
  }
  obj["averageLength"] = (Math.floor(avg / (new_arr.length)));
  
  let highestCount = 0;
  let mostCommon = Infinity;

  for (let len in commonLength) {
    let count = commonLength[len];
    let numLen = Number(len);
    if( count > highestCount || (count === highestCount && numLen < mostCommon)){
      highestCount = count;
      mostCommon = numLen;
    }
  }

  obj["mostCommonLength"] = mostCommon;

  let wordsArr = [];
  for(let x of new_arr){
    if(x.length === mostCommon){
      wordsArr.push(x);
    }
  }

  obj["words"] = wordsArr.join(", ");

  return obj; //return result
};

export const functionFour = (arr) => {

  let mySet = new Set(arr);
  let newArr = [...mySet];

  // Implement function 4 here
  let numArr = new Set();
  let alphaArr = new Set();
  for(let x of arr){
    if(Number.isInteger(x)){
      numArr.add(x);
    }
    else{
      alphaArr.add(x);
    }
  }
  console.log(alphaArr);
  return; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Fernando',
  lastName: 'Oriundo',
  studentId: '20027485'
};
