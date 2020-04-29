const http = require('../http/http');

exports.list = async(filter = '') => {
    let path = '/task';
    if (filter !== '') filter = '&filter=' + filter;
    let data = await http.get(path, filter);
    return (data.data);
};

exports.listFull = async() => {
    let path = '/task/full';
    let data = await http.get(path);
    return (data.data);
};