'use stict';
const bmi = function (height, mass) {
  return mass / Math.pow(height, 2);
};
const Mark = {
  mass: 78,
  height: 1.69,
};
const John = {
  mass: 92,
  height: 1.95,
};

const markHigherBMI =
  Math.round(bmi(Mark.height, Mark.mass)) >
  Math.round(bmi(John.height, John.mass));
console.log(markHigherBMI);
///////////////////////////challenge 3/////////

const averageNum = (...args) =>
  args.reduce((acc, el) => (acc += el), 0) / args.length;

function checkWinner(teamA, teamB) {
  if (teamA <= 2 * teamB) {
    console.log('Team B wins');
  } else if (teamA >= 2 * teamB) {
    console.log('Team A wins');
  } else {
    console.log('equal');
  }
}

/*
TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
*/
const dolf = averageNum(85, 54, 41);
const koal = averageNum(23, 34, 27);
checkWinner(dolf, koal);

const tipCalculator = function (cost) {
  const inRange = cost < 300 && cost > 50;
  let tip = inRange ? cost * 0.15 : cost * 0.2;
  console.log(
    `The bill was ${cost}, the tip was ${tip}, and the total value ${
      cost + tip
    }`
  );
  return cost + tip;
};

let result = [];

const price = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
for (let i = 0; i < price.length; i++) {
  result.push(tipCalculator(price[i]));
}
console.log(result);

console.log([275, 40, 430].reduce((acc, el) => acc + tipCalculator(el), 0));

////////////////////////////////////////////////////////////

class Person {
  constructor(name, weight, height) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.bmi = this.calcBMI(this.height, this.weight);
  }
  calcBMI(height, mass) {
    return Math.round(mass / Math.pow(height, 2));
  }
}

const mark = new Person('Mark Miller', 78, 1.69);
const john = new Person('John Smith', 92, 1.95);
const higherBMI = mark.bmi > john.bmi ? mark : john;
function bmiLevels(...args) {
  return args.sort((a, b) => a.bmi - b.bmi).reverse();
}
const bmiRange = bmiLevels(mark, john);
const message = `${bmiRange[0].name} BMI (${bmiRange[0].bmi}) is higher than ${bmiRange[1].name} BMI (${bmiRange[1].bmi})!`;
console.log(message);

//////////////////////////////////////////////////////////////////////////////
