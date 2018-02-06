var express = require('express');
var router = express.Router();

const baseURL = 'http://localhost:3000/';
let Urls = require('../models/Urls');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Shortener' });
});

router.get('/:num', function(req, res, next) {
  if(!req.params.num) return res.sendStatus(400);

    Urls.findOne({shortUrl: baseURL + req.params.num}, (err, result) => {
        if(err) return res.sendStatus(400);
        if(!result) return res.send('not found');
        res.redirect(result.originalUrl);
    });
});

module.exports = router;
