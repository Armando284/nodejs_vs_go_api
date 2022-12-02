import axios from 'axios';

export async function CreateProducts({ resultComponent, products, port }) {
  console.log('CreateProducts');
  const times = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const start = performance.now();
    const result = await axios.post(`http://localhost:${port}/api/create_product`, { product });
    const end = performance.now();
    times.push(end - start);
  }
  const totalTime = times.reduce((a, b) => a + b, 0);
  resultComponent.innerText = `${totalTime / times.length}ms`;
  return times;
}