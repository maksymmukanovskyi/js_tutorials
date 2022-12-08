console.log('Exporting module');

export const cart = [];

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the card!`);
}
