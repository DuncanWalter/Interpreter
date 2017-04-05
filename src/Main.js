
require(["src/Template", "src/router", "src/collection"], function(Template, router, collection){

    function cascade(e){
        // creates constant and encapsulated
        // functions to allow parallel delays
        // takes a JQuery element set and an index
        var deferCascade = function(e, i){
            return function(){
                // indexes into the set to retrieve a single element
                var child = e.eq(i);
                child.css("animation", "cascade 0.75s ease-out");
                child.removeClass("cascade");
                cascade(child.children());
            }
        };
        for(var i = 0; i < e.length; i++){
            e.eq(i).addClass("cascade");
            setTimeout(deferCascade(e, i), Math.pow(i, 1.2) * 75);
        }
    }

    $("#send").click(function(e){
        $.post("evaluate", $("#input").val(), function(resp){
            console.log(resp);
            $("#response")[0].innerHTML = resp.toString();
        });
    });




    // TODO settings objects
    var t = new Template({
        selector: "example-selector",
        document: "<div style='[width:wide]; background: yellow;'><h1>wazzup?</h1><router data='[routerFunction]'></router></div>",
        styles: ".red {background-color: red;} .blue {background-color: blue;}",
        Controller: function(){
            var that = this;
            this.routerFunction = function(input){
                return ["","exe1","exe2"][Math.floor(Math.random()*3)];
            };
        },
        subTemplates: [
            new Template({
                selector: "exe2",
                document: "<collection data='[arr, map]'><p class='blue'><b>HAHA</b></p></collection>",
                Controller: function(){
                    this.arr = [1, 1, 1, 2, 4, 5, 6, 7, 2, 1, 3, 1, 0];
                    this.map = function(val){
                        return val;
                    }
                },
                subTemplates: [collection]
            }),
            new Template({
                selector: "exe1",
                document: "<collection data='[arr, map]'><p class='red'><b>MWAHAHA</b></p></collection>",
                Controller: function(){
                    this.arr = [1, 2, 3, 2, 4, 5, 6, 7, 2, 1, 3, 1, 0];
                    this.map = function(val){
                        return val;
                    }
                },
                subTemplates: [collection]
            }),
            router
        ]
    });

    var tree = t.load();


    cascade($(".cascade"));

});
