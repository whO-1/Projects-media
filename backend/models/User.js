const mongoose = require('mongoose');
const { validate } = require('./Group');


const regxEmail = /^[^\s@]+@[^\s@]+[^\s@]+\.+[^\s@]+$/; 
const regxPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]).+$/;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: v => regxEmail.test(v),
            message: props => props.value + " is not a valid email."
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: v => regxPassword.test(v),
            message: props => props.value + " is not a valid password. \n* At least one uppercase char,\n* At least one lowercase char,\n* At least one special symbol or number.",
        }
    },
    asignedGroups: [mongoose.SchemaTypes.ObjectId],
    asignedTasks: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model('User', userSchema);