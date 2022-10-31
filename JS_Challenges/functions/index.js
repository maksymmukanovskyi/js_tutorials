'use strict'
/*console.log('hello world');

const greet = greet => name => console.log(`${greet} dear ${name}`);
  

greet('Hey')('Max!')

const taxRate = (rate, value) => value + value * rate;
console.log(taxRate(0.1, 200));


const addVAt = rate => value => value + value * rate;
const portugalVAT = addVAt(0.23);
console.log(portugalVAT(1000));*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer(){
    const userInp = +prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`);
    
    const answer = isNaN(userInp) || userInp > 3 ? alert('please type number form 0 to 3!'): userInp;

    this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');

  },

  displayResults(type = 'array'){
    if(type === 'array'){
      console.log(this.answers);
    }else if(type === 'string'){
      console.log(`Poll rsults are: ${this.answers.join(', ')}`);
    }
  }

};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({answers: [5, 2, 3]}, 'string');
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]});
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string');

let list;
{
  list = [25,24];
}
console.log(list);

let f;

const g = function(){
  const a = 23;
  f = function(){
    console.log(a*2);
  }
};









const h = function(){
  const b = 50;
  f = function(){
    console.log(b*2);
  }
};


h();
f();

g();
f();

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', () => header.style.color = 'blue');
})();

