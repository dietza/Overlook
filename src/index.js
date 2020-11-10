// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

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

loginSubmitButton.addEventListener('click', verifyLoginInputs);

function verifyLoginInputs() {
  if(!usernameInput.value) {
    alert('Please input a valid username! (ex: customer[ user ID 1-50 ])')
  } else if (userPasswordInput.value !== 'overlook2020') {
    throw new Error('BAD PASSWORD!');
  } else if (usernameInput.value.includes('manager')
    && userPasswordInput.value === 'overlook2020') {
      console.log('verifyLoginInputs:', 'manager')

  } else if (usernameInput.value.includes('customer')
    && userPasswordInput.value === 'overlook2020') {
      console.log('verifyLoginInputs:', 'customer')

  };
};

// IF Manager loging in - just display page, no FETCH
// IF Guest logging in - FETCH data to instantiate USER/guest and display page

// function fetchUserData() {
//   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
//     .then(response => response.json())
//     .then(data => userData = data)
//     // .then(data => makeUsers(data))
//     .catch(error => console.log(error.message));
// };
//
// function fetchBookingData() {
//   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
//     .then(response => response.json())
//     .then(data => bookingData = data)
//     .catch(error => console.log(error.message));
// };
//
// function fetchRoomData() {
//   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
//     .then(response => response.json())
//     .then(data => roomData = data)
//     .catch(error => console.log(error.message));
// };

function makeUsers(usersData) {
  return usersData.map(userInfo => {
    return new User(userInfo);
  })
};


// SUBMIT FETCH REQUEST to get data from the API
// Instatiate the correct type of USER,
// DISPLAY the correct dashboard,
//

//
