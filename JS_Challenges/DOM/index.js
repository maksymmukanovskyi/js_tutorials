'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Actions (Button scrolling)

btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  const s1cords = section1.getBoundingClientRect();
  //Scrolling
  /*
  window.scrollTo({
    lefr: s1cords.left + window.pageXOffset,
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth',
  });
 */
  section1.scrollIntoView({ behavior: 'smooth' });
});

//              Page navigation

/*document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    console.log(id);
  });
});
*/

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///               TABS

//active tabs
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clickedEl = e.target.closest('.operations__tab');
  if (!clickedEl) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clickedEl.classList.add('operations__tab--active');
  console.log(clickedEl);

  //active content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clickedEl.dataset.tab}`)
    .classList.add('operations__content--active');
});

// hover on select tabs
const handleHover = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
//Reveal section  / / / / / //    / / //  / / /   / / / / /
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
  // rootMargin: `-${50}px`,
});

allSection.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

////      Lazy Loading Images

const imageTargets = document.querySelectorAll('img[data-src]');

const loadingImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  console.log(entry.target.classList);

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0.1,
  rootMargin: '200px',
});

imageTargets.forEach(img => imageObserver.observe(img));

//                                                SLIDER                        /////////////

// Slides
const slider = function () {
  const dotsContainer = document.querySelector('.dots');
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const createDots = function () {
    slides.forEach((_, i) =>
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      )
    );
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(d => {
      d.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  let currentSlide = 0;

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //keyboard pagination

  document.addEventListener('keydown', keyPressHandler);

  function keyPressHandler(e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  }

  // Dots slider

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

/*

CHALLANGES///////////////////// / / / / / //  


const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColour = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColour());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(this);
  this.style.backgroundColor = randomColour();
});*/
