const config = require('../config/config');
const https = require('https');
const fs = require('fs');
const axios = require('axios');

//QRS calls
exports.get = async(path, options = '') => {
    let headers = getHeaders();
    let httpsAgent = getHttpsAgent();

    let cPath = config.getHost() + path + '?xrfkey=' + config.getXrfKey() + options;

    return await axios.get(cPath, { headers, httpsAgent });
}
exports.post = async(path, data = {}, options = '') => {
    let headers = getHeaders();
    let httpsAgent = getHttpsAgent();

    let cPath = config.getHost() + path + '?xrfkey=' + config.getXrfKey() + options;

    return await axios.post(cPath, data, { headers, httpsAgent });
}
const getHeaders = () => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-qlik-xrfkey': config.getXrfKey(),
        'X-Qlik-User': 'UserDirectory= Internal;UserId=sa_repository'
    };
    return headers;
};
const getHttpsAgent = () => {
    let httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
        cert: fs.readFileSync(config.getCertFile()),
        key: fs.readFileSync(config.getCertKeyFile()),
        //passphrase: "YYY"
    });
    return httpsAgent;
};