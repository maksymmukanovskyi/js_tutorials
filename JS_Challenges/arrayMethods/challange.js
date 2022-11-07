/* 

//////////////challenge #1


const movementDescription = movements.map(
  (el, i) =>
    `Movement ${i + 1}: You ${el > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(
      el
    )}`
);
console.log(movementDescription);

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets
HINT: Use tools from all lectures in this section so far 😉
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

/*const checkDogs = function (jData, kData) {
  const catFilter = jData.slice(1, -2);
  const allDogs = [...catFilter, ...kData];
  const arrStr = [];
  allDogs.forEach((el, i) => {
    let isAdult = el >= 3 ? 'an adult' : 'puppy 🐶';
    arrStr.push(`Dog number ${i + 1} is an ${isAdult}, and is ${el} years old`);
  });
  const arr1 = [];
  const arr2 = [];
  arrStr.filter(el => {
    el.includes('adult') ? arr1.push(el) : arr2.push(el);
  });

  const result = [...arr1, ...arr2];

  console.log(result);
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/

//////////////challenge #2

/*Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/

/*const calcAverageHumanAge = function (ages) {
  const filteredAges = ages
    .map(el => (el <= 2 ? el * 2 : 16 + el * 4))
    .filter(el => el > 18);

  return Math.trunc(
    filteredAges.reduce((acc, el) => acc + el, 0) / filteredAges.length
  );
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


//////////////challenge #3




const calcAverageHumanAge = ages =>
  Math.trunc(
    ages
      .map(el => (el <= 2 ? el * 2 : 16 + el * 4))
      .filter(el => el > 18)
      .reduce((acc, el, i, arr) => acc + el / arr.length, 0)
  );

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));



// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
GOOD LUCK 😀

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1 recomended food add
dogs.map(el => (el.recomendedFood = Math.trunc(el.weight ** 0.75 * 28)));
console.log(dogs);

//2
const portionMeasure = function (amountGiven, amountRecomended) {
  // console.log(amountGiven, amountRecomended);
  const inRange =
    amountGiven > amountRecomended * 0.9 &&
    amountGiven < amountRecomended * 1.1;
  let result;
  if (inRange && amountGiven !== amountRecomended) {
    result = 'ok';
  } else if (!inRange && amountGiven > amountRecomended) {
    result = 'to much';
  } else if (amountGiven === amountRecomended) {
    result = 'same amount';
  } else {
    result = 'to little';
  }
  return result;
};

const saraDog = dogs.find(el => el.owners.some(el => el === 'Sarah'));
const { curFood, recomendedFood } = saraDog;
portionMeasure(curFood, recomendedFood);

// ({ a: a1, b: b1 } = obj);

// 3.
const ownersEatTooMuch = dogs.filter(
  el => portionMeasure(el.curFood, el.recomendedFood) === 'to much'
);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs.filter(
  el => portionMeasure(el.curFood, el.recomendedFood) === 'to little'
);
console.log(ownersEatTooLittle);

//4

const ownersMessage = function (arr, amount) {
  return (
    arr
      .reduce((acc, el) => acc.concat(el.owners), [])
      .toString()
      .replaceAll(',', ' and ') +
    ` dogs eat too ${amount === 'much' ? 'much' : 'little'}`
  );
};
console.log(ownersMessage(ownersEatTooMuch, 'much'));
console.log(ownersMessage(ownersEatTooLittle, 'little'));

//5
console.log(
  dogs.some(el => {
    return portionMeasure(el.curFood, el.recomendedFood) == 'ok';
  })
);

//7

console.log(
  dogs.filter(el => portionMeasure(el.curFood, el.recomendedFood) === 'ok')
);

//8

const shallowCopy = [...dogs];
console.log(shallowCopy.sort((a, b) => a.recomendedFood - b.recomendedFood));


const randomDice = Array.from({ length: 100 }, (_, i) =>
  Math.round(Math.random() * 100)
);
console.log(randomDice);

labelBalance.addEventListener('click', () => {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '')
  );

  console.log(movementUI);
});

                             DONE                                */
