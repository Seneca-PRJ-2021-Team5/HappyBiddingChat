const express = require("express");
const cors = require("cors");
corsOptions={
    cors:{
        origins:["http://localhost:5000"]
    }
}
const chalk = require('chalk'); // to style console.log texts
const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, corsOptions);
app.use(cors());

io.on("connection", socket => { 
    console.log("new client connected!")

    socket.on('sendMessage', (message, callback) => {
        //io.emit('message', { text: message });

        currentDate = new Date();
        console.log(currentDate);
        io.emit('message', 
        {
            position: 'left', 
            title: 'User', 
            type: 'text', 
            text: message, 
            date: currentDate
        });
        callback();
    });

});


const HTTP_PORT = process.env.PORT || 5000;
app.listen(HTTP_PORT,()=>{
    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    console.log(chalk.yellow(`WEB SERVER:`), chalk.green(` STARTED AT PORT ${HTTP_PORT}`));
})