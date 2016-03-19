//Jorge Maldonado.
defineBehavior("connectionStatusChanged", function (document)
{

    return {
        addRoomsUI: addRoomsUI,
        resetConnection: resetConnection,
        resetUI: resetUI,
        delayedRetry: delayedRetry
    };

    function resetConnection(status)
    {
        if (appData.connectionStatus == status) {
            return true;
        }
        appData.connectionStatus = status;
    }

    function resetUI(status)
    {

        document.getElementById("spStatus").innerHTML = appData.getConnectionStatusText();
        if (status) document.getElementById("spCounter").innerHTML = "";
        if (appData.currentUser == null || appData.currentUser === undefined) return true;
        return status;
    }

    function delayedRetry(status)
    {
        if (status) return false;
        var i = 0;
        var retry = setInterval(function ()
        {
            document.getElementById("spCounter").innerHTML = " (reconnecting in {0})".format(10 - i);
            if (++i > 10) {
                i = 0;
                worker.postMessage({
                    type: 5
                });
                $eventDriver.pub("connectionStatusChanged", true);
                clearTimeout(retry);
            }

        }, 1000)
        return true;
    }
    //Ajax request to retrieve the available rooms
    function getAvailableRooms()
    {
        var xhttp, calldeffered = new defer();
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("POST", "/WebChat/getAvailableRooms", true);
        xhttp.onreadystatechange = function ()
        {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var result = JSON.parse(xhttp.responseText);
                calldeffered.resolve(result);
            }
        }
        xhttp.send();
        return calldeffered.promise;
    }

    function addRoomsUI(status)
    {
        if (status || appData.currentUser == null) {
            document.getElementById("txtRoom").innerHTML = "";
            getAvailableRooms().then(function (data)
            {
                data.each(function (item)
                {
                    document.getElementById("txtRoom").innerHTML += "<option value='{0}'>{0}</option>".format(item);
                });
                document.getElementById("txtRoom").selectedIndex = 0;
            });
        }
        return false;
    }
});