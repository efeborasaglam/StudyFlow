const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: String,
    name: String,
    email: String,
    password: String,
    preferences: Object
});

module.exports = mongoose.model('User', UserSchema);