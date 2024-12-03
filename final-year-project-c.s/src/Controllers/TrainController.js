const Train = require('../../src/Models/trainModel');

async function getTrains(req, res) {
    try {
        const trains = await Train.getAllTrains();
        res.json(trains);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching trains' });
    }
}

module.exports = { getTrains };
