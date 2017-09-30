const Alexa = require('alexa-sdk');

const login = require("facebook-chat-api");
 
const languageString = {
    'en': {
        'translation': {
            'CHECK_MSG_PROMPT': 'No new messages',
            'LAUNCH_PROMPT': 'Welcome to Facebook Messenger',
            'SEND_MSG_PROMPT' : 'Message sent',
            'SUCCESS': 'Sent message to Jintian',
            'UNHANDLED': 'Sorry, I didn\'t understand that'
        },
    }
};

var fbApi;
var friendsList;

function renderPrompt(promptName) {
    const speechOutput = this.t(promptName);
    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(':responseReady');
}

// function messageJT() {
//     login({email: "dheeraj.navani@gmail.com", password: "testing123"}, (err, api) => {
//             if(err) return console.error(err);
         
//             var yourID = "100010231719546";
//             var msg = {body: "Hey!" + new Date()};
//             api.sendMessage(msg, yourID, (err, msgInfo) => {
//                 renderPrompt('SUCCESS');
//             });
//         });
// }

const intentHandler = {
	'LaunchRequest': function() {
        login({email: "EMAIL", password: "PASSWORD"}, (err, api) => {
            if(err) return console.error(err);
            
            console.log('login successful');

            fbApi = api;
            fbApi.getFriendsList((err, data) => {
                if(err) return console.error(err);
                friendsList = data;
                console.log('friends list');
                console.log(friendsList);
            
                renderPrompt.call(this, 'LAUNCH_PROMPT');
            });
        });
    },
    'SendMessageIntent': function() {
        if (this.event.request.dialogState !== "COMPLETED") {
            console.log("in not completed");
            this.emit(":delegate");
        } else {
            console.log('in completed');

            receipient = this.event.request.intent.slots.user.value;
            message = this.event.request.intent.slots.content.value
            console.log(receipient);
            console.log(message);
            
            for (i = 0; i < friendsList.length; i++) { 
                if(friendsList[i].firstName.toLowerCase() == receipient.toLowerCase()){
                    console.log(friendsList[i]);
                    var yourID = friendsList[i].userID;
                    fbApi.sendMessage(message, yourID, (err, msgInfo) => {
                        const speechOutput = this.t('SEND_MSG_PROMPT') + ' to ' + receipient + ' saying ' + message;
                        this.response.speak(speechOutput);
                        this.emit(':responseReady');
                    });
                }
            }
        }
    },
    'CheckMessageIntent': function() {
        renderPrompt.call(this, 'CHECK_MSG_PROMPT');
    },
    'Unhandled': function() {
        renderPrompt.call(this, 'UNHANDLED');
    },
};

exports.handler = function (event, context) {
    // login({email: "dheeraj.navani@gmail.com", password: "testing123"}, (err, api) => {
    //     if(err) return console.error(err);
    //     fbApi = api;

    //     fbApi.getFriendsList((err, data) => {
    //         if(err) return console.error(err);

    //         friendsList = data;

    //         const alexa = Alexa.handler(event, context);
    //         alexa.resources = languageString;
    //         alexa.registerHandlers(intentHandler);
    //         alexa.execute();
    //     });
    // });

    const alexa = Alexa.handler(event, context);
    alexa.resources = languageString;
    alexa.registerHandlers(intentHandler);
    alexa.execute();
};
