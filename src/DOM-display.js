let domDisplay = {

  showLoginDisplay() {
    let loginDisplay =
    `<section class="main-display">
      <section class="welcome-header">
        <p class="welcome-text">Welcome to the</p>
        <h1 id="headerText" tabindex="0">Overlook Hotel</h1>
      </section>
      <section class="main">
        <form role="user-login" class="user-login-form">
          <section class="username-form">
            <label for="name" class="input-label">Enter your Username: </label>
            <input type="text" name="username" id="username-input" aria-label="input-field-for-username" aria-required=true placeholder="username" tabindex="0">
          </section>
          <section class="user-password-form">
            <label for="email" class="input-label">Enter your password: </label>
            <input type="password" name="user-password" id="user-password-input" aria-label="input-field-for-userID-number" aria-required=true placeholder="password" tabindex="0">
          </section>
          <button id="login-submit-button" class="submit-button" type="button" tabindex="0">Submit</button>
        </form>
      </section>
    </section>`
    return loginDisplay;
  },

  showUsernameError() {
    let usernameError =
    `<section class='error-message'>
        <img src='./images/errorX.png' class='error-icon'>
        <p class='username-error'>Are you a guest? Please enter a valid username.</p>
        <p class='username-error'>customer[your user ID number]</p>
      </section>`;
    return usernameError;
  },

  showPasswordError() {
    let passwordError =
    `<section class='error-message'>
        <img src='./images/errorX.png' class='error-icon'>
        <p class='password-error'>Please enter a valid password to login.</p>
      </section>`;
    return passwordError;
  },

  buildManagerDashboard(today, roomsData, manager) {
    let roomsAvailableToday = domDisplay.formatAvailabilityList(roomsData, manager);
    let managerDashboard =
    `<section class="manager-dashboard">
      <form class="manager-display" role="display-info-for-manager">
        <div class="manager-welcome">
          <p>Welcome!</p>
          <h2>MANAGER</h2>
          <h3>${today}</h3>
        </div>
        <div>
          <section class="available-rooms-section">
              <p>Available today:
              <ul class="available-rooms-list">
              ${roomsAvailableToday}
              </ul>
              </p>
            </section>
          </div>
        </div>
        <div>
          <section class="percentage-booked-rooms">
            <p>Occupancy today : ${manager.percentOccupancyToday} %</p>
          </section>
        </div>
        <div>
          <section class="daily-revenue">
            <p>Projected daily revenue : $${manager.revenueToday}</p>
          </section>
        </div>
        <button id="return-to-login-button" class="logout-button" type="button" tabindex="0">Logout</button>
        </form>
      </section>`
    return managerDashboard;
  },

  buildGuestDashboard(today, roomsData, user) {
    let myBookings = domDisplay.formatBookingsList(roomsData, user);
    let guestDashboard =
    `<section class="guest-dashboard">
      <form class="guest-display" role="display-info-for-guest">
        <div class="guest-welcome">
          <p>Welcome,</p>
          <h2>${user.name}!</h2>
          <h3>${today}</h3>
        </div>
        <div>
          <section class="guest-bookings-section">
            <p>My Bookings:
            <ul class="guest-bookings-list">
            ${myBookings}
            </ul>
            </p>
          </section>
        </div>
        <div>
          <section class="total-spent">
            <p>Total billed : $${user.totalSpent}</p>
          </section>
        </div>

        <div>
          <section class="guest-booking-search">
            <form role="guest-booking-form" class="guest-booking-form">
              <section class="date-input-form">
                <p>Ready for another escape?</p>
                <label for="date-input" class="input-label"><p>Select a Date: </p></label>
                <input type="date" name="date-selection" id="date-input" aria-label="input-selector-for-date" aria-required=true placeholder="date" tabindex="0">
              </section>
              <section class="room-availability-section">

              </section>
              <button id="booking-submit-button" class="booking-submit-button" type="button" tabindex="0">Book this Room</button>
            </form>
          </section>
        </div>

        <div>
        <button id="return-to-login-button" class="logout-button" type="button" tabindex="0">Logout</button>
        </div>
      </form>
    </section>`
    return guestDashboard;
  },

  formatAvailabilityList(roomsData, manager) {
    let available = manager.roomsAvailableToday;
    return available.map(room => {
      if ((available.includes(room)) && (room !== undefined)) {
        return `<li class="availablity-list-listItem">| Room: ${room.number}     | ${room.roomType}        | $${room.costPerNight.toFixed(2)}</li></br>`
      };
    }).join('');
  },

  formatBookingsList(roomsData, user) {
    return user.bookings.map(booking => {
      let room = roomsData.find(room => {
        return room.number === parseInt(booking.roomNumber);
      });
      if (room !== undefined) {
        return `<li class="bookings-list-listItem">|Date: ${booking.date}       |Bill: $${room.costPerNight}</li></br>`
      };
    }).join('');
  }

};

export {domDisplay};
