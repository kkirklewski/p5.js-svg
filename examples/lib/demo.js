var route = function() {
    var section = window.location.hash;
    section = section.replace(/#/g, "");
    if (["basic", "element", "manipulating", "filters", "graphics", "exporting", "click"].indexOf(section) === -1) {
        window.location.hash = "basic";
        return;
    }
    // highlight current section
    document.querySelector('.current') &&
        (document.querySelector('.current').className = '');
    document.querySelector('[href="#'+section+'"]').className = 'current';

    // remove all canvas
    document.getElementById('defaultCanvas') &&
        document.getElementById('defaultCanvas').remove();

    var req = new XMLHttpRequest();
    req.onload = function() {
        var code = req.response;
        var elt = document.getElementById("code");
        Rainbow.color(code, 'javascript', function(code) {
            elt.innerHTML = code;
        });
        var patch = [
            "window.setup = setup;",
            "window.draw = draw;",
            "(typeof mouseClicked !== 'undefined') && (window.mouseClicked = mouseClicked);",
            "(typeof preload !== 'undefined') && (window.preload = preload);"
        ].join('\n');
        eval(code + patch);
        new p5(null, document.getElementById("canvas")); // global init p5
    };
    req.open("GET", "examples/" + section + ".js");
    req.send();
};

route();

window.onhashchange = function() {
    route();
    window.noLoop();
};

