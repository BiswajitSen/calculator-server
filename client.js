const net = require('node:net');

const setUpClient = (socket) => {
  socket.on('connect', () => {
    socket.setEncoding('utf-8');
    console.log('connected.');
    let count = 0;

    const intervalId = setInterval(() => {
      socket.write(`${count}`);
      count++;
      if (count > 5) {
        socket.end();
        clearInterval(intervalId);
      }
    }, 1000);
  });

  socket.on('data', (data) => {
    console.log(`server says:`, data);
  });
};

const main = () => {
  const socket = net.createConnection(8080);
  setUpClient(socket);
};

main();
