const http = require('../http/http');

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