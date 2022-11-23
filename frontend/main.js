function debounce(fn, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, ...args);
    }, delay);
  }
}

async function testNodeApi() {
  console.log('fn run!')
  const times = [];
  for (let i = 0; i < 2; i++) {
    const tax = (Math.random() * 10).toFixed(2);
    const start = performance.now();
    const response = await axios.get(`http://localhost:3000/api/get_products_with_taxes/${tax}`);
    console.log(response);
    const end = performance.now();
    times.push(end - start);
    // console.log(times);
  }
  const totalTime = times.reduce((a, b) => a + b, 0);
  nodeResult.innerText = `${totalTime / times.length}ms`;
}

const nodeTestButton = document.getElementById('node-test-button');
const nodeResult = document.getElementById('node-result');
nodeTestButton.addEventListener('click', debounce(testNodeApi, 500));
