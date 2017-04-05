/**
 * Created by Duncan on 3/28/2017.
 */
define(["src/State", "src/Template", "src/parser"], function(State, Template, parser){
    // <collection data="collection, map">
    return new Template({
        selector: "collection",
        document: "",
        Controller: function(parent, root, collection, map){
            // this.template.subTemplates = parent.template.subTemplates;
            var content = this.base.children().detach();
            var nodes = [];
            if(collection instanceof State){

            } else {
                collection.map(map).forEach(function(instance){
                    var node = content.clone(false);
                    root.append(node);
                    // TODO parser.populate(node_modules, [instance, collection, this, parent]);
                    // TODO run over the parent's subTemplates
                    nodes.push(node);
                    // this.subTemplates.forEach(function(template){
                    //     template.load(controller).forEach(function(child){
                    //         controller.children.push(child);
                    //     });
                    // });
                });
            }
        }
    });
});