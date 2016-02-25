var express = require('express');
var router = express.Router();
var request = require('request');

var url = 'http://raritea.com/ScheduleParse/data.js';

router.get('/', function(req, res){
  request(url, function(err, res2, body) {
    
    var schedules = JSON.parse(body);
    res.json(schedules);
    
  });
});

module.exports = router;
