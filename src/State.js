/**
 * Created by Duncan on 3/24/2017.
 */
define(function(){
    /*
    // states are used to create intelligent observer graphs that can transform and respond to data
    State<I, O> :: (
        // a passed filter function determines whether an update will update its observers
        filter : (state : I) -> boolean,
        map    : (state : I) -> O,
        ?initial : O
    ) -> {
        check : () -> O,
        update : (state : I) -> void,
        subscribe : (task : (state : O) -> void) -> {destroy : () -> {}}
    }
    */
    return function State(filter, map, initial){
        var tasks = [];
        var state = initial ? initial : undefined;
        this.check = function(){
            return state;
        };
        this.update = function(_state){
            if (filter(_state)) {
                state = map(_state);
                tasks.forEach(function(task){
                    task(state);
                });
            }
        };
        this.subscribe = function(task){
            var flag = -1;
            for(var i = 0; i < tasks.length; i++){
                if (!tasks[i]) {
                    flag = i;
                    tasks[i] = task;
                    break;
                }
            }
            if (flag < 0) {
                flag = tasks.length;
                tasks.push(task);
            }
            var _o = tasks;
            var _i = flag;
            return {
                destroy: function(){
                    _o[_i] = undefined;
                    _o = undefined;
                    _i = undefined;
                }
            }
        };
    }
});