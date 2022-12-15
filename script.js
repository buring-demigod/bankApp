'use strict';

///////////////////////////////////////
// Modal window


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////////////////////////////////

////////////  page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behaviour: 'smooth ' });
//   })
// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behaviour: 'smooth ' });
  }
})

////tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabcontent = document.querySelectorAll('.operations__content');
const section1 = document.querySelector('#section--1');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabcontent.forEach(e => e.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

///////////////// menu fade animation

const handleHover = function (e) {

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

////sticky navigation

// const initialcoords = section1.getBoundingClientRect();
// console.log(initialcoords);
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (this.window.scrollY > initialcoords.top) {
//     nav.classList.add('sticky')

//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })

////////////////////better method/////////////

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// };

// const observer = new IntersectionObserver
//   (obsCallback, obsOptions);
// observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
  else {
    nav.classList.remove('sticky');
  }
}

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver
  (stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });
headerObserver.observe(header);

////////////// Revealing section
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionobserver = new IntersectionObserver
  (revealSection, {
    root: null,
    threshold: 0.15,
  });

allSections.forEach(function (section) {
  sectionobserver.observe(section);
  // section.classList.add('section--hidden');
})

///////////////////// Lazy loading Images

const imgTargets = document.querySelectorAll('img[data-src]');

/////call back f

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver
  (loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
  });

imgTargets.forEach(img => imgObserver.observe(img));

////////////////Slider Component

const sliderr = function () {
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');

  // slider.style.transform = 'scale(0.5)';

  const slides = document.querySelectorAll('.slide');
  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  createDots();

  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');

  }

  const gotoToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
  }


  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    }
    else {
      curSlide++;
    }
    gotoToSlide(curSlide);
    activateDots(curSlide);
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    }
    else {
      curSlide--;
    }
    gotoToSlide(curSlide);
    activateDots(curSlide);
  }

  const init = function () {

    gotoToSlide(0);
    activateDots(0);
  }

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoToSlide(slide);
      activateDots(slide);
    }
  })

}
sliderr();
///////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.querySelectorAll('.section'));

// const msg = document.createElement('div');
// msg.classList.add('cookie-message');
// msg.innerHTML = 'we use cookie to improve our services<button class="btn btn--close-cookie">got it</button>';
// const head = document.querySelector('.header')
// head.prepend(msg);
// head.append(msg)
// head.append(msg.cloneNode(true));
// head.after(msg);

// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
// msg.remove();

//   msg.parentElement.removeChild(msg);
// })

//styles

// msg.style.backgroundColor = '#37383d';
// msg.style.width = '120%'

// document.documentElement.style.setProperty('--color-primary', 'orangered');


// const logo = document.querySelector('.nav__logo');
// console.log(logo.classList);

// logo.alt = 'dscsdc';
// console.log(logo.alt);

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

// console.log(e.target.getBoundingClientRect());

// console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

// Scrolling
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// );

// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// const alerth1 = () => {
//   alert('jxjcj');


// }
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alerth1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alerth1)
// }, 3000);

// const randomint = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomcolor = () => `rgba(${randomint(0, 255)}, ${randomint(0, 255)}, ${randomint(0, 255)})`

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log('link', e.target, e.currentTarget);

// })
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log('container', e.target, e.currentTarget);
// })
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
//   console.log('nav', e.target, e.currentTarget);
// })

// const h1 = document.querySelector('h1'); 
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// h1.lastElementChild.style.color = 'white'

// console.log(h1.parentElement);
// h1.closest('h1').style.background = 'red';

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)'
//   }
// })



document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
})









