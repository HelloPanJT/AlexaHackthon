const login = require("facebook-chat-api");

login({email: "Your email", password: "PASSWORD"}, (err, api) => {
    if(err) return console.error(err);

  
    api.getFriendsList((err, data) => {
        if(err) return console.error(err);
       for (i = 0; i < data.length; i++) { 
        if(data[i].firstName == 'Dheeraj'){
          var yourID = data[i].userID;
         
    api.sendMessage("hello DJ", yourID);
          console.log(data[i]);
          return;
        }
}
      
    });
});

