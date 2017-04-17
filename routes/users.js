!(function(){
	'use strict';

	var express = require('express'),
	router = express.Router(),
	UserController = require('../app/controllers/UserController');

	var route = function(app){
	 
	 router.post('/send_message',UserController.sendMessage);

     app.use('/api/users',router);
	}
	module.exports = route;
})();