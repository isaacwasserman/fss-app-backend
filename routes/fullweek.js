var express = require('express');
var router = express.Router();
var request = require('request');

var url = 'http://raritea.com/ScheduleParse/data.js';


var getSchedules = function(callback) {
  request(url, function(err, res, body) {
    callback(err, JSON.parse(body));
    var schedules = JSON.parse(body);
  });
}

router.get('/:id', function(req, res){
  request(url, function(err, res2, body) {
    var schedules = JSON.parse(body.substring(15));
    
    var key, count = 0;
    for(key in schedules) {
      if(schedules.hasOwnProperty(key)) {
        count++;
      }
    }
    var JSONLength = count;
    
    var response = "Not Found";
    
    for (var key in schedules) {
      if (schedules.hasOwnProperty(key) && schedules[key]["id"] == req.params.id) {
        var response = schedules[key];
      }
    }
    res.send(response);
  });
});

module.exports = router;
