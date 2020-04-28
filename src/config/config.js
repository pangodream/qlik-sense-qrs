//Public libraries
const fs = require('fs');
const url = require('url');

//Own required modules
const keys = require('../keys/keys');

//Configuration store
var confStore = {
    host: '',
    certFile: '',
    certKeyFile: '',
    xrfKey: '',
    certPassword: ''
};

//Validates options array and throws an exception if an option is not valid
const configure = function(options = {}) {
    //Validate array of options
    setHost(options.host);
    setCertFile(options.certFile);
    setCertKeyFile(options.certKeyFile);
    setXrfKey(options.xrfKey);
    return this;
};
const getConfiguration = () => {
    return confStore;
};

//Host entry
const setHost = (host) => {
    if (host === undefined) {
        throw new Error('Host is not defined');
    } else {
        let urlHost = url.parse(host);
        if (urlHost.protocol === null || urlHost.host === null || urlHost.port === null) {
            throw new Error('Host seems to be an invalid URI');
        } else {
            confStore.host = host;
        }
    }
};
const getHost = () => {
    return confStore.host;
};

//CertFile entry
const setCertFile = (certFile) => {
    if (certFile === undefined) {
        throw new Error('Certificate file absolute path is not defined');
    } else {
        if (!fs.existsSync(certFile))
            throw new Error('Certificate file (certFile) doesn\'t exist');
        confStore.certFile = certFile;
    }
};
const getCertFile = () => {
    return confStore.certFile;
};

//CertKeyFile entry
const setCertKeyFile = (certKeyFile) => {
    if (certKeyFile === undefined) {
        throw new Error('Certificate key file absolute path is not defined');
    } else {
        if (!fs.existsSync(certKeyFile))
            throw new Error('Certificate key file (certFile) doesn\'t exist');
        confStore.certKeyFile = certKeyFile;
    }
};
const getCertKeyFile = () => {
    return confStore.certKeyFile;
};

//xrfKey
const setXrfKey = (xrfKey) => {
    if (xrfKey === undefined) {
        confStore.xrfKey = keys.generateXrfKey();
    } else {
        if (xrfKey.length != 16)
            throw new Error('The xrfKey has to be 16 characters long');
        confStore.xrfKey = xrfKey;
    }
};
const getXrfKey = () => {
    return confStore.xrfKey;
};


module.exports = {
    configure,
    getConfiguration,
    setHost,
    getHost,
    setCertFile,
    getCertFile,
    setCertKeyFile,
    getCertKeyFile,
    setXrfKey,
    getXrfKey,
}