const db = require('../../src/Config/db');

async function getAllTrains() {
    const [rows] = await db.query('SELECT * FROM trains');
    return rows;
}

async function getTrainById(trainId) {
    const [rows] = await db.query('SELECT * FROM trains WHERE train_id = ?', [trainId]);
    return rows[0];
}

module.exports = { getAllTrains, getTrainById };
