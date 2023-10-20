const http = require('http');
let host = 3000;
const EventEmitter = require("events");
const customEmitter = new EventEmitter();

let arr = [];

function addNumsFunction(num)
{
    arr.push(num);
}

customEmitter.addListener('addNumsFunction', addNumsFunction);

let i = 0;

let myInterval = setInterval(function () {
    i++;
    console.log(i);
    customEmitter.emit('addNumsFunction', i);

    if (i === 20)
    {
        clearInterval(myInterval);
    }
}, 1000);

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});    
    res.end(JSON.stringify(arr));
});

server.listen(host, '127.0.0.1', () => {
    console.log('Pazdravleywn!');
});
