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
    let occupied = this.findRoomsOccupied(selectedDate, roomsData, bookingsData);
    let availableRooms = roomsData.reduce((available, room) => {
      if(occupied.includes(room) === false) {
        available.push(room);
      }
      return available;
    }, []);
    return availableRooms;
  }

  findRoomsOccupied(selectedDate, roomsData, bookingsData) {
    let occupiedRooms = [];
    roomsData.forEach(room => {
      bookingsData.forEach(booking => {
        if((parseInt(booking.roomNumber) === room.number) &&
        (booking.date === selectedDate)) {
          occupiedRooms.push(room);
        }
      });
    })
    return occupiedRooms;
  }

  filterByRoomType(selectedDate, roomsData, bookingsData, roomType) {
    let availableRooms = this.searchAvailability(selectedDate, roomsData, bookingsData);
    let filteredRooms = availableRooms.filter(room => {
      return room.roomType === roomType;
    });
    return filteredRooms;
  }

  bookRoom(selectedDate, availableRooms, bookingsData, selectedRoom) {
    let newBooking = {
      'userID': this.id,
      'date': selectedDate,
      'roomNumber': selectedRoom.number
    };
    return availableRooms.includes(selectedRoom) ? newBooking : alert('sorry, that room is not available!');

// FETCH - POST REQUEST
  }

};

module.exports = User;
