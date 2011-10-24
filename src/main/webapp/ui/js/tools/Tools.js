/* 
 * (c) Dominique Guinard (www.guinard.org)
 * 
 */

/**
 * Returns the host and port: e.g., http://www.guinard.org:8080/
 */
function getHostAndPort() {
    var hostAndPort = "http://" + document.location.hostname;
    hostAndPort += ":" + document.location.port + "/";
    return hostAndPort;
}


function getURLParameter(name) {
    return unescape(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}




