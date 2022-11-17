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

/*const str1 = 'BMW going at 120 km/h';
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
*/

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23 %
GOOD LUCK 😀
*/

const str1 = 'BMW going at 120 km/h';
const str2 = 'Mercedes going at 95 km/h';
const str3 = 'Tesla going at 120 km/h, with a charge of 23 %';

const filterString = function (str) {
  const result = str.split(' ');
  return result.filter(
    el =>
      el.includes('B') ||
      el.includes('1') ||
      el.includes('M') ||
      el.includes('9') ||
      el.includes('2') ||
      el.includes('T')
  );
};
//CAR Class
/*
function Car(make, speed) {
  this.make = make;
  this.speed = +speed;
}

Car.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};
*/
//EV Class
/*
function Ev(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = +charge;
}

Ev.prototype = Object.create(Car.prototype);
Ev.prototype.constructor = Ev;
Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const tesla = new Ev(...filterString(str3));

console.log(tesla);
tesla.accelerate();
console.log(tesla instanceof Car);
console.log(tesla instanceof Ev);
console.log(tesla instanceof Object);
tesla.brake();
console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();
console.log(tesla);
*/

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!
DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = +speed;
  }
  accelerate() {
    this.speed += 10;
    return this;
  }
  brake() {
    this.speed -= 5;
  }

  get speedUS() {
    console.log(`${this.speed / 1.6} km/h`);
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
    console.log(this.speed);
  }
}

class Ev extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = +charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  brake() {
    this.speed -= 50;
    console.log(this.speed);
    return this;
  }
}

const tesla = new Ev(...filterString(str3));
console.log(tesla);

tesla.accelerate().chargeBattery(50).brake();
console.log(tesla);
