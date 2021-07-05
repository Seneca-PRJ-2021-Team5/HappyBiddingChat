const express = require("express");
const cors = require("cors");
// corsOptions={
//     cors:{
//         origins:["http://localhost:5000"]
//     }
// }
// corsOptions = {
//     cors:{
//         "origin": "*",
//         "methods": ["GET","POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//     }
// }
corsOptions = {}
const chalk = require('chalk'); // to style console.log texts
const bodyParser = require("body-parser");
const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, corsOptions);
app.use(cors());
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://happybiddingchat.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

io.on("connection", socket => { 
    console.log("new client connected!")

    socket.on('sendMessage', (messageInfo, callback) => {
        //io.emit('message', { text: message });

        currentDate = new Date();
        console.log(currentDate);
        io.emit('message', 
        {
            position: 'left', 
            title: messageInfo.userName, 
            type: 'text', 
            text: messageInfo.message, 
            date: currentDate
        });
        callback();
    });

});


const HTTP_PORT = process.env.PORT || 8080;
httpServer.listen(HTTP_PORT,()=>{
    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    console.log(chalk.yellow(`WEB SERVER:`), chalk.green(` STARTED AT PORT ${HTTP_PORT}`));
})