var cardmanager=require('./sockets.js');
console.log(cardmanager)
const socket = cardmanager('https://dof-test.herokuapp.com');
//'https://dof-test.herokuapp.com'
//'http://localhost:2000'

exports.socket=socket