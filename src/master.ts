import * as express from 'express';
import * as http from 'http';
import * as url from 'url';
import * as WebSocket from 'ws';


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', function connection(ws, req) {
  app.use(function (req, res) {
    ws.send('req');
    res.send({ msg: "hello" });
  });
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});