var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:colors', function(req, res){
  var colors = JSON.parse(req.params.colors.replace("%7B","{").replace("%7D","}").replace("%20"," "));
  
  res.json(colors);
});

module.exports = router;
