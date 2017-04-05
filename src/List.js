/**
 * Created by Duncan on 3/28/2017.
 */
define(function(){
    function Node(info, next){
        this._info = info;
        this._next = next;
    }
    function List(){
        this._first = new Node();
        this._last = this._first;
        this.length = 0;
    }
    var prototype = {
        map: function(fun){
            var itr = this._first;
            var res = new List();
            var i = 0;
            while(itr._info){
                res.push(fun(itr._info, i++));
                itr = itr._next;
            }
            return res;
        },
        forEach: function(fun){
            this.map(fun);
        },
        filter: function(fun){
            var itr = this._first;
            var res = new List();
            var i = 0;
            while(itr._info){
                if (fun(itr._info, i++)) res.push(itr._info);
                itr = itr._next;
            }
            return res;
        },
        reduce: function(fun, acc){
            var itr = this._first;
            var res = acc;
            var i = 0;
            while(itr._info){
                res = fun(res, itr._info, i++);
                itr = itr._next;
            }
            return res;
        },
        add: function(info){
            if(info){
                this._first = new Node(info, this._first);
                this.length++;
            }
        },
        remove: function(){
            if(this.length > 0){
                var t = this._first;
                this._first = this._first._next;
                this.length--;
                return t._info;
            }
        },
        push: function(info){
            if(info){
                this._last._info = info;
                this._last = this._last.next = new Node();
                this.length++;
            }
        }
    };
    for(var prop in prototype){
        if(prototype.hasOwnProperty(prop)){
            List.prototype = prototype[prop];
        }
    }
    return List;
});