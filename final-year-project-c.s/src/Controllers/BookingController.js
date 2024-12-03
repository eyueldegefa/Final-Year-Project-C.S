const Booking = require('../../src/Models/bookingModel');

async function createBooking(req, res) {
    try {
        const newBooking = req.body;
        const result = await Booking.addBooking(newBooking);
        res.json({ message: 'Booking created successfully!', bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating booking' });
    }
}

module.exports = { createBooking };
