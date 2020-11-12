class User {
  constructor(today, roomsData, bookingsData, user) {
    this.id = user.id,
    this.name = user.name,
    this.bookings = [],
    this.totalSpent = 0,
    this.deletedBookings = []
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

  searchAvailability(selectedDate, roomsData, bookingsData) {
    console.log('bookingsData: ', bookingsData);
    let occupied = this.findRoomsOccupied(selectedDate, roomsData, bookingsData);
    let availableRooms = roomsData.reduce((available, room) => {
      if(occupied.includes(room) === false) {
        available.push(room);
      }
      return available;
    }, []);
    console.log('availableRooms: ', availableRooms);
    return availableRooms;
  }

  findRoomsOccupied(selectedDate, roomsData, bookingsData) {
    console.log('bookingsData: ', bookingsData);
    let occupiedRooms = [];
    roomsData.forEach(room => {
      bookingsData.forEach(booking => {
        if((parseInt(booking.roomNumber) === room.number) &&
        (booking.date === selectedDate)) {
          occupiedRooms.push(room);
        }
      });
    })
    console.log('occupiedRooms: ', occupiedRooms);
    return occupiedRooms;
  }

  bookRoom(selectedDate, roomsData) {
// FETCH - POST REQUEST
  }

};

module.exports = User;
