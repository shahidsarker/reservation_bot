import React, { Component } from "react";

class ReservationsList extends Component {
  state = { reservations: [] };
  componentDidMount() {
    fetch("/reservations")
      .then(res => res.json())
      // .then(reservations => this.setState({ reservations }));
      .then(reservations => {
        reservations.map(reser => {
          const dateTimeObj = new Date(reser.dateTime);
          reser.date = dateTimeObj.toDateString();
          reser.time = dateTimeObj.toLocaleTimeString("en-US");
          return reser;
        });
        this.setState({ reservations });
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Reservations</h1>
        {this.state.reservations.map(reservation => (
          <div key={reservation.id}>
            {reservation.name}'s reservation is on {reservation.date} at{" "}
            {reservation.time}
          </div>
        ))}
      </div>
    );
  }
}

export default ReservationsList;
