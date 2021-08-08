const express = require("express");
const cors = require("cors");
// corsOptions={
//     cors:{
//         origins:["http://localhost:5000"]
//     }
// }
corsOptions = {
    cors:{
        "origin": "*"
    }
}
//corsOptions = {}
const chalk = require('chalk'); // to style console.log texts
const bodyParser = require("body-parser");
const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, corsOptions);
const utils = require('./utils/users')
//app.use(cors());
app.use(bodyParser.json());

// Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http:localhost:8080/synchAuction');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

io.on("connection", socket => { 
    console.log("new client connected!")

    socket.on('joinAuctionChat', ({userName, auctionId}) => {
        console.log(`Hello ${userName}, youre in ${auctionId}`)
        const usr = utils.addUserToChat(socket.id, userName, auctionId)

        socket.join(usr.roomId)
    })

    socket.on('sendMessage', (messageInfo, callback) => {
        //io.emit('message', { text: message });
        const usr = utils.getUserById(socket.id)
        currentDate = new Date();
        console.log(currentDate);
        io.to(usr.roomId)
        .emit('message', 
        {
            position: 'left', 
            title: messageInfo.userName, 
            type: 'text', 
            text: messageInfo.message, 
            date: currentDate
        });
        callback();
    });

    // socket.on('disconnect', () => {
    //     const usr = utils.removeUserFromChat(socket.id)
    //     console.log(`removed: ${usr.userName}`)
    // })

});

app.get('/', (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});


const HTTP_PORT = process.env.PORT || 8080;
httpServer.listen(HTTP_PORT,()=>{
    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    console.log(chalk.yellow(`WEB SERVER:`), chalk.green(` STARTED AT PORT ${HTTP_PORT}`));
})