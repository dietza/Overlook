const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

describe('fetchApi', function() {

  let booking;

  before(function() {
    global.fetchApi = {};
    chai.spy.on(fetchApi, ['fetchUsersData', 'fetchBookingsData', 'fetchRoomsData', 'postNewBooking'], () => {})

    booking = {
      "userID": parseInt(29),
      "date": '12/11/2020',
      "roomNumber": parseInt(13),
      "id": parseInt(5122558175883)
    };
  });

  it('should be able to fetch users data', function() {
      fetchApi.fetchUsersData();

      expect(fetchApi.fetchUsersData).to.have.been.called(1);
      expect(fetchApi.fetchUsersData).to.have.been.called.with();
    });

    it('should be able to fetch bookings data', function() {
      fetchApi.fetchBookingsData();

      expect(fetchApi.fetchBookingsData).to.have.been.called(1);
      expect(fetchApi.fetchBookingsData).to.have.been.called.with();
    });

    it('should be able to fetch rooms data', function() {
      fetchApi.fetchRoomsData();

      expect(fetchApi.fetchRoomsData).to.have.been.called(1);
      expect(fetchApi.fetchRoomsData).to.have.been.called.with();
    });

    it('should be able to post a new booking', function() {
      fetchApi.postNewBooking(booking);

      expect(fetchApi.postNewBooking).to.have.been.called(1);
      expect(fetchApi.postNewBooking).to.have.been.called.with();
    });

});
