/*
 * (c) Dominique Guinard (www.guinard.org)
 *
 */
function subscribe() {
    //    var pusher = new Pusher('<ADD KEY HERE>');
    //    pusher.subscribe('test_channel');
    //    pusher.bind('my_event', function(data) {
    //        //compute the number of EPCS in that event
    //        data.numberOfTags = data.epcs.length;
    //        this.eventStore = Ext.StoreMgr.get('EventStore');
    //        this.eventStore.add(data);
    //    });
        //triggered whenever an event is received
        function callback(event) {
            processEpcEvent(event);
        }

        var location = getHostAndPort() + "things-pusher/pubsub/" + getURLParameter("reader");
        $.atmosphere.subscribe(location, callback, $.atmosphere.request = {
            transport: 'websocket'
        });
}


function subscribeSnapShotAlert() {
    //triggered whenever an event is received
    function callbackAlert(event) {
        var eventData = $.parseJSON(event.responseBody);
        //compute the number of EPCS in that event
        createImgPopup("ALERT!", eventData.url).show('pop');
        this.alertStore = Ext.StoreMgr.get('AlertStore');
        this.alertStore.add(eventData);
    }

    var location = getHostAndPort() + "things-pusher/pubsub/" + "thefts";
    $.atmosphere.subscribe(location, callbackAlert, $.atmosphere.request = {
        transport: 'websocket'
    });
}

/**
 * This method processes the JSON EPC event data and adds it to the
 * current model.
 */
function processEpcEvent(event) {
    //get the number of EPCS and add it to the JSON message
    var eventData = $.parseJSON(event.responseBody);
    eventData.numberOfTags = eventData.epcs.length;

    this.eventStore = Ext.StoreMgr.get('EventStore');
    this.eventStore.add(eventData);
}


