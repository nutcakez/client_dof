var cardmanager=require('./sockets.js');
console.log(cardmanager)
let socket;
if(process.env.NODE_ENV=="development")
{
    socket = cardmanager('http://localhost:2000')
}
else
{
    socket = cardmanager('https://dof-test.herokuapp.com');
}

//'https://dof-test.herokuapp.com'
//'http://localhost:2000'

exports.socket=socket