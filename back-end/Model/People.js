const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    id: {
        type: Number
    }
    ,
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    }
    ,
    email: {
        type: String,
    }
    ,
    gender: {
        type: String,
    }
    ,
    dob: {
        type: String,
    }
    ,
    nationality: {
        type: String,
    },
    contact: {
        type: String,
    }
    ,
    job: {
        type: String,
    },
    userImage: {
        type: String,
    }
});

const PeopleModel = mongoose.model('people',Schema);

module.exports = PeopleModel;