var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const baseURL = 'http://localhost:3000/';

let jsonParser = bodyParser.json();
let urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/url-shortener');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected');
});
let Urls = require('../models/Urls');

/* GET home page. */
router.post('/', urlEncodedParser,function(req, res) {
    if (!req.body) return res.sendStatus(400);
    let responseUrl = baseURL + (Math.floor(Math.random()*100000).toString()); 
    let newUrl = new Urls({
        originalUrl: req.body.url,
        shortUrl: responseUrl
    });
    newUrl.save((err, url) => {
        if(err) return res.send('error al guardar');
    });
    res.json({
        originalUrl: req.body.url,
        shortUrl: responseUrl
    });
});

router.get('/in/:num', (req, res) => {
    if(!req.params.num) return res.sendStatus(400);

    Urls.findOne({shortUrl: baseURL + req.params.num}, (err, result) => {
        if(err) return res.sendStatus(400);
        if(!result) return res.send('not found');
        res.send(result);
    });
});

module.exports = router;
