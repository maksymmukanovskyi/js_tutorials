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

const averageNum = function (...args) {
  return args.reduce((acc, el) => (acc += el), 0) / args.length;
};

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
