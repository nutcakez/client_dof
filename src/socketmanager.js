var socketLib=require('./sockets.js');
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