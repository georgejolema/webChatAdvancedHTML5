//Jorge Maldonado.
//adding each method to use a cleaner iteration over the elements of an array

Array.prototype.each = function (func)
{
    for (var i = 0; i < this.length; i++) {
        if (func(this[i]))
            return;
    }
}

//adding a format function to make easer concating strings
String.prototype.format = function ()
{
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number)
    {
        return args[number] !== undefined ? args[number] : match;
    });
}

//Object to use as a model 
function user(name, room)
{
    this.name = name;
    this.room = room;
}

function App(data)
{
    var that = this;
    this.currentUser = null;
    this.connectionStatus = false;
    this.messages = [];

    buildObject(data);
    this.getConnectionStatusText = function ()
    {
        return that.connectionStatus ? "On" : "Off";
    }
    this.addMessage = function (data)
    {
        that.messages.push(data);
    }
    this.tabStatus = new function ()
    {
        this.defaultTab = "information-tab";
        this.defaultTabElement = "information";
    }();

    function buildObject(data)
    {
        if (data === undefined)
            return;
        that.currentUser = data.currentUser;
        that.tabStatus = data.tabStatus;
        that.messages = data.messages;
    }
}

//behavior handler
function defineBehavior(identifier, fn)
{
    var dataService = fn(document);
    for (serviceMethod in dataService) {
        $eventDriver.sub(identifier, dataService[serviceMethod]);
    }

}
//Promise
function defer()
{
    var status = 0;
    var that = this;
    this.promise = new function ()
    {
        var that = this;
        this.then = function (success, error)
        {
            that.success = success;
            that.error = error;
        }
    }();

    this.resolve = function (data)
    {
        if (status != 0)
            throw 'promise is no longer in progress status';
        that.promise.success(data);
        status = 1;
    }

    this.reject = function (data)
    {
        if (status != 0)
            throw 'promise is no longer in progress status';
        that.promise.error(data);
        status = -1;
    }
}
//extend

function extend(obj1, obj2)
{
    for (attr in obj2)
    {
        obj1[attr] = obj2[attr];
    }
}