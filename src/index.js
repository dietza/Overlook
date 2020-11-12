// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/errorX.png'

import User from './User'
import Manager from './Manager'

import {fetchApi} from './Fetch-API';
import {domDisplay} from './DOM-display';

let mainDisplay = document.querySelector('.main-display');
let usernameInput = document.querySelector('#username-input');
let userPasswordInput = document.querySelector('#user-password-input');
let loginSubmitButton = document.querySelector('#login-submit-button');
let dateInput;
let bookingSubmitButton;
let returnToLoginButton;

let usersData = fetchApi.fetchUsersData();
console.log('usersData: ', usersData)
let roomsData = fetchApi.fetchRoomsData();
let bookingsData = fetchApi.fetchBookingsData();
console.log('bookingsData: ', bookingsData);

let guests;
let guestBookings;
let allRooms;
let currentGuest;
let userID;
let manager;
let today;

Promise.all([usersData, roomsData, bookingsData])
  .then(values => {

    today = getToday();

    guestBookings = bookingsData;
    console.log('guestBookings: ', guestBookings);

    allRooms = roomsData;
    console.log('allRooms: ', allRooms);

    guests = makeUsers(values[0]);

});

function makeUsers(usersData) {
  return usersData.map(userInfo => {
    return new User(today, allRooms, guestBookings, userInfo);
  })
};

usernameInput.addEventListener('click', clearErrors);
userPasswordInput.addEventListener('click', clearErrors);
loginSubmitButton.addEventListener('click', verifyLoginInputs);

function getToday() {
  let today = (new Date()).toLocaleDateString('en-GB');
  console.log('today: ', today)
  return today;
};

function getRandomBookingId(min, max) {
    return Math.random() * (max - min) + min;
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

function displayManagerDashboard() {
  mainDisplay.innerHTML = '';
  let manager = new Manager(today, allRooms, guestBookings, guests);
  let managerDashboard = domDisplay.buildManagerDashboard(today, roomsData, manager);
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
  defineUserInfo(currentGuest);
  storeCurrentGuest(currentGuest);
  displayGuestDashboard(allRooms, currentGuest);
};

function storeCurrentGuest(currentGuest) {
  let guest = JSON.stringify(currentGuest);
  localStorage.setItem('storedGuest', guest);
};

function getCurrentGuest() {
  let storedGuest = localStorage.getItem('storedGuest');
  let currentGuest = JSON.parse(storedGuest);
  return currentGuest;
}

function defineUserInfo(currentGuest) {
  console.log('defineUserInfo//currentGuest:', currentGuest);

  findGuestBookings(guestBookings, currentGuest);
  findUserTotalSpent(allRooms, currentGuest);
};

function findGuestBookings(bookingsData, user) {
    let bookings = user.viewBookings(bookingsData);
    return bookings;
};

function findUserTotalSpent(roomsData, user) {
    let totalBilled = user.caluculateTotalSpent(roomsData);
    return totalBilled;
};

function displayGuestDashboard(roomsData, currentGuest) {
  mainDisplay.innerHTML = '';
  let guestDashboard = domDisplay.buildGuestDashboard(today, roomsData, currentGuest);
  mainDisplay.insertAdjacentHTML('beforeend', guestDashboard);
  setGuestDashboardElements();
};

function setGuestDashboardElements() {
  returnToLoginButton = document.querySelector('#return-to-login-button');
  returnToLoginButton.addEventListener('click', returnToLogin);
  dateInput = document.querySelector('#date-input');
  dateInput.addEventListener('change', findAvailableRooms);
  bookingSubmitButton = document.querySelector('#booking-submit-button');
  bookingSubmitButton.addEventListener('click', submitBooking);
};

function findAvailableRooms(event) {

  let currentGuest = getCurrentGuest();

  console.log('currentGuest: ', currentGuest);

  let selectedDate = event.target.value;

  console.log('selectedDate: ', selectedDate);

  let availableRooms = currentGuest.searchAvailability(selectedDate, allRooms, guestBookings);

  console.log('availableRooms: ', availableRooms);

  if (availableRooms.length > 0) {
    return availableRooms;
  } else {
    alert('Sorry, there are no rooms available that day!')
  }
};

function submitBooking(selectedDate, availableRooms, bookingsData, selectedRoom) {
  let bookingId = getRandomBookingId(7777744444333, 888844444333);
  let newBooking = currentUser.bookRoom(selectedDate, availableRooms, bookingsData, selectedRoom, bookingId);
  fetchApi.postNewBooking(newBooking, user);
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
  let usernameError = domDisplay.showUsernameError();
  usernameInput.insertAdjacentHTML('afterend', usernameError);
};

function showPasswordError() {
  let userpasswordError = domDisplay.showPasswordError();
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
