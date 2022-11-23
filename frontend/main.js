function debounce(fn, delay, port, resultComponent) {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(port, resultComponent);
    }, delay);
  }
}

async function testApi(port, resultComponent) {
  const times = [];
  for (let i = 0; i < 10; i++) {
    const tax = (Math.random() * 10).toFixed(2);
    const start = performance.now();
    const response = await axios.get(`http://localhost:${port}/api/get_products_with_taxes/${tax}`);
    const end = performance.now();
    times.push(end - start);
  }
  const totalTime = times.reduce((a, b) => a + b, 0);
  resultComponent.innerText = `${totalTime / times.length}ms`;
}

const nodeTestButton = document.getElementById('node-test-button');
const nodeResult = document.getElementById('node-result');
nodeTestButton.addEventListener('click', debounce(testApi, 500, 3000, nodeResult));

const goTestButton = document.getElementById('go-test-button');
const goResult = document.getElementById('go-result');
goTestButton.addEventListener('click', debounce(testApi, 500, 9010, goResult));
