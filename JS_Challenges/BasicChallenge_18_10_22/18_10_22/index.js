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
//////////////// Next challenge/////////////////////
