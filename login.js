const login = require("facebook-chat-api");

login({email: "dheeraj.navani@gmail.com", password: "testing123"}, (err, api) => {
    if(err) return console.error(err);
    var obj = {
    	student: "hello",
    	number: "123456"
    }

    console.log(this);
 
    var yourID = "100010231719546";
    var msg = {body: "Hey! It's " + new Date()};
    api.sendMessage(msg, yourID);
});