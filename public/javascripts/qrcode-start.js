$(function () {
    var qrcode = new QRCode(document.getElementById("qr_code_output"), {
        correctLevel: QRCode.CorrectLevel.H
    });
    qrcode.makeCode('example');

    window.setTimeout(function(){
        var data = $('#qr_code_output>img').attr('src');
        console.log(data);
        $('#qr_download_btn').attr('href', data);
    }, 1500);

});