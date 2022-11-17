'use strict';
/*
const pavel = new Person('Pavel', 35, 'pavel@hotmail.com');

function Person(name, age, email) {
  this.name = name;
  this.age = age;
  this.email = email;
}

Person.prototype.printData = function () {
  console.log(this);
  console.log(
    `My name is ${this.name}, I'm ${this.age} years old, my email: ${this.email}`
  );
};

pavel.printData();
console.log(pavel);

console.log([].__proto__.__proto__);

/
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 
DATA CAR 2: 
GOOD LUCK 😀



function Car(make, speed) {
  this.make = make;
  this.speed = +speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car(...filterString(str1));
const mercedes = new Car(...filterString(str2));

console.log(bmw, mercedes);
mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
mercedes.brake();

const maxProto = {
  sayHI() {
    console.log(this);
  },
  init(name, birthYear) {
    this.name = name;
    this.year = birthYear;
  },
};

const alex = Object.create(maxProto);
alex.init('Alll', 50);
alex.sayHI();
*/

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/

const str1 = 'BMW going at 120 km/h';
const str2 = 'Mercedes going at 95 km/h';

const filterString = function (str) {
  const result = str.split(' ');
  return result.filter(
    el =>
      el.includes('B') ||
      el.includes('1') ||
      el.includes('M') ||
      el.includes('9')
  );
};

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = +speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }
  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    console.log(`${this.speed / 1.6} km/h`);
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
    console.log(this.speed);
  }
}

const bmw = new Car(...filterString(str1));
const mercedes = new Car(...filterString(str2));
bmw.speedUS = 65;
bmw.speedUS;
