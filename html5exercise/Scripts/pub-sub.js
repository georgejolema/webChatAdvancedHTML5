//Jorge Maldonado.
//event driven development
var $eventDriver = new function ()
{
    var cache = {},
    alwaysCallEnd = [],
    alwayscallBegin = [];


    this.pub = function (id)
    {
        var args = Array.prototype.slice.call(arguments, 1);
        if (!cache[id]) {
            cache[id] = [];
        }
        alwayscallBegin.each(function (fn)
        {
            fn();
        });
        cache[id].each(function (item)
        {
            return item.apply(null, args);
        });
        alwaysCallEnd.each(function (fn)
        {
            fn();
        });
        return this;

    },
    this.sub = function (id, fn)
    {
        if (!cache[id]) {
            cache[id] = [fn];
        }
        else {
            cache[id].push(fn);
        }
        return this;
    },
    this.alwaysCallEnd = function (fn)
    {
        alwaysCallEnd.push(fn);
    },
    this.alwayscallBegin = function (fn)
    {
        alwayscallBegin.push(fn);
    }

}();