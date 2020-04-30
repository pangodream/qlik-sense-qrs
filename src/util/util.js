/**
 * Waits for the specified number of milliseconds 
 * @param {Number} ms Milliseconds
 * @returns {Promise} Returns true
 */
exports.wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}