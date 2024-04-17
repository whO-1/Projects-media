const mongoose = require('mongoose');

const asignedUserSchema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }, 
    state: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        immutable: true,
    },
    expireAt: Date,
    reqReview: {
        type: Boolean,
        required: true,
    },
    asignedUsers: [asignedUserSchema], 
    reviewers: [asignedUserSchema], 
});


const rolesSchema = new mongoose.Schema({
    admin: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        validate: {
            validator: v => v.length >= 1,
            message: props => "Group should contain at least 1 Admin",
        }
    },
    superAdmins: [mongoose.SchemaTypes.ObjectId],
    editors: [mongoose.SchemaTypes.ObjectId],
    users: [mongoose.SchemaTypes.ObjectId],
});


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type :Date,
        required: true,
        immutable: true,
    },  
    roles: {
        type: rolesSchema,
        required: true,
    },
    subGroups: [mongoose.SchemaTypes.ObjectId],
    tasks: [taskSchema],  
});

module.exports = mongoose.model("Group", groupSchema);
