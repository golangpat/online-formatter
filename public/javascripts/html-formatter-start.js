$(function () {
    editor = CodeMirror.fromTextArea(document.getElementById("formatter_output"), {
        lineNumbers: true,
        styleActiveLine: true,
        matchTags: {bothTags: true}
    });

});