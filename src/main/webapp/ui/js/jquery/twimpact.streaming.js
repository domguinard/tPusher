(function($) {
  var DISCONNECTED = 1;
  var CONNECTING = 2;
  var CONNECTED = 3;
  var ERROR = 4;

  var receivedBytes = 0;
  var callbackAdded = false;
  var keywords;
  var receiveEvent;
  var watchdogRef;
  var isReconnecting = false;
  var chunk = "";
  var transport = $.browser.msie ? "long-polling" : "streaming"; // i can't get websockets to work
  var detectedTransport;
  var remote;
  var url;

  var credentials;

  var requestSettings = {
    maxRequest: 60,
    transport: transport,
    timeout: 10000,
    cache: false,
    logLevel: 'debug',
    beforeSend: function(xhr) {
      if (credentials) xhr.setRequestHeader("Authorization", "Basic " + credentials + "==");
    }
  };

  function watchdog() {
    if (callbackAdded) {
      var request = $.atmosphere.request;
      var response = $.atmosphere.response;
      if (response.state == "error") {
        if (isReconnecting) {
          if (request.requestCount < request.maxRequest) {
            $.atmosphere.log("info", ["watchdog: still waiting for connection ..."]);
            $.atmosphere.log("info", [$.atmosphere.activeTransport]);
            $.atmosphere.log("info", [$.atmosphere.response, $.atmosphere.request]);
            $.atmosphere.response.state = "messageReceived";
            receiveEvent({
              twmsg: "status",
              status: CONNECTING,
              count: request.requestCount,
              max: request.maxRequest
            });
          } else {
            $.atmosphere.log("info", ["watchdog: stopping watchdog ..."]);
            clearInterval(watchdogRef);
            receiveEvent({twmsg: "status", status: ERROR});
          }
        } else {
          $.atmosphere.log("info", ["watchdog: initiating a reconnect ..."]);
          isReconnecting = true;
          subscribe();
          receiveEvent({
            twmsg: "status",
            status: CONNECTING,
            count: request.requestCount,
            max: request.maxRequest
          });
        }
      } else {
        //$.atmosphere.log('info', ["watchdog: state='" + response.state + "', status=" + response.status + ", transport='" + response.transport + "'"]);
        if (isReconnecting) {
          $.atmosphere.log("info", ["watchdog: reconnected stream, restarting tracking ..."]);
          $.twire.start(url + "/start", keywords);
          isReconnecting = false;
        }
        receiveEvent({twmsg: "status", status: CONNECTED, bytes: receivedBytes});
      }
    }
  }

  function receive(response) {
    //$.atmosphere.log('debug', ["receive: state='" + response.state + "', status=" + response.status + ", transport='" + response.transport + "', data=" + response.responseBody.length + ", chunk=" + chunk.length]);
    detectedTransport = response.transport;
    if (response.transport != 'polling' && response.state != 'connected' && response.state != 'closed') {
//      $.atmosphere.log('info', ["response.responseBody: " + response.responseBody]);
      if (response.status == 200) {
        var data = response.responseBody;
        if (data.length > 0) {
          receivedBytes += data.length;
          if (data.match("<!--")) return;
          if (chunk != "") {
            data = chunk + data;
            chunk = ""
          }

          receiveEvent({twmsg: "status", status: CONNECTED, bytes: receivedBytes});

          var lines = data.split(/[\n\r]+/);
          $.each(lines, function(idx, line) {
            if (!line.match(/^[\s]*$/)) {
              try {
                var event = $.parseJSON(line);
              } catch(e) {
                // only add junk parts if we do not have found a newline
                if (idx == lines.length - 1) chunk += line;
              }
              if (event) receiveEvent(event)
            }
          });
        }
      } else {
        if (response.state == "error" || response.state == "closed") {
          if (!isReconnecting) {
            receiveEvent({twmsg: "status", status: DISCONNECTED});
          }
        }
      }
    }
  }

  function subscribe() {
    receivedBytes = 0;
    $.atmosphere.subscribe(url + "/stream", !callbackAdded ? receive : null, requestSettings);
    remote = $.atmosphere.response;
    callbackAdded = true
  }


  $.twire = {
    start: function(url, keywords) {
      $.ajax({url: url, type: 'post', data: jQuery.param({"keywords": keywords}, true)});
    },

    subscribe: function(baseUrl, creds, keywds, callback) {
      credentials = creds;
      keywords = keywds;
      receiveEvent = callback;
      url = baseUrl;

      if (!watchdogRef) {
        watchdogRef = setInterval(watchdog, 30000);
      }

      $.twire.start(baseUrl + "/start", keywords);
      subscribe();
    },

    unsubscribe: function() {
      $.atmosphere.closeSuspendedConnection();
    }
  };
})(jQuery);
