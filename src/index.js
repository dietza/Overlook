// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

import User from './User'


let usernameInput = document.querySelector('#username-input');
let userPasswordInput = document.querySelector('#user-password-input');
let loginSubmitButton = document.querySelector('.login-submit-button');

let userData;

loginSubmitButton.addEventListener('click', verifyLoginInputs);

function verifyLoginInputs() {
  if(!usernameInput.value) {
    alert('Please input a valid username! (ex: customer[ user ID 1-50 ])')
  } else if (userPasswordInput.value !== 'overlook2020') {
    alert('Please input a valid passoword!')
  } else if (usernameInput.value.length > 6 && userPasswordInput.value === 'overlook2020') {
    submitFetch();
  };
};


function submitFetch() {

  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(data => makeUsers(data))
    .then(users => console.log('users:', users))
}

function makeUsers(data) {

  return data.users.map(userInfo => {
    return new User(userInfo);
  })

}


// SUBMIT FETCH REQUEST to get data from the API
// Instatiate the correct type of USER,
// DISPLAY the correct dashboard,
//

//
