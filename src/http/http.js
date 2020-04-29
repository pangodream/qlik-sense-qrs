/**
 * Import npm packages
 */
const axios = require('axios');
/**
 * Import node libraries
 */
const https = require('https');
const fs = require('fs');
/**
 * Import own libraries
 */
const config = require('../config/config');

/**
 * Axios GET and POST methods wrapping
 * We wrap both methods to use our own server certificate and encapsulate 
 * headers specification. At this point we append the XRF key sent in the headers
 * to the query string of the request as any other parameter
 */
/**
 * Axios GET method wrapping
 * @param {String} path API endpoint (for instance '/task')
 * @param {String} options Additional query string parameters to be added at the end
 * @returns {Promise} Response to the request or throws an error
 */
exports.get = async(path, options = '') => {
    let headers = getHeaders();
    let httpsAgent = getHttpsAgent();
    //Compose querystring
    let cPath = config.getHost() + path + '?xrfkey=' + config.getXrfKey() + options;

    return await axios.get(cPath, { headers, httpsAgent });
};
/**
 * Axios POST method wrapping
 * @param {String} path API endpoint (for instance '/task')
 * @param {Object} data Request body parameters to be sent in the request
 * @param {String} options Additional query string parameters to be added at the end
 * @returns {Promise} Response to the request or throws an error
 */
exports.post = async(path, data = {}, options = '') => {
    let headers = getHeaders();
    let httpsAgent = getHttpsAgent();
    //Compose querystring
    let cPath = config.getHost() + path + '?xrfkey=' + config.getXrfKey() + options;

    return await axios.post(cPath, data, { headers, httpsAgent });
};
/**
 * Returns an object containing the headers needed to perform a Qlik request
 * @returns {headers} Request headers for Qlik QRS
 */
const getHeaders = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-qlik-xrfkey': config.getXrfKey(),
        'X-Qlik-User': 'UserDirectory= Internal;UserId=sa_repository'
    };
    return headers;
};
/**
 * Returns an https.Agent running the Qlik Server certificate 
 * specified in the configuration options
 * @returns {https.Agent} Https Agent for Qlik Certificate
 */
const getHttpsAgent = () => {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
        cert: fs.readFileSync(config.getCertFile()),
        key: fs.readFileSync(config.getCertKeyFile()),
        //passphrase: "YYY"
    });
    return httpsAgent;
};