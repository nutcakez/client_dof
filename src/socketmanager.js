var cardmanager=require('./sockets.js');
console.log(cardmanager)
const socket = cardmanager('https://dof-test.herokuapp.com');

exports.socket=socket
exports.alma="pew"