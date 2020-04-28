//NPM and Node JS libraries
const https = require('https');
const fs = require('fs');
const axios = require('axios');

//Private modules
const config = require('./config/config');


//API Functions
const listTasks = async() => {
    let path = '/task';
    return await get(path);
};

const listApps = async() => {
    let path = '/app';
    return await get(path);
};

//QRS calls
const get = async(path) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-qlik-xrfkey': config.getXrfKey(),
        'X-Qlik-User': 'UserDirectory= Internal;UserId=sa_repository'
    };
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
        cert: fs.readFileSync(config.getCertFile()),
        key: fs.readFileSync(config.getCertKeyFile()),
        //passphrase: "YYY"
    });

    let cPath = config.getHost() + path + '?xrfkey=' + config.getXrfKey();

    return await axios.get(cPath, { headers, httpsAgent });
}

module.exports = {
    //Configuration
    configure: config.configure,
    getConfiguration: config.getConfiguration,
    setHost: config.setHost,
    getHost: config.getHost,
    setCertFile: config.setCertFile,
    getCertFile: config.getCertFile,
    setCertKeyFile: config.setCertKeyFile,
    getCertKeyFile: config.getCertKeyFile,
    setXrfKey: config.setXrfKey,
    getXrfKey: config.getXrfKey,

    //API Functions
    listTasks,
    listApps
}