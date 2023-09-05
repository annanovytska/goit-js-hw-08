import { save, load, remove } from './storage';
import throttle from 'lodash.throttle';

const contactFormEl = document.querySelector('.feedback-form');
contactFormEl.addEventListener(
  'input',
  throttle(onContactFormFieldElInput, 500)
);
contactFormEl.addEventListener('submit', onContactFormElSubmit);

let userData = {};

function onContactFormFieldElInput(event) {
  const name = event.target.name;
  const value = event.target.value;

  userData[name] = value;

  save('feedback-form-state', userData);
  //   localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

function fillContactFormFields() {
  const userDataLocalStorage = load('feedback-form-state');
  //   const userDataLocalStorage = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (userDataLocalStorage === undefined) {
    return;
  }

  for (const key in userDataLocalStorage) {
    if (userDataLocalStorage.hasOwnProperty(key)) {
      contactFormEl.elements[key].value = userDataLocalStorage[key];
    }
  }
  //   contactFormEl.elements.email.value = userDataLocalStorage.email;
  //   contactFormEl.elements.message.value = userDataLocalStorage.message;
  userData = userDataLocalStorage;
}
fillContactFormFields();

function onContactFormElSubmit(event) {
  event.preventDefault();
  event.target.reset();
  console.log(userData);
  remove('feedback-form-state');
  //   localStorage.removeItem('feedback-form-state');
  userData = {};
}

// ==================================ПРИКЛАД З ПРАКТИКИ==================================

// import { save, load, remove } from './storage';
// import throttle from 'lodash.throttle';

// const KEY_OF_LS = 'feedback-form-state';
// let userData = save(KEY_OF_LS) || {};

// const contactFormEl = document.querySelector('.feedback-form');
// contactFormEl.addEventListener('input', throttle(onContactFormElInput, 500));
// contactFormEl.addEventListener('submit', onContactFormElSubmit);

// function onContactFormElInput(event) {
//   const name = event.target.name;
//   const value = event.target.value;

//   userData[name] = value;

//   save(KEY_OF_LS, userData);
//   //   localStorage.setItem('feedback-form-state', JSON.stringify(userData));
// }

// function fillContactFormFields() {
//   //   if (userData === undefined) {
//   //     return;
//   //   }
//   for (const key of Object.keys(userData)) {
//     contactFormEl.elements[key].value = userData[key];
//   }
// }
// fillContactFormFields();

// function onContactFormElSubmit(event) {
//   event.preventDefault();
//   event.target.reset();
//   console.log(userData);
//   remove(KEY_OF_LS);
//   userData = {};
//   //   localStorage.removeItem('feedback-form-state');
// }
