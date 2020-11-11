class User {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.bookings = [],
    this.totalSpent = 0
  }

  viewBookings(bookingsData) {

    console.log('bookingsData: ', bookingsData);

    this.bookings = bookingsData.filter(booking => {
      return booking.userID === this.id;
    });
  }

  caluculateTotalSpent(roomsData) {

    console.log('roomsData: ', roomsData);

    let totalSpent = this.bookings.reduce((total, booking) => {
      let roomBooked = roomsData.find(room => {
        return room.number === parseInt(booking.roomNumber);
      })
      if (roomBooked !== undefined) {
        total += roomBooked.costPerNight;
      };
      return total;
    }, 0);
    this.totalSpent = totalSpent.toFixed(2);
  }

  searchAvailability(selectedDate) {

  }

  bookRoom(room, selectedDate) {

  }

}

/// On LOGIN page:
/// USER inputs their username - check validity (' customer1-50 ')
/// USER inputs their password - chewck validtity (' overlook2020 ')

/// Add EVENTLISTENER - when the 'SUBMIT' button is clicked,
/// Check the input fields.

/// IF invalid - throw an ERROR

/// IF the above inputs are valid:

/// FETCH data and instantiate correct type of USER

/// INSTANTIATE the new USER as a CUSTOMER (not a MANAGER)
/// DISPLAY the CUSTOMER DASHBOARD
///
///
/// INSTANTIATE the new USER as a MANAGER (inherits from USER)
/// DISPLAY the MANAGER DASHBOARD
module.exports = User;
