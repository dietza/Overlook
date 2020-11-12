class Manager {
  constructor(today, allRooms, guestBookings, guestList) {
    this.roomsOccupiedToday = this.findRoomsOccupied(today, allRooms, guestBookings),
    this.roomsAvailableToday = this.searchAvailability(today, allRooms, guestBookings),
    this.percentOccupancyToday = this.calculatePercentageOccupied(today, allRooms, guestBookings),
    this.revenueToday = this.calculateDailyRevenue(today, allRooms, guestBookings),
    this.guests = guestList
  }

  searchAvailability(selectedDate, allRooms, guestBookings) {
    let occupied = this.findRoomsOccupied(selectedDate, allRooms, guestBookings);
    let availableRooms = allRooms.reduce((available, room) => {
      if(occupied.includes(room) === false) {
        available.push(room);
      }
      return available;
    }, []);
    return availableRooms;
  }

  findRoomsOccupied(selectedDate, allRooms, guestBookings) {
    let occupiedRooms = [];
    allRooms.forEach(room => {
      guestBookings.forEach(booking => {
        if((parseInt(booking.roomNumber) === room.number) &&
        (booking.date === selectedDate)) {
          occupiedRooms.push(room);
        }
      });
    })
    return occupiedRooms;
  }

  calculatePercentageOccupied(selectedDate, allRooms, guestBookings) {
    let occupied = this.findRoomsOccupied(selectedDate, allRooms, guestBookings);
    let percentOccupied = Math.round((occupied.length / allRooms.length) * 100);
    if(occupied.length === 25) {
      return 100;
    } else {
      return percentOccupied;
    }
  }

  calculateDailyRevenue(selectedDate, allRooms, guestBookings) {
    let occupied = this.findRoomsOccupied(selectedDate, allRooms, guestBookings);
    let total = allRooms.reduce((sumRevenue, room) => {
      if(occupied.includes(room)) {
        sumRevenue += room.costPerNight;
      }
      return sumRevenue;
    }, 0);

    let dailyRevenue = total.toFixed(2);
    return dailyRevenue;
  }

  searchByGuest(guestName, guestList) {
    let guest = guestList.find(guest => {
      return guest.name === guestName;
    });
    return guest;
  }

  deleteBooking(selectedDate, guest, guestBookings) {
    let targetBooking = guest.bookings.find(booking => {
      return booking.date === selectedDate
    })
    let targetIndex = guestBookings.indexOf(targetBooking);
    let deletedBooking = guestBookings.splice(targetIndex, 1);
    let updatedBookingsData = guestBookings.filter(booking => {
      if((booking !== deletedBooking) && (booking !== undefined)) {
        return booking;
      }
    });
    guest.bookings = guest.bookings.filter(booking => {
      if((booking !== deletedBooking) && (booking !== undefined)) {
        return booking;
      }
    });
    guest.deletedBookings.push(deletedBooking);
    return updatedBookingsData;

// FETCH - DELETE REQUEST
  }

}

module.exports = Manager;
