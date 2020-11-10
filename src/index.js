// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/errorX.png'

console.log('This is the JavaScript entry file - your code begins here.');

import User from './User'
import Manager from './Manager'

import {usernameInput, userPasswordInput} from './dom-data'
import {fetchApi} from './Fetch-API';
import {domDisplay} from './DOM-display';


let mainDisplay = document.querySelector('.main-display');
let loginSubmitButton = document.querySelector('#login-submit-button');

let usersData = fetchApi.fetchUsersData();
console.log('usersData: ', usersData)
let roomsData = fetchApi.fetchRoomsData();
let bookingsData = fetchApi.fetchBookingsData();
let guests;
let currentGuest;
let manager;
let userID;
let today;

Promise.all([usersData, roomsData, bookingsData])
  .then(values => {
    guests = makeUsers(values[0])
});

function makeUsers(usersData) {
  return usersData.map(userInfo => {
    return new User(userInfo);
  })
};

usernameInput.addEventListener('click', clearErrors);
userPasswordInput.addEventListener('click', clearErrors);
loginSubmitButton.addEventListener('click', verifyLoginInputs);

function getToday() {
  let today = (new Date()).toLocaleDateString('en-GB');
  console.log('today: ', today)
  return today;
}

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
      clearInputs();
      verifyUser();
  };
};

// IF Manager loging in - just display page, no FETCH
// IF Guest logging in - FETCH data to instantiate USER/guest and display page

function displayManagerDashboard() {
  mainDisplay.innerHTML = '';
  let today = getToday();
  let manager = new Manager(today);
  let managerDashboard = domDisplay.buildManagerDashboard(today, manager);
  mainDisplay.insertAdjacentHTML('beforeend', managerDashboard);
}

function verifyUser() {
  let userID = usernameInput.value.split('', 8);
  console.log('userID:', userID);

  let currentGuest = guests.find(user => {
    return user.id === userID
  })

  displayGuestDashboard(currentGuest);
}

function displayGuestDashboard(currentGuest) {
  mainDisplay.innerHTML = '';
  let today = getToday();
  let guestDashboard = domDisplay.buildGuestDashboard(today, currentGuest);
      // `<section class="guest-dashboard">
      //   <form class="guest-display" role="display-info-for-guest">
      //     <div class="guest-welcome">
      //       <p>Welcome,</p>
      //       <h2>${user.name}!</h2>
      //     </div>
      //     <div>
      //       <section class="guest-bookings">
      //         <p>My Bookings: ${user.bookings}</p>
      //       </section>
      //     </div>
      //     <div>
      //       <section class="total-spent">
      //         <p>Total billed: ${user.totalSpent}</p>
      //       </section>
      //     </div>
      //     </form>
      //   </section>`

  mainDisplay.insertAdjacentHTML('beforeend', guestDashboard);
}

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
