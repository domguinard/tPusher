/* 
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */
Ext.ns('App.Store');
App.Store.MobileEpc = new Ext.data.Store({
    model: 'EpcEvent',
    storeId: 'EventStore',
    sorters: 'niceTime',
                
    getGroupString : function(record) {
        return record.get('niceTime')[0];
    },

    data: [
    {
        "epcs":[{
            "value":"urn:epc:raw:96.69943858130576004401391338131"
        },

        {
            "value":"urn:epc:raw:80.151245149937732132366145"
        },

        {
            "value":"urn:epc:raw:96.69943858130576004401391338137"
        },

        {
            "value":"urn:epc:raw:96.69943858130576004401391339329"
        },

        {
            "value":"urn:epc:raw:96.69943858130576004401391338082"
        },

        {
            "value":"urn:epc:raw:96.69943858130576004401391338246"
        },

        {
            "value":"urn:epc:raw:96.69943858130576004401391339106"
        },

        {
            "value":"urn:epc:raw:96.69943858130576004401391338120"
        },

        {
            "value":"urn:epc:raw:96.69943858130576004401391339104"
        }],
        "reportName":"spec_Revolution",
        "niceTime":"23:25:46"
    },
    ]
});
Ext.reg('App.Store.MobileEpc', App.Store.MobileEpc);