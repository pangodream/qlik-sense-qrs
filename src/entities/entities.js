/**
 * Common point for all entity agents
 */
/**
 * Generic entity (API object)
 * It contains no explicit methods or logic for an entity, 
 * but general methods (read) that can be used for any entity/object
 */
exports.genericEntity = require('./generic-entity');

/**
 * Specific entities (API Objects)
 * Each new entity file has to be declared below this
 */
exports.app = require('./app');
exports.task = require('./task');
exports.taskOperational = require('./task-operational');
exports.user = require('./user');