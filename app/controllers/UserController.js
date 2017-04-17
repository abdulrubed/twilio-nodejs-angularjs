!(function() {
    'use strict';

    var twilio = require('twilio'),
    Config = require('../../config/Configuration');
    
    var UserController = {
        sendMessage: function(req, res, next) {
            var client = new twilio.RestClient(Config.twillio.sid, Config.twillio.token);
            var data = req.body;
            client.messages.create({
                body: data.message,
                to: '+91'+data.phone_number,  // Text this number
                from: Config.twillio.number // From a valid Twilio number
            }, function(err, message) {
                if(!err){
                    res.json({success: true, data: message.sid, message: 'Message Successfully Sent.'});
                }else{
                     res.json({success: false, data: [], message: err});
                }
            });
           
        }
    };
    module.exports = UserController;
})();
