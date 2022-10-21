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
 let newArr = [];
 for(const [key, value] of Object.entries(game.odds)){
    newArr.push(value);
 }
 const average = Math.trunc(newArr.reduce((acc, el) => acc + el, 0)/newArr.length);

 console.log(average);