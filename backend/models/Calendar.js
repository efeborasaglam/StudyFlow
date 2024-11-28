const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    calendarID: String,
    userID: String,
    events: Array
});

module.exports = mongoose.model('Calendar', CalendarSchema);