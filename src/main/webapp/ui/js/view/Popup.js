/* 
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */
function createPopup(record, title) {
    var htmlGenerated = "<p>Tags seen during this event:<p>";
    htmlGenerated += "<p><ul>";
    for (var i=0; i<record.data.numberOfTags; i++) {
        htmlGenerated += "<li>" + record.data.epcs[i].value + "</li>";
    }
    htmlGenerated += "</ul></p>";

    var popup = new Ext.Panel({
        floating: true,
        modal: true,
        centered: true,
        width: 300,
        height: 200,
        styleHtmlContent: true,
        scroll: 'both',
        html: htmlGenerated,
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            title: title
        }]
    });

    return popup;
}

function createImgPopup(title, URL) {
    var htmlGenerated = "<p>Snapshot:<br/><img width='250' height='150' src='"+ URL +"'></img></p>";
    
    var popup = new Ext.Panel({
        floating: true,
        modal: true,
        centered: true,
        width: 300,
        height: 200,
        styleHtmlContent: true,
        scroll: 'both',
        html: htmlGenerated,
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            title: title
        }]
    });

    return popup;
}