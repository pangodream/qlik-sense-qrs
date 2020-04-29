/**
 * Import npm packages
 */
const crypto = require('crypto-js');

/**
 * Generates a random 16 characters long string to be used as XRF Key
 * @returns {String} Random 16 char key
 */
exports.generateXrfKey = () => {
    //Generate a random MD5 hash and get 16 first characters
    let key = crypto.MD5(Date.now().toString())
        .toString()
        .substr(0, 16);
    return key;
}