//Jorge Maldonado.
defineBehavior("createUser", function (document)
{
    var isDifferentRoom = true;
    return {
        createUser: createUser,
        updateUI: updateUI,
        getMessages: getMessages,
        retrieveMessages: retrieveMessages
    };

    function createUser(name, room, webworker, firstTime)
    {
        isDifferentRoom = appData.currentUser == null || appData.currentUser.room == room;
        appData.currentUser = new user(name, room);
        $eventDriver.pub("tab", "chat-room-tab", document.getElementById("chatroom"));
        $eventDriver.pub("connectionStatusChanged", true);
        if (!firstTime)
            appData.messages = [];
        return false;
    }

    function updateUI(name, room)
    {
        if (isDifferentRoom) document.getElementById("ulMessages").innerHTML = "";
        document.getElementsByClassName("exit-buton")[0].style.display = "block";
        document.getElementsByClassName("chat-user-name")[0].innerHTML = "Welcome <span class='important-text'>{0}</span> to room <span class='important-text'>{1}</span>".format(name, room);
        document.getElementById("btnSendMessage").disabled = false;
        return false;
    }

    function retrieveMessages()
    {
        var messages = document.getElementById("ulMessages");
        appData.messages.each(function (data)
        {
            messages.innerHTML += "<li>{0}:{1}</li>".format(data.user, data.message);
        });
        return false;
    }

    function getMessages(name, room, resetWebWorker)
    {
        if (appData.currentUser == null)
            return true;
        resetWebWorker();
    }
});

