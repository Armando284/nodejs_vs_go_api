import axios from 'axios';

export async function Fibonacci({ port, resultComponent, tests }) {
  console.log('Fibonacci');
  const times = [];
  const index = 30;
  for (let i = 0; i < tests; i++) {
    const start = performance.now();
    const response = await axios.get(`http://localhost:${port}/api/fibonacci/${index}`);
    const end = performance.now();
    times.push(end - start);
    // Log one to test response and don't fill the console
    if (i === tests - 1) console.log("last fibonacci response:", response);
  }
  const totalTime = times.reduce((a, b) => a + b, 0);
  resultComponent.innerText = `${totalTime / times.length}ms`;
  return times;
}