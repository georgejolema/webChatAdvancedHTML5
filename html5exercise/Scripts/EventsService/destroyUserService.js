//Jorge Maldonado.
defineBehavior("destroyUser", function (document)
{
    return {
        resetUser: resetUser,
        disconnect: disconnect,
        updateUI: updateUI
    };

    function resetUser()
    {
        appData = new App();
        offlineData = new Array();
    }

    function disconnect()
    {        
        if (worker != null)
            worker.terminate();
        appData.connectionStatus = true;//change to true to force a disconnection
        $eventDriver.pub("connectionStatusChanged", false);
    }

    function updateUI()
    {
        //deleting messages
        document.getElementById("ulMessages").innerHTML = "";
        //deleting user name
        document.getElementsByClassName("chat-user-name")[0].innerHTML = "";
        //disablibg chat button
        document.getElementById("btnSendMessage").disabled = true;
        $eventDriver.pub("tab", "information-tab", document.getElementById("information"));
        document.getElementsByClassName("exit-buton")[0].style.display = "none";
    }
});