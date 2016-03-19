//Jorge Maldonado.
defineBehavior("messages", function (document)
{
    return {
        sendMessage: sendMessage
    };

    function sendMessage(data)
    {
        switch (data.type) {
            case 2://correct message
                var messages = document.getElementById("ulMessages");
                messages.innerHTML += "<li>{0}:{1}</li>".format(data.user, data.message);
                appData.addMessage(data);
                break;
            case 3://error in the connection or server fail
                $eventDriver.pub("connectionStatusChanged", false);
                break;
            case 4://reconnection succeeded
                offlineData.each(function (item)
                {
                    worker.postMessage(item);
                });
                offlineData = new Array();
                break;
        }
    }
});