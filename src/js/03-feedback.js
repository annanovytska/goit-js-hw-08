import localStorageFunctions from './storage';
import throttle from 'lodash.throttle';

const contactFormEl = document.querySelector('.feedback-form');
contactFormEl.addEventListener(
  'input',
  throttle(onContactFormFieldElInput, 500)
);
contactFormEl.addEventListener('submit', onContactFormElSubmit);

let userData = {};

function fillContactFormFields() {
  const userDataLocalStorage = localStorageFunctions.load(
    'feedback-form-state'
  );
  //   const userDataLocalStorage = JSON.parse(
  //     localStorage.getItem('feedback-form-state')
  //   );
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
}
fillContactFormFields();

function onContactFormFieldElInput(event) {
  const name = event.target.name;
  const value = event.target.value;

  userData[name] = value;

  localStorageFunctions.save('feedback-form-state', userData);
  //   localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

function onContactFormElSubmit(event) {
  event.preventDefault();
  event.target.reset();
  localStorageFunctions.remove('feedback-form-state');
  //   localStorage.removeItem('feedback-form-state');
  console.log(userData);
}
