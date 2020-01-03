var cardmanager=require('./sockets.js');
console.log(cardmanager)
const socket = cardmanager('localhost:2000');

exports.socket=socket
exports.alma="pew"