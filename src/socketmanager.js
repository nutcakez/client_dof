//var socketLib=require('./sockets.js');
var socketLib=require('socket.io-client').io;
let socket;
if(process.env.NODE_ENV=="development")
{
    socket = socketLib('http://localhost:2000')
}
else
{
    socket = socketLib('https://dof-test.herokuapp.com');
}

//'https://dof-test.herokuapp.com'
//'http://localhost:2000'

exports.socket=socket