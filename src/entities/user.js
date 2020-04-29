/**
 * Import own libraries
 */
const http = require('../http/http');
/**
 * Returns the list of all User or the ones filtered by
 * the filter parameter (e.g.: 'id eq 123456-3456-...')
 * @param {String} filter Filter to be applied or nothing
 * @returns {Promise} API request data or an error
 */
exports.list = async(filter = '') => {
    let path = '/user';
    if (filter !== '') filter = '&filter=' + filter;
    let data = await http.get(path, filter);
    return (data.data);
};
/**
 * Returns the list of full info User records 
 * @returns {Promise} API request data or an error
 */
exports.listFull = async() => {
    let path = '/user/full';
    let data = await http.get(path);
    return (data.data);
};