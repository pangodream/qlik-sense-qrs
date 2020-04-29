/**
 * Import own libraries
 */
const http = require('../http/http');
/**
 * Array containing the list of all allowed objects to be invoked by generic entity methods
 */
const allowedEntities = [
    'about', 'analyticconnection', 'app', 'appavailability', 'appcomponent',
    'appcontentquota', 'appseedinfo', 'appstatus', 'binarydelete', 'binarydownload',
    'binarysyncruleevaluation', 'compositeevent', 'compositeeventoperational', 'compositeeventruleoperational',
    'contentlibrary', 'custom', 'custompropertydefinition', 'dataconnection',
    'engineservice', 'event', 'eventoperational', 'executionresult', 'executionsession',
    'extension', 'externalprogramtask', 'externalprogramtaskoperational', 'fileextension', 'fileextensionwhitelist',
    'filereference', 'health', 'license', 'licenseaccessusage', 'lock',
    'mimetype', 'odagenginegroup', 'odaglink', 'odaglinkusage', 'odagmodelgroup',
    'odagrequest', 'odagservice', 'printingservice', 'proxyservice', 'proxyservicecertificate',
    'reloadtask', 'reloadtaskoperational', 'repositoryservice', 'schedulerservice', 'schemaevent',
    'schemaeventoperational', 'selection', 'servernodeconfiguration', 'servernodeheartbeat', 'servernoderole',
    'servicecluster', 'servicestatus', 'sharedcontent', 'staticcontentreference', 'staticcontentreferencebase',
    'stream', 'syncsession', 'systeminfo', 'systemnotification', 'systemrule',
    'tag', 'task', 'taskoperational', 'tempcontent', 'user',
    'userdirectory', 'userdirectoryconnector', 'usersynctask', 'usersynctaskoperational', 'virtualproxyconfig',
];
/**
 * Returns the list of all the ocurrences of the specified object 
 * or the ones filtered by the filter parameter (e.g.: 'id eq 123456-3456-...')
 * @param {String} entityName One of the allowed object names
 * @param {String} filter Filter to be applied or nothing
 * @returns {Promise} API request data or an error
 * @throws {Error} When the specified object is none of the allowed ones
 */
exports.list = async(entityName, filter = '') => {
    let lEntityName = entityName.toLowerCase();
    if (allowedEntities.indexOf(lEntityName) == -1) {
        throw new Error('Generic entity ' + entityName + ' is not allowed.');
    }
    let path = '/' + lEntityName;
    if (filter !== '') filter = '&filter=' + filter;
    let data = await http.get(path, filter);
    return (data.data);
};