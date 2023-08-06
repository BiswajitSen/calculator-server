const net = require('node:net');

const setOnConnection = (server) => {
  server.on('connection', (socket) => {
    socket.setEncoding('utf-8');
    console.log('connection established.');

    const echoClientMessage = (message) => {
      console.log('client says :', message);
      socket.write(`${message}`);
    };

    socket.on('data', echoClientMessage);
    socket.on('end', () => console.log('connection closed.'));
  });
};

const main = () => {
  const server = new net.Server();
  server.listen(8080);
  setOnConnection(server);
};

main();
