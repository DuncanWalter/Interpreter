/**
 * Created by Duncan on 3/29/2017.
 */
define(["src/State"], function(State){

    var _style = /style=['"][^\[\]]+\[([^\[\]]+)][^\[\]]+['"]/;
    var _value = /value=['"]\[([^\[\]]+)]['"]/;
    var _class = /class=['"][^\[\]]+\[([^\[\]]+)][^\[\]]+['"]/;

    return {
        populate: function(root, context){
            // TODO loop over all roots... and their children...

            for(var i = 0; i < root.length; i++){

            }


            var elem = root.eq(i);
            var data = elem[0].outerHTML.match(/^<([^<>]+)>/m)[1];
            data.split(/[^\w-]+/); // chunk the tag into an array of data points
            data.forEach(function(token){
                switch(true){
                    case _style.test(token):



                    case _value.test(token):
                        var key = token.match(_value)[1];
                        var val = context.reduce(function(acc, obj){
                            return (acc) ? acc : obj[key];
                        }, undefined);
                        if(val instanceof State){
                            elem.val(val.check());
                            // TODO either collect and return subscriptions or find a way to detect removals
                            // TODO hook that state up to the input event of the element as well
                            val.subscribe(function(val){
                                elem.val(val);
                            });
                            elem[0].oninput = function(e){
                                val.update(elem.val());
                            };
                        } else {
                            elem.val(val);
                        }
                        break;


                    case _class.test(token):






                    default:

                }
            });
        },
        getData: function(root, context){
            var data = root[0].outerHTML.match(/data=["']?\[([^\[\]]+)]["']?/m);
            if(data){
                data = data[1].split(/[^\w-]+/).map(function(token){
                    // console.log(token);
                    return context.reduce(function(acc, obj){
                        return (acc) ? acc : obj[token];
                    }, undefined);
                });
            } else {
                data = [];
            }
            return data;
        }
    };
});