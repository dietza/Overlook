// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/errorX.png'

console.log('This is the JavaScript entry file - your code begins here.');

import User from './User'
import Manager from './Manager'

// import {usernameInput, userPasswordInput} from './dom-data'
import {fetchApi} from './Fetch-API';
import {domDisplay} from './DOM-display';

let mainDisplay = document.querySelector('.main-display');
let loginSubmitButton = document.querySelector('#login-submit-button');
let returnToLoginButton;

let usernameInput = document.querySelector('#username-input');
let userPasswordInput = document.querySelector('#user-password-input');

let usersData = fetchApi.fetchUsersData();
console.log('usersData: ', usersData)
let roomsData = fetchApi.fetchRoomsData();
let bookingsData = fetchApi.fetchBookingsData();
console.log('bookingsData: ', bookingsData);

let guests;
let currentGuest;
let manager;
let userID;
let userBookings;
let billing;
let allRooms;
let today;

Promise.all([usersData, roomsData, bookingsData])
  .then(values => {
    guests = makeUsers(values[0]);

    userBookings = bookingsData;
    console.log('userBookings: ', userBookings);

    // findUserBookings(values[2]);

/// May not want these to be FOR EACH & on load - consider more dynamic (user == guest || manager)
    allRooms = roomsData;
    console.log('allRooms: ', allRooms);

    //findUserTotalSpent(values[1]);

});

function makeUsers(usersData) {
  return usersData.map(userInfo => {
    return new User(userInfo);
  })
};

// function findUserBookings(bookingsData) {
//   guests.forEach(user => {
//     user.viewBookings(bookingsData);
//     console.log('user.bookings: ', user.bookings);
//   });
// };

// function findUserTotalSpent(roomsData) {
//   guests.forEach(user => {
//     user.caluculateTotalSpent(roomsData);
//     console.log('user.totalSpent: ', user.totalSpent);
//   });
// };

usernameInput.addEventListener('click', clearErrors);
userPasswordInput.addEventListener('click', clearErrors);
loginSubmitButton.addEventListener('click', verifyLoginInputs);

function getToday() {
  let today = (new Date()).toLocaleDateString('en-GB');
  console.log('today: ', today)
  return today;
};

function verifyLoginInputs() {
  if(!usernameInput.value.includes('manager') && !usernameInput.value.includes('customer')) {
    showUsernameError();
    clearInputs();
  } else if (userPasswordInput.value !== 'overlook2020') {
      showPasswordError();
      clearInputs();
  } else if (usernameInput.value.includes('manager')) {
      console.log('verifyLoginInputs:', 'manager');
      clearInputs();
      displayManagerDashboard();
  } else if (usernameInput.value.includes('customer')) {
      console.log('verifyLoginInputs:', 'customer');
      establishUser();
      clearInputs();
  };
};

// IF Manager loging in - just display page, no FETCH
// IF Guest logging in - FETCH data to instantiate USER/guest and display page

function displayManagerDashboard() {
  mainDisplay.innerHTML = '';
  let today = getToday();
  let manager = new Manager(today, guests);
  let managerDashboard = domDisplay.buildManagerDashboard(today, manager);
  mainDisplay.insertAdjacentHTML('beforeend', managerDashboard);
  returnToLoginButton = document.querySelector('#return-to-login-button');
  returnToLoginButton.addEventListener('click', returnToLogin);
};

function establishUser() {
  let splitInput = usernameInput.value.split('');
  let userID = parseInt(splitInput[8]+splitInput[9]);
  let currentGuest = guests.find(user => {
    return user.id === userID
  })
  console.log('establishUser//currentGuest:', currentGuest);
  defineUserInfo(currentGuest);
  displayGuestDashboard(allRooms, currentGuest);
};

function defineUserInfo(currentGuest) {
  console.log('defineUserInfo//currentGuest:', currentGuest);

  findUserBookings(userBookings, currentGuest);
  findUserTotalSpent(allRooms, currentGuest);
}

function findUserBookings(bookingsData, user) {
  // guests.forEach(user => {
    console.log('user.bookings: ', user.bookings);
    let bookings = user.viewBookings(bookingsData);
    console.log('user.bookings: ', user.bookings);
    return bookings;
  // });
};

function findUserTotalSpent(roomsData, user) {
  // guests.forEach(user => {
    console.log('user.totalSpent: ', user.totalSpent);
    let totalBilled = user.caluculateTotalSpent(roomsData);
    console.log('user.totalSpent: ', user.totalSpent);
    return totalBilled;
  // });
};

function displayGuestDashboard(roomsData, currentGuest) {
  mainDisplay.innerHTML = '';
  let today = getToday();
  let guestDashboard = domDisplay.buildGuestDashboard(today, roomsData, currentGuest);
  mainDisplay.insertAdjacentHTML('beforeend', guestDashboard);
  returnToLoginButton = document.querySelector('#return-to-login-button');
  returnToLoginButton.addEventListener('click', returnToLogin);
};

function returnToLogin() {
  console.log('returnToLogin: ', 'called');
  mainDisplay.innerHTML = '';
  let loginDisplay = domDisplay.showLoginDisplay();
  mainDisplay.insertAdjacentHTML('beforeend', loginDisplay);
  usernameInput = document.querySelector('#username-input');
  userPasswordInput = document.querySelector('#user-password-input');
  loginSubmitButton = document.querySelector('#login-submit-button');
  usernameInput.addEventListener('click', clearErrors);
  userPasswordInput.addEventListener('click', clearErrors);
  loginSubmitButton.addEventListener('click', verifyLoginInputs);
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
