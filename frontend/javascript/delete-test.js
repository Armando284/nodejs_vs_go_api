import axios from 'axios';

export async function DeleteProducts({ resultComponent, products, port }) {
  console.log('DeleteProducts');
  const times = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const start = performance.now();
    const result = await axios.delete(`http://localhost:${port}/api/delete_product/${product.id}`);
    const end = performance.now();
    times.push(end - start);
  }
  const totalTime = times.reduce((a, b) => a + b, 0);
  resultComponent.innerText = `${totalTime / times.length}ms`;
  return times;
}