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
  return; //return result
};

export const functionFour = (arr) => {
  // Implement function 4 here
  return; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Fernando',
  lastName: 'Oriundo',
  studentId: '20027485'
};
