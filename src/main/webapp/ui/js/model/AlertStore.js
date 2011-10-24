/* 
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */
/*
 * (c) Dominique Guinard (www.guinard.org)
 *
 */
Ext.ns('App.Store');
App.Store.MobileEpc = new Ext.data.Store({
    model: 'AlertEvent',
    storeId: 'AlertStore',
    sorters: 'time',

    getGroupString : function(record) {
        return record.get('time')[0];
    }
});
Ext.reg('App.Store.MobileAlert', App.Store.MobileAlert);

