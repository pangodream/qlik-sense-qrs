const crypto = require('crypto-js');


const generateXrfKey = () => {
    //Generate a random MD5 hash and get 16 first characters
    let key = crypto.MD5(Date.now().toString())
        .toString()
        .substr(0, 16);
    return key;
}

module.exports = {
    generateXrfKey
}