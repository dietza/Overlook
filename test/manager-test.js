import chai from 'chai';
const expect = chai.expect;

import User from '../src/User'
import Manager from '../src/Manager';

describe('Manager', function() {

  let user1
  let user2
  let user3
  let booking1
  let booking2
  let booking3
  let booking4
  let booking5
  let booking6
  let booking7
  let roomNumber12
  let roomNumber20
  let roomNumber15
  let roomNumber13
  let roomNumber17
  let roomNumber18
  let roomNumber14

  let manager;
  let today;
  let guest1;
  let guest2;
  let guest3;
  let guestList
  let bookings;
  let rooms;

  function getToday() {
    let today = (new Date()).toLocaleDateString('en-GB');
    return today;
  };

  beforeEach(function() {

    user1 = {"id":1,"name":"Leatha Ullrich"};
    user2 = {"id":2,"name":"Rocio Schuster"};
    user3 = {"id":3,"name":"Kelvin Schiller"};

    booking1 = {"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2020/02/05","roomNumber":12,"roomServiceCharges":[]};
    booking2 = {"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2020/01/11","roomNumber":20,"roomServiceCharges":[]};
    booking3 = {"id":"5fwrgu4i7k55hl72h","userID":1,"date":"2020/02/22","roomNumber":15,"roomServiceCharges":[]};
    booking4 = {"id":"5fwrgu4i7k55hl75s","userID":1,"date":"2020/02/20","roomNumber":13,"roomServiceCharges":[]};
    booking5 = {"id":"5fwrgu4i7k55hl6wx","userID":2,"date":"2020/01/17","roomNumber":17,"roomServiceCharges":[]};
    booking6 = {"id":"5fwrgu4i7k55hl6uf","userID":2,"date":"2020/01/09","roomNumber":18,"roomServiceCharges":[]};
    booking7 = {"id":"5fwrgu4i7k55hl76o","userID":3,"date":"2020/02/20","roomNumber":14,"roomServiceCharges":[]};

    roomNumber12 = {"number":12,"roomType":"single room","bidet":false,"bedSize":"twin","numBeds":2,"costPerNight":172.09};
    roomNumber20 = {"number":20,"roomType":"residential suite","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":343.95};
    roomNumber15 = {"number":15,"roomType":"residential suite","bidet":false,"bedSize":"full","numBeds":1,"costPerNight":294.56};
    roomNumber13 = {"number":13,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":423.92};
    roomNumber17 = {"number":17,"roomType":"junior suite","bidet":false,"bedSize":"twin","numBeds":2,"costPerNight":328.15};
    roomNumber18 = {"number":18,"roomType":"junior suite","bidet":false,"bedSize":"king","numBeds":2,"costPerNight":496.41};
    roomNumber14 = {"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":457.88};

    bookings = [ booking1, booking2, booking3, booking4, booking5, booking6, booking7 ];

    rooms = [ roomNumber12, roomNumber20, roomNumber15, roomNumber13, roomNumber17, roomNumber18, roomNumber14 ];

    guest1 = new User(today, rooms, bookings, user1);
    guest2 = new User(today, rooms, bookings, user2);
    guest3 = new User(today, rooms, bookings, user3);

    guest1.viewBookings(bookings);
    guest2.viewBookings(bookings);
    guest3.viewBookings(bookings);

    guest1.caluculateTotalSpent(rooms);
    guest2.caluculateTotalSpent(rooms);
    guest3.caluculateTotalSpent(rooms);

    guestList = [ guest1, guest2, guest3 ];

    manager = new Manager(today, rooms, bookings, guestList);

    today = getToday();

  })

  it('should be able to access the list of guests', function() {
    expect(manager.guests.length).to.deep.equal(3);
  });

  it('should be able to find the rooms occupied on a given day', function() {
    let occupiedRooms = manager.findRoomsOccupied('2020/02/20', rooms, bookings);
    expect(occupiedRooms).to.deep.equal([
      {"number":13,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":423.92},
      {"number":14,"roomType":"residential suite","bidet":false,"bedSize":"twin","numBeds":1,"costPerNight":457.88}
  ]);
    expect(manager.roomsOccupiedToday).to.deep.equal([]);
  });

  it('should be able to find the rooms available on a given day', function() {
    let availableRooms = manager.searchAvailability('2020/02/20', rooms, bookings);
    expect(availableRooms).to.deep.equal([
      {"number":12,"roomType":"single room","bidet":false,"bedSize":"twin","numBeds":2,"costPerNight":172.09},
      {"number":20,"roomType":"residential suite","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":343.95},
      {"number":15,"roomType":"residential suite","bidet":false,"bedSize":"full","numBeds":1,"costPerNight":294.56},
      {"number":17,"roomType":"junior suite","bidet":false,"bedSize":"twin","numBeds":2,"costPerNight":328.15},
      {"number":18,"roomType":"junior suite","bidet":false,"bedSize":"king","numBeds":2,"costPerNight":496.41}
  ]);
    expect(manager.roomsAvailableToday.length).to.deep.equal(7);
  });

  it('should be able to find the percentage of rooms occupied on a given day', function() {
    let percentOccupied = manager.calculatePercentageOccupied('2020/02/20', rooms, bookings);
    expect(percentOccupied).to.deep.equal(29);
    expect(manager.percentOccupancyToday).to.deep.equal(0);
  });

  it('should be able to calculate revenue based on occupancy for a given day', function() {
    let dailyRevenue = manager.calculateDailyRevenue('2020/02/20', rooms, bookings);
    expect(dailyRevenue).to.deep.equal('881.80');
    expect(manager.revenueToday).to.deep.equal('0.00');
  });

  it('should be able to search for a guest by name', function() {
    let guest = manager.searchByGuest(user3.name, guestList);
    expect(guest.name).to.deep.equal('Kelvin Schiller');
    expect(guest.bookings).to.deep.equal([{"id":"5fwrgu4i7k55hl76o","userID":3,"date":"2020/02/20","roomNumber":14,"roomServiceCharges":[]}]);
  });

  it('should be able to delete a booking for a given guest', function() {
    let guest = manager.searchByGuest(user2.name, guestList);
    expect(guest.name).to.deep.equal('Rocio Schuster');
    expect(guest.bookings).to.deep.equal([
      {"id":"5fwrgu4i7k55hl6wx","userID":2,"date":"2020/01/17","roomNumber":17,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl6uf","userID":2,"date":"2020/01/09","roomNumber":18,"roomServiceCharges":[]}]);

    let updatedBookingsData = manager.deleteBooking('2020/01/09', guest, bookings)
    expect(updatedBookingsData).to.deep.equal([
      {"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2020/02/05","roomNumber":12,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2020/01/11","roomNumber":20,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl72h","userID":1,"date":"2020/02/22","roomNumber":15,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl75s","userID":1,"date":"2020/02/20","roomNumber":13,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6wx","userID":2,"date":"2020/01/17","roomNumber":17,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl76o","userID":3,"date":"2020/02/20","roomNumber":14,"roomServiceCharges":[]}
    ]);

    let updatedGuestBookings = guest.viewBookings(updatedBookingsData);
    expect(guest.bookings).to.deep.equal([
      {"id":"5fwrgu4i7k55hl6wx","userID":2,"date":"2020/01/17","roomNumber":17,"roomServiceCharges":[]}]);
  });

});
