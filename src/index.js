// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/errorX.png'

console.log('This is the JavaScript entry file - your code begins here.');

import User from './User'

import {usernameInput, userPasswordInput} from './dom-data.js'
import {fetchApi} from './Fetch-API';

// let usernameInput = document.querySelector('#username-input');
// let userPasswordInput = document.querySelector('#user-password-input');
let loginSubmitButton = document.querySelector('#login-submit-button');

let usersData = fetchApi.fetchUsersData();
console.log('usersData: ', usersData)
let roomsData = fetchApi.fetchRoomsData();
let bookingsData = fetchApi.fetchBookingsData();
let guests;
let userID;

Promise.all([usersData, roomsData, bookingsData])
  .then(values => {
    guests = makeUsers(values[0]);
  })

usernameInput.addEventListener('click', clearErrors);
userPasswordInput.addEventListener('click', clearErrors);
loginSubmitButton.addEventListener('click', verifyLoginInputs);

function verifyLoginInputs() {
  if(!usernameInput.value.includes('manager' || 'customer')) {
    showUsernameError();
    clearInputs();
  } else if (userPasswordInput.value !== 'overlook2020') {
      showPasswordError();
      clearInputs();
  } else if (usernameInput.value.includes('manager')
    && userPasswordInput.value === 'overlook2020') {
      console.log('verifyLoginInputs:', 'manager');
      clearInputs();
  } else if (usernameInput.value.includes('customer')
    && userPasswordInput.value === 'overlook2020') {
      console.log('verifyLoginInputs:', 'customer');
      clearInputs();
  };
};

// IF Manager loging in - just display page, no FETCH
// IF Guest logging in - FETCH data to instantiate USER/guest and display page

function makeUsers(usersData) {
  return usersData.map(userInfo => {
    return new User(userInfo);
  })
};

function showUsernameError() {
  let usernameError =
  `<section class='error-message'>
      <img src='./images/errorX.png' class='error-icon'>
      <p class='username-error'>Are you a guest? Please enter a valid username.</p>
      <p class='username-error'>customer[your user ID number]</p>
    </section>`;
  usernameInput.insertAdjacentHTML('afterend', usernameError);
};

function showPasswordError() {
  let userpasswordError =
  `<section class='error-message'>
      <img src='./images/errorX.png' class='error-icon'>
      <p class='password-error'>Please enter a valid password to login.</p>
    </section>`;
  userPasswordInput.insertAdjacentHTML('afterend', userpasswordError);
};

function clearInputs() {
  usernameInput.value = '';
  userPasswordInput.value = '';
};

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(error => {
    error.innerHTML = ''
  })
};
