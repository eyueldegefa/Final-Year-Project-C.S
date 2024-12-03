const db = require('../../src/Config/db');

async function addBooking(booking) {
    const query = `
        INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, selected_seat)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [
        booking.train_id,
        booking.passenger_name,
        booking.passenger_age,
        booking.passenger_phone,
        booking.passenger_email,
        booking.selected_seat,
    ]);
    return result;
}

module.exports = { addBooking };
