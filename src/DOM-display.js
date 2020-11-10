let domDisplay = {

  buildManagerDashboard(today, manager) {
    let managerDashboard =
    `<section class="manager-dashboard">
      <form class="manager-display" role="display-info-for-manager">
        <div class="manager-welcome">
          <p>Welcome!</p>
          <h2>MANAGER</h2>
          <h3>${today}</h3>
        </div>
        <div>
          <section class="available-bookings">
            <p>Rooms available today : </p>
          </section>
        </div>
        <div>
          <section class="percentage-booked-rooms">
            <p>Rooms booked today : ${manager.bookedRooms}</p>
          </section>
        </div>
        <div>
          <section class="daily-revenue">
            <p>Projected daily revenue : ${manager.calculateDailyRevenue(today)}</p>
          </section>
        </div>
        </form>
      </section>`
    return managerDashboard;
  },
  buildGuestDashboard(today, user) {
    let guestDashboard =
    `<section class="guest-dashboard">
      <form class="guest-display" role="display-info-for-guest">
        <div class="guest-welcome">
          <p>Welcome,</p>
          <h2>${user.name}!</h2>
        </div>
        <div>
          <section class="guest-bookings">
            <p>My Bookings: ${user.bookings}</p>
          </section>
        </div>
        <div>
          <section class="total-spent">
            <p>Total billed: ${user.totalSpent}</p>
          </section>
        </div>
        </form>
      </section>`
    return guestDashboard;
  },

};

export {domDisplay};
