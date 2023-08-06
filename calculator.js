const net = require('node:net');

const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const parse = (expression) => expression.match(/([0-9]+)([+-\/\*])([0-9]+)/).slice(1);

const addQueryListner = (calculatorServer) => {
  calculatorServer.on('connection', (socket) => {
    console.log('client connected ....');

    socket.setEncoding('utf-8');

    socket.on('data', (expression) => {
      const [operand1, operator, operand2] = parse(expression);
      const operation = OPERATIONS[operator];

      if (operation) {
        const value = operation(+operand1, +operand2);
        socket.write(`answer: ${value}\n`);
        return;
      }
      socket.write('Invalid Expression\n');
    });
  });
};

const main = () => {
  const calculatorServer = new net.Server();
  addQueryListner(calculatorServer);
  calculatorServer.listen(8080, () => {
    console.log('server is listening to port: 8080');
  });
};

main();
