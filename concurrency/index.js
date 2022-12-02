const autocannon = require('autocannon');

function ConcurrencyTest() {
  const args = process.argv.slice(2);
  const url = `http://localhost:${args[0] || 3000}`;
  const connections = args[1] || 1000;
  const maxConnectionsRequests = args[2] || 1000;
  const duration = args[3] || 10;
  const instance = autocannon({
    url,
    connections,
    duration,
    maxConnectionsRequests,
    headers: {
      'Content-Type': 'application/json',
    },
    requests: [
      {
        method: 'GET',
        path: '/get_products'
      }
    ],
  });
  autocannon.track(instance);
}

ConcurrencyTest();