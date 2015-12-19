var visaPrefixList = [
    "40240071",
    "4485",
    "4532",
    "4539",
    "4556",
    "4716",
    "4916",
    "4929",
    "4"
];
var visaLength = 16;
var visa13Length = 13;

var visaElectronPrefixList = [
    "4026",
    "417500",
    "4508",
    "4844",
    "4913",
    "4917"
];
var visaElectronLength = 16;

var mastercardPrefixList = [
    "51",
    "52",
    "53",
    "54",
    "55"
];
var masterLength = 16;

var amexPrefixList = [
    "34",
    "37"
];
var amexLength = 15;

var discoverPrefixList = [
    "6011",
    "644",
    "645",
    "646",
    "647",
    "648",
    "649",
    "65"
];
var discoverLength = 16;

var dinersCartePrefixList = [
    "300",
    "301",
    "302",
    "303",
    "304",
    "305"
];
var dinersCarteLength = 14;

var dinersEnRoutePrefixList = [
    "2014",
    "2149"
];
var dinersEnRouteLength = 15;

var dinersInternationalPrefixList = [
    "300",
    "301",
    "302",
    "303",
    "304",
    "305",
    "309",
    "36",
    "38",
    "39"
];
var dinersInternationalLength = 14;

var dinersUSCPrefixList = [
    "54",
    "55"
];
var dinersUSCLength = 16;


var jcbPrefixList = [
    "35"
];
var jcbLength = 16;

var laserPrefixList = [
    "6304",
    "6706",
    "6771",
    "6709"
];
var laserLength = 16;

var voyagerPrefixList = [
    "8699"
];
var voyagerLength = 15;

function strrev(str) {
    if (!str) return '';
    var revstr = '';
    for (i = str.length - 1; i >= 0; i--)
        revstr += str.charAt(i)
    return revstr;
}

/*
 'prefix' is the start of the CC number as a string, any number of digits.
 'length' is the length of the CC number to generate. Typically 13 or 16
 */
function completed_number(prefix, length) {

    var ccnumber = prefix;

    // generate digits

    while (ccnumber.length < (length - 1)) {
        ccnumber += Math.floor(Math.random() * 10);
    }

    // reverse number and convert to int

    var reversedCCnumberString = strrev(ccnumber);

    var reversedCCnumber = new Array();
    for (var i = 0; i < reversedCCnumberString.length; i++) {
        reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i));
    }

    // calculate sum

    var sum = 0;
    var pos = 0;

    while (pos < length - 1) {

        odd = reversedCCnumber[pos] * 2;
        if (odd > 9) {
            odd -= 9;
        }

        sum += odd;

        if (pos != (length - 2)) {

            sum += reversedCCnumber[pos + 1];
        }
        pos += 2;
    }

    // calculate check digit

    var checkdigit = (( Math.floor(sum / 10) + 1) * 10 - sum) % 10;
    ccnumber += checkdigit;

    return ccnumber;

}

function ccFormat(ccNuumber, format)
{
    ccNuumber += '';
    var rgx = /(\d+)(\d{4})/;
    while (rgx.test(ccNuumber)) {
        ccNuumber = ccNuumber.replace(rgx, '$1' + format + '$2');
    }
    return ccNuumber;
}

function credit_card_number(prefixList, length, howMany, format, cvvlength) {

    var result = new Array();
    for (var i = 0; i < howMany; i++) {
        var cc = {};
        var randomArrayIndex = Math.floor(Math.random() * prefixList.length);
        var ccNumber = prefixList[randomArrayIndex];
        var ccCompleted = completed_number(ccNumber, length);

        if(format != ''){
            cc.number = ccFormat(ccCompleted, format);

        }
        else {
            cc.number = ccCompleted;
        }
        var minCVV = Math.pow(10, cvvlength - 1);
        var maxCVV = Math.pow(10, cvvlength) - 1;
        cc.cvv = getRandomArbitrary(minCVV,  maxCVV);
        var month = getRandomArbitrary(1, 13);
        var now = new Date();
        var year =  getRandomArbitrary(now.getFullYear() + 1, now.getFullYear() + 6);
        cc.year = pad(month, 2) + "/" + year;
        result.push(cc);
    }

    return result;
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}



