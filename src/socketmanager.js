var cardmanager=require('./sockets.js');
console.log(cardmanager)
const socket = cardmanager('http://localhost:2000');
//'https://dof-test.herokuapp.com'

exports.socket=socket
exports.alma="pew"