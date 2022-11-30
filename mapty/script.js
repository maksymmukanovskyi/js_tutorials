'use strict';
const sidebar = document.querySelector('.sidebar');
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const submitEditBtn = document.querySelector('.submit__edit');

//                      Main App
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;
  underEdit = false;
  #idUnderEdit;

  constructor() {
    // get user position
    this._getPosition();

    // get data from local storage
    this.getLocalStorage();
    //attach event handlers
    form.addEventListener('keypress', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    containerWorkouts.addEventListener('click', this._editWorkout.bind(this));
    submitEditBtn.addEventListener('click', this._submitNewEdit.bind(this));
    containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
    sidebar.addEventListener('click', this._deleteAllWorkouts.bind(this));
    sidebar.addEventListener('change', this._sortList.bind(this));
  }
  //users current position
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert('Could not get your position');
      });
  }

  //users current mapview
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const cords = [latitude, longitude];
    console.log(this);
    this.#map = L.map('map').setView(cords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => this._removeWorkoutMarker(work));

    this._renderDeleteAllBtn(this.#workouts); ///////////////////////////////////
  }

  _showForm(mapEvt) {
    console.log(mapEvt);
    if (
      typeof mapEvt === 'object' &&
      mapEvt !== null &&
      !Array.isArray(mapEvt)
    ) {
      const coords = [mapEvt.latlng.lat, mapEvt.latlng.lng];
      this.#mapEvent = coords;
    } else {
      this.#mapEvent = mapEvt;
    }

    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //hide the form and cleaar inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    if (e.key !== 'Enter') return;
    console.log('kurva', e);

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();
    //get data from form
    const type = inputType.value;
    const duration = +inputDuration.value;
    const distance = +inputDistance.value;
    const [lat, lng] = this.#mapEvent;
    let workout;

    //if workout running create running obj
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //check if data is valid
      if (
        !validInputs(duration, distance, cadence) ||
        !allPositive(duration, distance, cadence)
      )
        return alert('input has to be a positive number!');
      workout = new Running(distance, duration, [lat, lng], cadence);
      //add new obj to workout array

      this.#workouts.push(workout);
    }

    //if workout cycling create cycling obj
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(duration, distance, elevation) ||
        !allPositive(duration, distance)
      )
        return alert('input has to be a positive number!');
      workout = new Cycling(distance, duration, [lat, lng], elevation);
      //add new obj to workout array

      this.#workouts.push(workout);
    }

    //render workout on map as marker
    this._renderWorkout(workout);
    if (this.#workouts.length === 2) this._renderDeleteAllBtn(this.#workouts); ///////////////////////////////////
    //render workout on the list

    //render narker

    this._renderWorkoutMarker(workout);

    //hide form

    this._hideForm();
    //set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    //display marker
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _removeWorkoutMarker(workout) {
    // this.#map.removeLayer(L.marker(workout.coords));
    // this.#map.remove(L.marker(workout.coords));
    // L.marker(workout.coords).remove();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <button class="edit">edit</button>
    <button class="delete">delete</button>

          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;

    if (workout.type === 'running')
      html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
    </li>`;
    if (workout.type === 'cycling')
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
    </li>`;
    form.insertAdjacentHTML('afterend', html);
  }

  _renderDeleteAllBtn(arr) {
    const html = `<button class="delete__all">delete all</button>`;
    const sortHtml = `
    <label class="filter__label">Sort workouts by:</label>

    <select class="filter__input" name="sort">
    <option value="">Sort Workouts by:</option>
      <option value="distance">distance</option>
      <option value="time">time</option>
    </select>`;
    let btn;

    if (arr.length >= 2) {
      btn = document.querySelector('.delete__all');
      containerWorkouts.insertAdjacentHTML('beforebegin', sortHtml);
      containerWorkouts.insertAdjacentHTML('afterend', html);
    }

    if (arr.length === 0 && btn) containerWorkouts.removeChild(btn);
  }

  removeDeleteBtn(arr) {
    const select = document.querySelector('.filter__input');
    const deleteAll = document.querySelector('.delete__all');

    if (arr.length <= 1 && deleteAll) {
      sidebar.removeChild(deleteAll);
      select.setAttribute('disabled', '');
    }
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workouts.find(el => el.id === workoutEl.dataset.id);
    console.log('creazy', workout.coords);
    this.#map.setView(workout.coords, this.#mapZoomLevel),
      {
        animate: true,
        pan: {
          duration: 10,
        },
      };
    // using the publick interface

    // workout.click();                                             ////////////
  }

  _editWorkout({ target }) {
    /////////////////////////
    if (target.className !== 'edit') return;
    const workoutEl = target.closest('.workout');
    this.#idUnderEdit = workoutEl.dataset.id;
    if (!this.underEdit) workoutEl.style.opacity = 0.5;
    this.underEdit = true;
    submitEditBtn.classList.remove('hidden');

    Array.from(containerWorkouts.querySelectorAll('.workout')).map(el => {
      if (el.dataset.id !== workoutEl.dataset.id) el.style.display = 'none';
    });

    const workout = this.#workouts.find(el => el.id === workoutEl.dataset.id);

    if (workout.type === 'running') {
      inputCadence.closest('.form__row').classList.remove('form__row--hidden');
      inputElevation.closest('.form__row').classList.add('form__row--hidden');

      inputType.value = workout.type;
      inputType.setAttribute('disabled', '');

      inputDistance.value = workout.distance;
      inputDuration.value = workout.duration;
      inputCadence.value = workout.cadence;
    } else if (workout.type === 'cycling') {
      inputElevation
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      inputCadence.closest('.form__row').classList.add('form__row--hidden');
      inputType.value = workout.type;
      inputType.setAttribute('disabled', '');
      inputDistance.value = workout.distance;
      inputDuration.value = workout.duration;
      inputElevation.value = workout.elevationGain;
    }

    this._showForm(workout.coords);
  }

  _submitNewEdit(e) {
    // e.stopPropagation();
    e.preventDefault();

    if (e.target.className !== 'submit__edit') return;

    // if (e.target.className !== submitEditBtn.className) return;

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    //get data from form
    const type = inputType.value;
    const duration = +inputDuration.value;
    const distance = +inputDistance.value;
    const [lat, lng] = this.#mapEvent;

    let workout;

    //if workout running create running obj
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //check if data is valid
      if (
        !validInputs(duration, distance, cadence) ||
        !allPositive(duration, distance, cadence)
      )
        return alert('input has to be a positive number!');

      // workout = new Running(distance, duration, [lat, lng], cadence);
      //add new obj to workout array

      this.#workouts = this.#workouts.map(workEl => {
        let workObj;
        if (workEl.id === this.#idUnderEdit) {
          workObj = {
            ...workEl,
            distance: distance,
            duration: duration,
            coords: [lat, lng],
            cadence: cadence,
            pace: duration / distance,
          };
        } else {
          workObj = workEl;
        }
        return workObj;
      });
    }

    //if workout cycling create cycling obj
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(duration, distance, elevation) ||
        !allPositive(duration, distance)
      )
        return alert('input has to be a positive number!');
      this.#workouts = this.#workouts.map(workEl => {
        let workObj;
        if (workEl.id === this.#idUnderEdit) {
          workObj = {
            ...workEl,
            distance: distance,
            duration: duration,
            coords: [lat, lng],
            elevationGain: elevation,
            pace: duration / distance,
            speed: distance / (duration / 60),
          };
        } else {
          workObj = workEl;
        }
        return workObj;
      });
    }

    this.updateListDOM();

    this.underEdit = false;

    this._hideForm();
    //set local storage to all workouts
    this._setLocalStorage();
  }

  updateListDOM() {
    const listToRemove = Array.from(document.querySelectorAll('.workout'));
    listToRemove.forEach(el => el.remove());
    this.#workouts.forEach(work => this._renderWorkout(work));
  }

  _sortList(e) {
    if (e.target.value === '') return;
    let type = e.target.value;

    if (type === 'distance') {
      this.#workouts = this.#workouts.sort(
        (work1, work2) => work1.distance - work2.distance
      );
    }

    if (type === 'time') {
      this.#workouts = this.#workouts.sort(
        (work1, work2) => work1.duration - work2.duration
      );
    }
    this.updateListDOM();
  }

  _deleteWorkout(e) {
    e.preventDefault();

    if (e.target.className !== 'delete') return;

    const workoutEl = e.target.closest('.workout');

    this.#workouts.map(work => {
      if (work.id === workoutEl.dataset.id) this._removeWorkoutMarker(work);
    });

    this.#workouts = this.#workouts.filter(
      el => el.id !== workoutEl.dataset.id
    );

    this.updateListDOM();
    this.removeDeleteBtn(this.#workouts);
    this._setLocalStorage();
  }

  _deleteAllWorkouts(e) {
    e.preventDefault();
    if (e.target.className !== 'delete__all') return;
    this.#workouts = [];
    this.reset();
    this.updateListDOM();
    this._renderDeleteAllBtn(this.#workouts);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => this._renderWorkout(work));
    console.log(data);
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

//                    Workout class
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.coords = coords; //[lat, lng]
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}
//                            Running subclass
class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

//                            Cycling subclass

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const app = new App();
// const run1 = new Running(5.2, 24, [39, -12], 178);
// const cycle1 = new Cycling(27, 95, [39, -12], 523);
// console.log(run1, cycle1);
