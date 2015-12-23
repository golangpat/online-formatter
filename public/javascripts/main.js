$(function () {
    $('#md5_btn').on('click', function () {
        var plaintext = $('#md5_input').val();
        var hashValue = CryptoJS.MD5(plaintext).toString();
        $('#md5_output').html(hashValue);
        return false;
    });

    $('#md4_btn').on('click', function () {
        var plaintext = $('#md4_input').val();
        var hashValue = hex_md4(plaintext);
        $('#md4_output').html(hashValue);
        return false;
    });

    $('#sha1_btn').on('click', function () {
        var plaintext = $('#sha1_input').val();
        var hashValue = CryptoJS.SHA1(plaintext).toString();
        $('#sha1_output').html(hashValue);
        return false;
    });

    $('#sha256_btn').on('click', function () {
        var plaintext = $('#sha256_input').val();
        var hashValue = CryptoJS.SHA256(plaintext).toString();
        $('#sha256_output').html(hashValue);
        return false;
    });

    $('#sha384_btn').on('click', function () {
        var plaintext = $('#sha384_input').val();
        var hashValue = CryptoJS.SHA384(plaintext).toString();
        $('#sha384_output').html(hashValue);
        return false;
    });

    $('#sha512_btn').on('click', function () {
        var plaintext = $('#sha512_input').val();
        var hashValue = CryptoJS.SHA512(plaintext).toString();
        $('#sha512_output').html(hashValue);
        return false;
    });

    $('#ripemd160_btn').on('click', function () {
        var plaintext = $('#ripemd160_input').val();
        var hashValue = CryptoJS.RIPEMD160(plaintext).toString();
        $('#ripemd160_output').html(hashValue);
        return false;
    });

    $('#json_formatter_btn').on('click', function () {
        try {
            var opts = {};
            opts.indent_size = $('#tab-size').val();
            opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
            opts.max_preserve_newlines = $('#max-preserve-newlines').val();
            opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
            opts.wrap_line_length = $('#wrap-line-length').val();
            opts.brace_style = $('#brace-style').val();

            var output = js_beautify(editor.getValue(), opts);
            editor.setValue(output);
        }
        catch (err) {
            editor.setValue("Not a JSON");
        }
        return false;
    });

    $('#html_formatter_btn').on('click', function () {
        try {
            var opts = {};

            opts.indent_size = $('#tab-size').val();
            opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
            opts.max_preserve_newlines = $('#max-preserve-newlines').val();
            opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
            opts.wrap_line_length = $('#wrap-line-length').val();
            opts.indent_inner_html = $('#indentation-head').val() == '1';

            var output = html_beautify(editor.getValue(), opts);
            editor.setValue(output);
        }
        catch (err) {
            editor.setValue("Not a HTML");
        }
        return false;
    });

    $('#xml_formatter_btn').on('click', function () {
        try {
            var opts = {};
            var indentation = $('#tab-size').val();
            if(indentation == '2'){
                opts = 2;
            }
            else if(indentation == '3'){
                opts = 3;
            }
            else if(indentation == '4'){
                opts = 4;
            }
            else if(indentation == '8'){
                opts = 8;
            }
            else if(indentation == '1'){
                opts = '\t';
            }
            var output = vkbeautify.xml(editor.getValue(), opts);
            editor.setValue(output);
        }
        catch (err) {
            editor.setValue("Not a XML");
        }
        return false;
    });

    $('#css_formatter_btn').on('click', function () {
        try {
            var opts = {};
            opts.indent_size = $('#tab-size').val();
            opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
            opts.wrap_line_length = $('#wrap-line-length').val();
            opts.selector_separator_newline = $('#selector-separator-newline').val() == '1';
            opts.newline_between_rules = $('#newline-between-rules').val() == '1';

            var output = css_beautify(editor.getValue(), opts);
            editor.setValue(output);

        }
        catch (err) {
            editor.setValue("Not a CSS");
        }
        return false;
    });

    $('#sql_formatter_btn').on('click', function () {
        try {
            var output = vkbeautify.sql($('#sql_formatter_input').val(), 4);
            $('#sql_formatter_output').text(output);
            $('#sql_formatter_output').parent().removeClass("prettyprinted");
            prettyPrint();
        }
        catch (err) {
            $('#sql_formatter_output').text("Not a SQL");
        }
        return false;
    });

    $('#url_encode_btn').on('click', function () {
        var plaintext = $('#url_encode_input').val();
        var hashValue = encodeURI(plaintext);
        $('#url_encode_output').text(hashValue);
        return false;
    });
    $('#url_decode_btn').on('click', function () {
        var plaintext = $('#url_encode_input').val();
        var hashValue = decodeURI(plaintext);
        $('#url_encode_output').text(hashValue);
        return false;
    });

    $('#base64_encode_btn').on('click', function () {
        var plaintext = $('#base64_encode_input').val();
        var hashValue = Base64.encode(plaintext);
        $('#base64_encode_output').text(hashValue);
        return false;
    });
    $('#base64_decode_btn').on('click', function () {
        var plaintext = $('#base64_encode_input').val();
        var hashValue = Base64.decode(plaintext);
        $('#base64_encode_output').text(hashValue);
        return false;
    });

    $('#cc_generate_btn').on('click', function () {
        var cardType = $('#card_type').val();
        var formatType = $('#format_type').val();
        var number = $('#number_entries').val();

        var cards;
        var format = '';
        var cvv = 'CVV';
        var cvvLength = 3;

        if (formatType == '0') {
            format = '';
        }
        else if (formatType == '1') {
            format = ' ';
        }
        else if (formatType == '2') {
            format = '-';
        }

        if (cardType == 'VS') {
            cards = credit_card_number(visaPrefixList, visaLength, number, format, cvvLength);
            cvv = 'CVV2';
        }
        else if (cardType == 'VS13') {
            cards = credit_card_number(visaPrefixList, visa13Length, number, format, cvvLength);
            cvv = 'CVV2';
        }
        else if (cardType == 'VSE') {
            cards = credit_card_number(visaElectronPrefixList, visaElectronLength, number, format, cvvLength);
        }
        else if (cardType == 'MC') {
            cards = credit_card_number(mastercardPrefixList, masterLength, number, format, cvvLength);
            cvv = 'CVC2';
        }
        else if (cardType == 'AE') {
            cvv = 'CID';
            cvvLength = 4;
            cards = credit_card_number(amexPrefixList, amexLength, number, format, cvvLength);
        }
        else if (cardType == 'D') {
            cards = credit_card_number(discoverPrefixList, discoverLength, number, format, cvvLength);
            cvv = 'CID';
        }
        else if (cardType == 'JCB') {
            cards = credit_card_number(jcbPrefixList, jcbLength, number, format, cvvLength);
        }
        else if (cardType == 'DCCB') {
            cards = credit_card_number(dinersCartePrefixList, dinersCarteLength, number, format, cvvLength);
        }
        else if (cardType == 'DCE') {
            cards = credit_card_number(dinersEnRoutePrefixList, dinersEnRouteLength, number, format, cvvLength);
        }
        else if (cardType == 'DCI') {
            cards = credit_card_number(dinersInternationalPrefixList, dinersInternationalLength, number, format, cvvLength);
        }
        else if (cardType == 'DCIUSC') {
            cards = credit_card_number(dinersUSCPrefixList, dinersUSCLength, number, format, cvvLength);
        }
        else if (cardType == 'VY') {
            cards = credit_card_number(voyagerPrefixList, voyagerLength, number, format, cvvLength);
        }
        else if (cardType == 'L') {
            cards = credit_card_number(laserPrefixList, laserLength, number, format, cvvLength);
        }

        var table = $('<table></table>').addClass('table table-bordered table-striped');
        var header = $('<tr></tr>');
        header.append('<th>Card Number</th>');
        header.append('<th>' + cvv + '</th>');
        header.append('<th>Expiration Date</th>');
        table.append(header);
        for (var i = 0; i < cards.length; i++) {
            var row = $('<tr></tr>');
            row.append('<td>' + cards[i].number + '</td>');
            row.append('<td>' + cards[i].cvv + '</td>');
            row.append('<td>' + cards[i].year + '</td>');
            table.append(row);
        }
        $('#cc_generate_output').html(table);
        return false;
    });

    $('#qr_code_btn').on('click', function () {
        $('#qr_download_btn').attr("disabled", true);
        $('#qr_code_output').text('');

        var levelType = $('#level_type').val();
        var level = QRCode.CorrectLevel.H;

        if (levelType == 'L') {
            level = QRCode.CorrectLevel.L;
        }
        else if (levelType == 'M') {
            level = QRCode.CorrectLevel.M;
        }
        else if (levelType == 'Q') {
            level = QRCode.CorrectLevel.Q;
        }
        else if (levelType == 'H') {
            level = QRCode.CorrectLevel.H;
        }

        var type = $('#qr_code_type').val();
        var textToGenerate;

        if (type == 'wifi') {
            var ssid = $('#qr_code_ssid').val();
            var password = $('#qr_code_password').val();
            var type = $('#qr_code_network_type').val();
            textToGenerate = 'WIFI:S:' + ssid + ';T:' + type + ';P:' + password;
        }
        else if (type == 'address-book') {
            var name = $('#qr_code_name').val();
            var company = $('#qr_code_company').val();
            var occupation = $('#qr_code_occupation').val();
            var telephone = $('#qr_code_telephone').val();
            var email = $('#qr_code_email').val();
            var address = $('#qr_code_address').val();
            var url = $('#qr_code_url').val();
            var note = $('#qr_code_note').val();
            textToGenerate = 'BEGIN:VCARD\r\n' +
                'VERSION:3.0' + '\r\n' +
                'N:' + name + '\r\n';
            if(company != ''){
                textToGenerate += 'ORG:' + company + '\r\n';
            }
            if(occupation != ''){
                textToGenerate += 'TITLE:' + occupation + '\r\n';
            }
            if(telephone != ''){
                textToGenerate += 'TEL:' + telephone + '\r\n';
            }
            if(email != ''){
                textToGenerate += 'EMAIL:' + email + '\r\n';
            }
            if(address != ''){
                textToGenerate +=  'ADR:' + address + '\r\n';
            }
            if(url != ''){
                textToGenerate +=  'URL:' + url + '\r\n';
            }
            if(note != ''){
                textToGenerate +=  'NOTE:' + note + '\r\n';
            }
            textToGenerate += 'END:VCARD';

        }
        else if (type == 'email') {
            var email = $('#qr_code_email_email').val();
            textToGenerate = 'mailto:' + email;

        }
        else if (type == 'event') {

        }
        else if (type == 'geo') {
            var latitude = $('#qr_code_latitude').val();
            var longitude = $('#qr_code_longitude').val();
            var query = $('#qr_code_query_string').val();

            textToGenerate = 'GEO:' + latitude + ',' + longitude;
            if (query != '') {
                textToGenerate = '?q=' + query;
            }
        }
        else if (type == 'text') {
            textToGenerate = $('#qr_code_text').val();
        }
        else if (type == 'sms') {
            var phone = $('#qr_code_sms_telephone').val();
            var message = $('#qr_code_message').val();
            textToGenerate = 'smsto:' + phone + ':' + message;
        }
        else if (type == 'tel') {
            var phone = $('#qr_code_telephone_telephone').val();
            textToGenerate = 'tel:' + phone;
        }
        else if (type == 'url') {
            var url = $('#qr_code_url_url').val();
            textToGenerate = addhttp(url);
        }

        var qrcode = new QRCode(document.getElementById("qr_code_output"), {
            //width : 200,
            //height : 200,
            correctLevel: level
        });
        qrcode.makeCode(textToGenerate);

        window.setTimeout(function(){
            $('#qr_code_output>img').attr('alt', 'QR Code generator result');
            var data = $('#qr_code_output>img').attr('src');
            console.log(data);
            $('#qr_download_btn').attr('href', data);
            $('#qr_download_btn').attr("disabled", false);
        }, 3000);
        return false;
    });

    /*$('#qr_download_btn').on('click', function () {
        var data = $('#qr_code_output>img').attr('src');
        window.open(data);
    });*/

    $('#qr_code_type').on('change', function () {
        $('#address-book').hide();
        $('#email').hide();
        $('#event').hide();
        $('#geo').hide();
        $('#text').hide();
        $('#sms').hide();
        $('#telephone').hide();
        $('#url').hide();
        $('#wifi').hide();

        var type = $('#qr_code_type').val();
        if (type == 'wifi') {
            $('#wifi').show();
        }
        else if (type == 'address-book') {
            $('#address-book').show();
        }
        else if (type == 'email') {
            $('#email').show();
        }
        else if (type == 'event') {
            $('#event').show();
        }
        else if (type == 'geo') {
            $('#geo').show();
        }
        else if (type == 'text') {
            $('#text').show();
        }
        else if (type == 'sms') {
            $('#sms').show();
        }
        else if (type == 'tel') {
            $('#telephone').show();
        }
        else if (type == 'url') {
            $('#url').show();
        }
    });

    function addhttp(url) {
        if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = "http://" + url;
        }
        return url;
    }
});
