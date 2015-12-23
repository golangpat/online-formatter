$(function () {
    editor = CodeMirror.fromTextArea(document.getElementById("formatter_output"), {
        lineNumbers: true,
        viewportMargin: Infinity,
        mode: "application/ld+json"
    });

});