//Jorge Maldonado.
//global definition for the app structure with default values------------------------------------------
var appData = new App();
var worker = null; //WebWorker that sends messages asynchronously to the server using a WebSocket 
var offlineData = new Array();




function createUser(ev)
{
    ev.preventDefault();
    if (appData.currentUser != null && !confirm("Are you sure you want to change user?"))
        return;   
    var txtName = document.getElementById("txtName").value;
    var txtRoom = document.getElementById("txtRoom").value;
    if (txtName == "") 
        alert("Name cannot be blank");    
    else
        $eventDriver.pub("createUser", txtName, txtRoom, resetWebWorker, false);
}

function sendMessage(ev)
{
    ev.preventDefault();
    var message = {
        message: document.getElementById("txtMessages").value,
        type:1
    }
    if (!appData.connectionStatus) {
        alert("connection failed! your message will be sent after the connection reestablishes");
        offlineData.push(message);
    }
    else {
        worker.postMessage(message);
    }
    document.getElementById("txtMessages").value = "";
    
}

function messageHandler(ev)
{   
    $eventDriver.pub('messages', ev.data);
}


function changeTab(tabName, element)
{
    $eventDriver.pub('tab', tabName, element);
}

function resetWebWorker()
{
    if (worker != null)
        worker.terminate();
    worker = new Worker("/Scripts/asyncSocket.js");
    worker.onmessage = messageHandler;
    var message = {
        user: appData.currentUser.name,
        room: appData.currentUser.room,
        type: 2
    }
    worker.postMessage(message);
}

function destroyUser(){
    $eventDriver.pub("destroyUser");
}

(function init()
{
    window.applicationCache.addEventListener('updateready', function ()
    {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            window.location.reload();
        }
    });
    
    $eventDriver.alwaysCallEnd(function () { localStorage.defaultApp = JSON.stringify(appData); });
    if (typeof Storage !== "undefined"
        && localStorage.defaultApp !== undefined) {
        appData = new App(JSON.parse(localStorage.defaultApp));
        $eventDriver.pub("connectionStatusChanged", false);       
    }   
    if (appData.currentUser != null)
        $eventDriver.pub("createUser", appData.currentUser.name, appData.currentUser.room, resetWebWorker, true); //this call contains logic to redirect to tab
    else {
        $eventDriver.pub("connectionStatusChanged", false);
        $eventDriver.pub("tab", appData.tabStatus.defaultTab, document.getElementById(appData.tabStatus.defaultTabElement));
    }
})();

