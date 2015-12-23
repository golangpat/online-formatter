$(function () {
    editor = CodeMirror.fromTextArea(document.getElementById("formatter_output"), {
        lineNumbers: true,
        viewportMargin: Infinity,
        styleActiveLine: true,
        mode: "application/ld+json"
    });

});