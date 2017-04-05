/**
 * Created by Duncan on 3/23/2017.
 */
/*

? : Maybe;
! : Hidden;

// a Template is a custom html "element" or module.
Template :: (
    // the html tag name and css selector for this template
    selector : string,
    // the path to the template's html document layout
    basePath : string,
    // the controller for an individual instance of this template
    Controller : (root DocumentElement) -> Controller
) -> {
    !selector: string,
    !children: Template[],
    load : (base : ?JQueryCollection) -> void
}

*/