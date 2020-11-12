let fetchApi = {

  fetchUsersData() {
    let fetchedUsersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
      .then(response => response.json())
      .then(data => data.users)
      .catch(error => console.log(error.message));
    return fetchedUsersData;
  },

  fetchBookingsData() {
    let bookingsData = [];
    let fetchedBookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
      .then(response => response.json())
      .then(data => data.bookings)
      .then(fetched => fetched.forEach(booking => {
        bookingsData.push(booking);
      }))
      .catch(error => console.log(error.message));
    return bookingsData;
  },

  fetchRoomsData() {
    let roomsData = [];
    let fetchedRoomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
      .then(response => response.json())
      .then(data => data.rooms)
      .then(fetched => fetched.forEach(room => {
        roomsData.push(room);
      }))
      .catch(error => console.log(error.message));
    return roomsData;
  },

  postNewBooking() {
     let newBooking = fetchApi.createBooking();
     let postSleepData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
       method: 'POST',
       headers: {
         'Content-Type':'application/json'
       },
       body: JSON.stringify(newBooking)
     })
     .then(response => response.json())
     .catch(error => console.log(error.message))
   },

  createBooking() {
// verify inputs
    let newBooking = {
    userID: 48,
    date: "2019/09/23",
    roomNumber: 4
    };
    return newBooking;
  }

}

export {fetchApi};
