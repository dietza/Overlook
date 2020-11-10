let fetchApi = {

  fetchUsersData() {
    let fetchedUsersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
      .then(response => response.json())
      .then(data => data.users)
      .catch(error => console.log(error.message));
    return fetchedUsersData;
  },

  fetchBookingsData() {
    let fetchedBookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
      .then(response => response.json())
      .then(data => data.bookings)
      .catch(error => console.log(error.message));
    return fetchedBookingsData;
  },

  fetchRoomsData() {
    let fetchedRoomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
      .then(response => response.json())
      .then(data => data.rooms)
      .catch(error => console.log(error.message));
    return fetchedRoomsData;
  }

}

export {fetchApi};
