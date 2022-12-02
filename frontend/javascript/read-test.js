import axios from 'axios';

export async function ReadProducts({ port, resultComponent, tests }) {
  console.log('ReadProducts');
  const times = [];
  for (let i = 0; i < tests; i++) {
    const start = performance.now();
    const response = await axios.get(`http://localhost:${port}/api/get_products`);
    const end = performance.now();
    times.push(end - start);
  }
  const totalTime = times.reduce((a, b) => a + b, 0);
  resultComponent.innerText = `${totalTime / times.length}ms`;
  return times;
}