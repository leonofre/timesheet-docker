const API_BASE = require('../config');

const axios = require('axios');

var CallCreate = async (data) => {
    var result = await axios.post(`${API_BASE}users`, data).then(data => {
        const {body} = data;

        return body;
    }).catch( err => {
        return err.response.data;   
    });

    return result
}

module.exports = CallCreate;