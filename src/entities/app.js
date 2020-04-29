const http = require('../http/http');


exports.list = async(filter = '') => {
    let path = '/app';
    if (filter !== '') filter = '&filter=' + filter;
    let data = await http.get(path, filter);
    return (data.data);
};