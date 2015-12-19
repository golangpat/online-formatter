var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/formatters', function(req, res, next) {
    res.render('formatters', { title: 'Formatter Tools' });
});
router.get('/encoder-decoder', function(req, res, next) {
    res.render('encoder-decoder', { title: 'Encoders & Decoders' });
});
router.get('/generators', function(req, res, next) {
    res.render('generators', { title: 'Generators Tools' });
});
router.get('/hashes', function(req, res, next) {
    res.render('hashes', { title: 'Hashes Tools' });
});

router.get('/md4', function(req, res, next) {
    res.render('md4', { title: 'MD4 Hash Generator' });
});
router.get('/md5', function(req, res, next) {
  res.render('md5', { title: 'MD5 Hash Generator' });
});
router.get('/sha1', function(req, res, next) {
  res.render('sha1', { title: 'SHA1 Hash Generator' });
});
router.get('/sha256', function(req, res, next) {
  res.render('sha256', { title: 'SHA1 Hash Generator' });
});
router.get('/sha384', function(req, res, next) {
  res.render('sha384', { title: 'SHA1 Hash Generator' });
});
router.get('/sha512', function(req, res, next) {
    res.render('sha512', { title: 'SHA1 Hash Generator' });
});
router.get('/ripemd160', function(req, res, next) {
    res.render('ripemd160', { title: 'ripemd160 Hash Generator' });
});
router.get('/json-formatter', function(req, res, next) {
    res.render('json-formatter', { title: 'JSON Formatter' });
});
router.get('/html-formatter', function(req, res, next) {
    res.render('html-formatter', { title: 'HTML Formatter' });
});
router.get('/xml-formatter', function(req, res, next) {
    res.render('xml-formatter', { title: 'XML Formatter' });
});
router.get('/css-formatter', function(req, res, next) {
    res.render('css-formatter', { title: 'CSS Formatter' });
});
router.get('/url-encode-decode', function(req, res, next) {
    res.render('url-encode-decode', { title: 'Url Encoder & Decoder' });
});
router.get('/base64-encode-decode', function(req, res, next) {
    res.render('base64-encode-decode', { title: 'Base64 Encoder & Decoder' });
});
router.get('/credit-card-generator', function(req, res, next) {
    res.render('credit-card-generator', { title: 'Credit Card Generator' });
});
router.get('/qr-code-generator', function(req, res, next) {
    res.render('qr-code-generator', { title: 'QR Code Generator' });
});

module.exports = router;
