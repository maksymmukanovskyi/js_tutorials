'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/*const newArr = [];
  for(let i = 0; i<game.scored.length; i++){
    newArr.push(`Goal ${i+1}: ${game.scored[i]}`)
  };
  console.log(...newArr);
  */
/*let newArr = [];
 for(const [key, value] of Object.entries(game.odds)){
    newArr.push(value);
 }
 const average = Math.trunc(newArr.reduce((acc, el) => acc + el, 0)/newArr.length);

 console.log(average);*/

/* Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5*/

/*const message = [];
 for(const [key, value] of Object.entries(game.odds)){
    message.push(`Odd of victory ${game[key] ||= 'Draw'}: ${value}`);
 };
 console.log(...message);*/

/*const scores = game.scored.reduce((acc, el) => {
    let counter = 1;
    acc[el] = acc[el]? counter+1: 1;
    return acc;
 }, {});
 console.log(scores);*/

const [players1, players2] = game.players;

const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const printGoals = (...players) =>
  console.log(`${players.length} goals were scored!`);
printGoals(...game.scored);
console.log(gk);
console.log(fieldPlayers);

const {
  odds: { team1, x: draw, team2 },
} = game;

console.log(team1, draw, team2);

team1 > team2 && console.log('team2 is more likily to win');
team1 < team2 && console.log('team1 is more likily to win');

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = new Set(gameEvents.values());
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);
console.log(
  `An event happened, on average, every ${
    [...gameEvents][gameEvents.size - 1][0] / gameEvents.size
  } minutes`
);
console.log(gameEvents.keys());

for (const [key, value] of gameEvents) {
  const halfs = ['FIRST HALF', 'SECOND HALF'];
  const message =
    key < 45 ? `${halfs[0]} ${key}: ${value}` : `${halfs[1]} ${key}: ${value}`;

  console.log(message);
}

//////////////////Strings ////////////////////////////
const text = document.querySelector('input[type=text]');
const button = document.querySelector('input[type=SUBMIT]');

button.addEventListener('click', onClickBtn);
function onClickBtn(e) {
  e.preventDefault();
  const insertedText = text.value;
  const convertedText = insertedText
    .split(' ')
    .filter(el => el.length > 1)
    .map(el => el.toLowerCase())
    .map(el => el.split('_'))
    .reduce(
      (acc, el) => {
        const processed = acc.concat(
          el[0] + el[1].replace(el[1][0], el[1][0].toUpperCase())
        );

        return processed;
      },

      []
    );

  const result = [];
  let acc = '✅';

  for (let el of convertedText) {
    result.push(el.concat(' ', acc));
    acc += ' ✅';
  }
  console.log(...result);
  text.value = '';
}
///////////////////// String methods practice ////////////////////////

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const toUpperCode = str => str.slice(0, 3).toUpperCase();
for (const flightStr of flights.split('+')) {
  const [type, from, to, time] = flightStr.split(';');
  const displayedStr = `${
    type.startsWith('_Delayed') ? '🔴' : ''
  } ${type.replaceAll('_', ' ')} from ${toUpperCode(from)} to ${toUpperCode(
    to
  )} (${time.replace(':', 'h')})`.padStart(36);
  console.log(displayedStr);
}
