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
let availabilitySection;
let returnedAvailableRooms;
let bookingSubmitButton;
let returnToLoginButton;

let usersData = fetchApi.fetchUsersData();
let roomsData = fetchApi.fetchRoomsData();
let bookingsData = fetchApi.fetchBookingsData();

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
    clearInputs();
    displayManagerDashboard();
  } else if (usernameInput.value.includes('customer')) {
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
  let user = JSON.parse(storedGuest);
  let currentGuest = guests.find(guest => {
    return guest.id === user.id
  });
  return currentGuest;
};

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
  availabilitySection = document.querySelector('.room-availability-section');
};

function findAvailableRooms(event) {
  let currentGuest = getCurrentGuest();

  console.log('currentGuest: ', currentGuest);

  let selectedDate = event.target.value;
  storeSelectedDate(selectedDate);

  console.log('selectedDate: ', selectedDate);

  let availableRooms = currentGuest.searchAvailability(selectedDate, allRooms, guestBookings);

  console.log('availableRooms: ', availableRooms);

  displayAvailableRooms(selectedDate, availableRooms);
  if (availableRooms.length > 0) {
    return availableRooms;
  } else {
    alert('Sorry, there are no rooms available that day!')
  }
};

function storeSelectedDate(selectedDate) {
  let date = JSON.stringify(selectedDate);
  localStorage.setItem('storedDate', date);
};

function getSelectedDate() {
  let storedDate = localStorage.getItem('storedDate');
  console.log('storedDate', storedDate);

  let selectedDate = JSON.parse(storedDate);

  console.log('selectedDate', selectedDate);

  return selectedDate;
};

function displayAvailableRooms(selectedDate, availableRooms) {
  let formattedList = availableRooms.map(room => {
    if ((availableRooms.includes(room)) && (room !== undefined)) {
      return `<li class="available-rooms-listItem">| Room: ${room.number}     | ${room.roomType}        | $${room.costPerNight.toFixed(2)}</li></br>`
    };
  }).join('');
  let availabilityDisplay =
    `<p>Rooms Available ${selectedDate} :
    <ul class="rooms-available-list">
    ${formattedList}
    </ul>
    </p>`
  setGuestBookingElements(availabilityDisplay);
};

function setGuestBookingElements(availabilityDisplay) {
  availabilitySection.insertAdjacentHTML('beforeend', availabilityDisplay);
  returnedAvailableRooms = document.querySelectorAll('.available-rooms-listItem');
  returnedAvailableRooms.forEach(availableRoomItem => {

    console.log('availableRoomItem', availableRoomItem);

    availableRoomItem.addEventListener('click', selectRoomToBook);
  });
};

function selectRoomToBook(event) {
  let splitSelection = event.target.innerText.split(" ")
  let roomNum = parseInt(splitSelection[2]);
  let selectedRoom = allRooms.find(room => {
    return room.number === roomNum;
  });
  console.log('selectedRoom', selectedRoom);

  storeSelectedRoom(selectedRoom);
};

function storeSelectedRoom(selectedRoom) {
  let room = JSON.stringify(selectedRoom);
  localStorage.setItem('storedRoom', room);
};

function getSelectedRoom() {
  let storedRoom = localStorage.getItem('storedRoom');
  let selectedRoom = JSON.parse(storedRoom);
  return selectedRoom;
};

function submitBooking() {
  let bookingId = 1605129716000;
  let selectedDate = getSelectedDate();
  let selectedRoom = getSelectedRoom();
  let currentGuest = getCurrentGuest();
  let newBooking = currentGuest.bookRoom(selectedDate, bookingsData, allRooms, selectedRoom, bookingId);

  console.log('newBooking: ', newBooking);

  fetchApi.postNewBooking(newBooking);
  alert("Thank you for booking with us!")
};

function returnToLogin() {
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
