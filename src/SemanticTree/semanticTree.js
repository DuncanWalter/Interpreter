/**
 * Created by Duncan on 4/4/2017.
 */
define(["src/Template", "src/collection"], function(Template, collection){
    return new Template({
        selector: "semantic-tree",
        subTemplates: [
            collection
        ]
    });
});