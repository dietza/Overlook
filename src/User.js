class User {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.bookings = [],
    this.totalSpent = 0
  }

  viewBookings(bookingsData) {
    this.bookings = bookingsData.filter(booking => {
      return booking.userID === this.id;
    });
  }

  caluculateTotalSpent(roomsData) {
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

};

module.exports = User;
