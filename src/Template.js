/**
 * Created by Duncan on 3/23/2017.
 */
define(["src/State", "src/parser"], function(State, parser){

    function Controller(parent, base, template){
        this.parent   = parent;
        this.base     = base;
        this.children = [];
        this.template = template;

        var hidden = false;
        var defaultDisplay = base.css("display");
        this.hide = function(){
            if (!hidden) base.css("display", "none");
            hidden = true;
        };
        this.show = function(){
            if (hidden) base.css("display", defaultDisplay);
            hidden = false;
        };
        this.destroy = function(){
            parent = null;
            this.children.forEach(function(child){
                child.destroy();
            });
        };
    }

    // TODO make this take a single settings object
    // TODO make styles only occur at module levels
    // a Template is a custom html "element" or module.
    /*
    Template :: ({
        // the html tag name and css selector for this template
        selector : string,
        // the path to the template's html document layout
        document : string,
        // the controller for an individual instance of this template
        Controller : (parent : Controller, base : JQuery, [..Custom..]) -> Controller
        // any styles attached to this template
        ?styles : string,
        // a collection of templates utilized by this template
        ?subTemplates : Template[]
    }) -> {
        selector : string,
        subTemplates : Template[],
        load : (parent : Controller) -> Controller[]
    }

    */
    return function Template(settings){

        this.selector = settings.selector;
        if(settings.styles){
            $("head").append("<style>"+(settings.styles || "")+"</style>");
        }
        this.subTemplates = (settings.subTemplates || []);
        this.subTemplates.push(this);

        // TODO check to prevent double loading so that users can effectively hack inits using load
        // TODO make these elements in isolation, then add them to the document
        this.load = function(parent){
            // console.log(parent);
            var elements = (parent) ? parent.base.find(this.selector) : $("body "+this.selector);
            var instances = [];

            for(var i = 0; i < elements.length; i++){

                var base = elements.eq(i);

                // here, any extra Controller constructor data is located and loaded in
                // base.empty();
                var data = parser.getData(base, [parent]); // (set, context)
                // console.log(data);
                base.append(settings.document);

                // this is... amazing? Terrifying?
                // _Controller is called to construct a default
                // controller, then the given constructor is
                // applied to that one, effectively executing a
                // dominant mixin.
                var controller = new Controller(parent, base, this);
                settings.Controller.apply(controller,[parent, base].concat(data));

                // hook into the html as directed
                // in the template layout
                // TODO parser.populate(

                // pseudo-recursively load in sub-templates
                this.subTemplates.forEach(function(template){
                    template.load(controller).forEach(function(child){
                        controller.children.push(child);
                    });
                });

                // TODO smooth out the API surface here...
                // currently calls an init method upon
                // finalizing children loading
                if(controller.init)controller.init();

                instances.push(controller);

            }

            return instances;
        }
    };
});
