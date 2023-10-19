const http = require('http');
let host = 3000;
const EventEmitter = require("events");

const customEmitter = new EventEmitter();

let arr = [];

function addNamesFunction(name)
{
    arr.push(name);
}

customEmitter.addListener('addNamesEvent', addNamesFunction);

customEmitter.emit('addNamesEvent', "firstName");

customEmitter.emit('addNamesEvent', "secondName");

customEmitter.emit('addNamesEvent', "thirdName");

customEmitter.emit('addNamesEvent', "fourthName");

arr.forEach((item)=>{
    console.log(item);
})

customEmitter.removeListener('addNamesEvent', addNamesFunction);

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(arr));
});

server.listen(host, '127.0.0.1', () => {
    console.log('Pazdravleywn!');
});

