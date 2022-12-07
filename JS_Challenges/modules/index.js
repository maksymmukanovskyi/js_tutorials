import addToCard, { cart } from './shoppingCard.js';
import cloneDeep from 'lodash';
console.log(cart);

console.log('importing module');
addToCard('Cabbage', 55);
addToCard('Apple', 554);
addToCard('Orange', 545);

console.log(cart);

const matt = {
  arr: [{ a: 1 }, { b: 2 }],
  ann: 23,
};

const newMatt = cloneDeep(matt);

console.log(newMatt);
