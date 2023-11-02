const mongoose= require('mongoose');


const userSchema= new mongoose.Schema({

Name: String,
Email: String,
Street: String,
City: String,
Zipcode: Number,
Tasks: [{
    ID: String,
    Title: String,
    Completed: Boolean
}],

Posts: [{
    ID: String,
    Title: String,
    Body: String
}]
});
const User = mongoose.model('user', userSchema);

module.exports = User;