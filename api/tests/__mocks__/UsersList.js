const API_BASE = require('../config');

const axios = require('axios');

var CallUsers = () => {
    var result = axios.get(`${API_BASE}users`).then(data => {

        return data;
    }).catch( err => {
        return err.response.data;   
    });

    return result
}

module.exports = CallUsers;