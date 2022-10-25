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
