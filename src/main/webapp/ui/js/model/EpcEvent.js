/* 
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */
Ext.regModel('EpcEvent', {
    fields: [{
        name: 'numberOfTags',
        type: 'int'
    },
    {
        name: 'epcs'
    },
    {
        name: 'reportName',
        type: 'string'
    },
    {
        name: 'niceTime',
        type: 'string'
    }
    ]
});

