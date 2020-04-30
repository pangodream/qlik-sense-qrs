/**
 * Import own libraries
 */
const http = require('../http/http');
/**
 * Returns the list of all Task records or the ones filtered by
 * the filter parameter (e.g.: 'id eq 123456-3456-...')
 * @param {String} filter Filter to be applied or nothing
 * @returns {Promise} API request data or an error
 */
exports.list = async(filter = '') => {
    let path = '/task';
    if (filter !== '') filter = '&filter=' + filter;
    let data = await http.get(path, filter);
    return (data.data);
};
/**
 * Executes the task identified by its id
 * @param {String} id Id of the task
 * @returns {Promise} API request data or an error
 */
exports.start = async(id) => {
    let path = `/task/${id}/start`;
    let data = await http.post(path);
    return (data);
};
/**
 * Returns the list of full info Task records 
 * @returns {Promise} API request data or an error
 */
exports.listFull = async() => {
    let path = '/task/full';
    let data = await http.get(path);
    return (data.data);
};