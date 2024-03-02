import React from 'react';

const ReservationDetails = ({ reservations }) => {
  return (
    <div>
      <h2>Reservations:</h2>
      {reservations && reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.reservationId}>
            <h3>User Name: {reservation.userName}</h3>
            <p>Email: {reservation.gmailId}</p>
            <p>Check-In Date: {reservation.dateFrom}</p>
            <p>Check-Out Date: {reservation.dateTo}</p>
            <p>Persons: {reservation.persons}</p>
            <p>Confirmation Code: {reservation.confirmetionCode}</p>

            {/* Additional details from the nested room and hotel objects */}
            {reservation.room && (
              <div>
                <h4>Room Details:</h4>
                <p>Room Number: {reservation.room.roomNo}</p>
                <p>Description: {reservation.room.description}</p>
                <p>Price: {reservation.room.price}</p>
              </div>
            )}

            {reservation.room && reservation.room.hotel && (
              <div>
                <h4>Hotel Details:</h4>
                <p>Hotel Name: {reservation.room.hotel.hotelName}</p>
                <p>Rating: {reservation.room.hotel.rating}</p>
                <p>Address: {reservation.room.hotel.address}</p>
                <p>Location: {reservation.room.hotel.location.locationName}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No reservations available.</p>
      )}
    </div>
  );
};
export default ReservationDetails;
