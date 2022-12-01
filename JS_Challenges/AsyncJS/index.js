'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.nativeName}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} m. people</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[0].nativeName
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].code
            }</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
      <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.nativeName}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} m. people</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[0].nativeName
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].code
            }</p>
          </div>
        </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

*/

/*
const getCountryAndNeighbor = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // render country
    renderCountry(data);

    //get neighbour country

    const neighbourCountry = data.borders?.[0];

    if (!neighbourCountry) return;
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v2/alpha/${neighbourCountry}`
    );
    request2.send();
    request2.addEventListener('load', function () {
      const data = JSON.parse(this.responseText);
      console.log(data);
      renderCountry(data, 'neighbour');
    });
  });
};

getCountryAndNeighbor('ukraine');
*/

// btn.addEventListener('click', getCountryData.bind(getCountryData, 'ukraine'));

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474





const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(resp => {
      renderCountry(resp[0]);

      const neighbour = resp[0].borders ? resp[0].borders[0] : false;

      if (!neighbour) throw new Error('No neighbour found');

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      renderError(error.message);
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => (countriesContainer.style.opacity = 1), 10000);
    });
};



const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(data => {
      if (!data.ok) throw new Error(`No location found ${data.status}`);
      return data.json();
    })
    .then(data => {
      console.log(data);

      getCountryData(data.country);
    })
    .catch(err => console.log(err.message));
};

btn.addEventListener('click', whereAmI.bind(whereAmI, -33.933, 18.474));
*/

/*console.log('test start');
setTimeout(() => console.log('0 seconds timer'), 0);
Promise.resolve('Resolved prommise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000000; i++) {}
  console.log(res);
});
console.log('test end');
*/

/*const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Lottery draw is heppening...');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win 💰');
    } else {
      reject(new Error('You have loose 💩'));
    }
  }, 2000);
});

lotteryPromise.then(resp => console.log(resp)).catch(err => console.error(err));*/
/*
const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error(`${errMsg} ${resp.status}`);
    return resp.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(resp => {
      renderCountry(resp[0]);

      const neighbour = resp[0].borders ? resp[0].borders[0] : false;

      if (!neighbour) throw new Error('No neighbour found');

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      renderError(error.message);
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => (countriesContainer.style.opacity = 1), 10000);
    });
};
*/

const getPostion = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
/*
const whereAmI = function () {
  getPostion()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })

    .then(data => {
      if (!data.ok) throw new Error(`No location found ${data.status}`);
      return data.json();
    })
    .then(data => {
      console.log(data);

      getCountryData(data.country);
    })
    .catch(err => console.log(err.message));
};*/

const myLocation = async function () {
  try {
    const position = await getPostion();

    const { latitude: lat, longitude: lng } = position.coords;

    const geoResp = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    console.log(geoResp);
    if (!geoResp.ok) throw new Error('Problem getting location data');
    const geoData = await geoResp.json();

    //country data

    const resp = await fetch(
      `https://restcountries.com/v2/name/${geoData.country}`
    );
    if (!resp.ok) throw new Error('Problem getting country data');

    const dataResp = await resp.json();

    //render country
    renderCountry(dataResp[0]);
    return `You are in ${geoData.city}, ${geoData.country}`;
  } catch (err) {
    console.log(err);
    renderError(err);
    //rethrow the error

    throw err;
  }
};

// btn.addEventListener('click', whereAmI);
// btn.addEventListener('click', myLocation);
// console.log('1: Will getting location');
// myLocation()
//   .then(data => console.log(data))
//   .catch(err => console.error(`2: ${err}`))
//   .finally(() => console.log('3: Location uploading finished'));

/*(async function () {
  try {
    const location = await myLocation();
    console.log(location);
  } catch (err) {
    console.error(`2: ${err}`);
  } finally {
    console.log('3: Location uploading finished');
  }
})();
*/

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.
PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.setAttribute('src', imgPath);

    image.addEventListener('load', function () {
      imgContainer.append(image);
      resolve(image);
    });
    image.addEventListener('error', () => {
      reject(new Error('upsi dypsi'));
    });
  });
};
let currentImg;

createImage('img/img-1.jpg')
  .then(resp => {
    currentImg = resp;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(resp => {
    currentImg = resp;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.log(err));
*/

//                      /////////// runing promises in paralel

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error(`${errMsg} ${resp.status}`);
    return resp.json();
  });
};

const getThreeCountries = async function (c1, c2, c3) {
  try {
    const data = await Promise.any([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data);

    data.map(c => console.log(c[0].capital));
  } catch (err) {
    console.log(err.message);
  }
};

getThreeCountries('ukraine', 'canada', 'usa');

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('request took to long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/canada`),
  timeout(1),
]).then(data => console.log(data[0]));

Promise.any([
  Promise.resolve('Succes'),
  Promise.reject('Ups Error'),
  Promise.resolve('Succes second'),
])
  .then(resp => console.log(resp))
  .catch(err => console.log(err));

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).
TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
GOOD LUCK 😀
*/
