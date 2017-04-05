/**
 * Created by Duncan on 3/24/2017.
 */
define(["src/State", "src/Template"], function(State, Template){
    // TODO rename / refactor to lower case
    // TODO implement package parameters as object to distinguish these functions and omit properly
    // routers extend State in order to dynamically load templates based on context.
    // routers are a Controller intended for use in templates
    // router templates are lazy loaded and preserved when not being used actively.
    // <router data='[routerFunction, initialState]'>
    return new Template({
        selector: "router",
        document: "",
        Controller: function(parent, root, router, state){
            // this.template.subTemplates = parent.template.subTemplates;
            var that = this;
            var children;
            var node = new State(
                function(input){
                    return router(input) !== node.check();
                },
                router
            );
            node.subscribe(function(selector){
                if(children){
                    children.forEach(function(child){
                        child.destroy();
                    });
                }
                if (selector && selector !== "") {
                    root.append("<" + selector + "></" + selector + ">");
                    console.log(that);
                    console.log(selector);
                    children = parent.template.subTemplates.reduce(function(accumulator, template){
                        return (template.selector === selector) ? template : accumulator;
                    }, null);
                    children = children ? children.load(that) : [];
                }
            });
            this.update = node.update;
            this.update(state || undefined);
            this.subscribe = node.subscribe;
        }
    });
});