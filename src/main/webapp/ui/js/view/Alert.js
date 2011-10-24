Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {
        this.store = Ext.StoreMgr.get("AlertStore");

        var groupingBase = {
            itemTpl: '<div class="contact2"><strong>Theft detected at {time}!</strong></div>',
            selModel: {
                mode: 'SINGLE',
                allowDeselect: true
            },
            grouped: false,
            indexBar: false,

            onItemDisclosure: {
                scope: 'test',
                handler: function(record, btn, index) {
                    createImgPopup("Theft Snapshot", record.data.url).show('pop');
                }
            }
        };

        if (!Ext.is.Phone) {
            new Ext.List(Ext.apply(groupingBase, {
                floating: true,
                width: 350,
                height: 370,
                centered: true,
                modal: true,
                hideOnMaskTap: false,
                store: this.store
            })).show();
        }
        else {
            new Ext.List(Ext.apply(groupingBase, {
                fullscreen: true,
                store: this.store
            }));
        }
    }
});

