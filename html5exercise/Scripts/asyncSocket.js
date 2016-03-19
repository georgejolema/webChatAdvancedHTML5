//Jorge Maldonado.
//Defined as an anonymous function that calls inmediatly after loading because I don't want to register the functions of the webworker in the global scope.
//web worker message types:
//1. receiving message from main thread.
//2. receiving message from web socket.
//3. connection error or server fail.
//4. connection established with web socket.
//5. reconnect web socket with web worker.
(function ()
{
    //force to stop on loading this code. This is because I only want it to run within the webworker context
    try{
        if (stopAsync !== undefined)
            return;
    } catch (ex) { }
    //Initial values for global variables
    
    var status = 0,
        name = "",
        room = "";


    addEventListener("message", messageHandler, true);



    var websocket = createSocket();
    //WebSocket section--------------------------------------------------------------
    function createSocket()
    {
        var webSocket = WebSocket || MozWebSocket;
        ws = new webSocket('ws://127.0.0.1:8080');

        ws.onopen = function ()
        {
            status = 1;
            postMessage({
                type: 4
            });
        }

        ws.onclose = function ()
        {
            postMessage({
                type: 3
            });
        }

        ws.onerror = function ()
        {
            postMessage({
                type: 3
            });
        }

        ws.onmessage = function (e)
        {
            var data = JSON.parse(e.data);
            if (data.room != room) //we only want messages from the same room
                return;
            var message = {
                type: 2,
                user: data.user,
                message: data.message
            };
            postMessage(message);
        }
        return ws;
    };
    //Webworker section--------------------------------------------------------------
    function messageHandler(ev)
    {

        var message = ev.data;
        if (message.type == 2) {
            user = message.user;
            room = message.room;
        }
        else if (message.type == 5) {
            websocket = createSocket();
        }
        else {
            if (status == 1) {
                message.room = room;
                message.user = user;
                websocket.send(JSON.stringify(message));
            }
        }

    }
})();