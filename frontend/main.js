import axios from 'axios';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import testData from './javascript/test-data';
// import { ReadProducts, CreateProducts, DeleteProducts, Fibonacci } from './javascript'
import { ReadProducts, CreateProducts, DeleteProducts, Fibonacci } from './javascript/test';

const TESTS = 100;

const createChartCanvas = document.getElementById('create-chart');
const readChartCanvas = document.getElementById('read-chart');
const deleteChartCanvas = document.getElementById('delete-chart');
const fibonacciChartCanvas = document.getElementById('fibonacci-chart');

const nodeTestButton = document.getElementById('node-test-button');
const nodeCreateResult = document.getElementById('node-create-result');
const nodeReadResult = document.getElementById('node-read-result');
const nodeDeleteResult = document.getElementById('node-delete-result');
const nodeFibonacciResult = document.getElementById('node-fibonacci-result');
nodeTestButton.addEventListener('click', debounce(TestApi, 500, 'node', nodeTestButton));

const goTestButton = document.getElementById('go-test-button');
const goCreateResult = document.getElementById('go-create-result');
const goReadResult = document.getElementById('go-read-result');
const goDeleteResult = document.getElementById('go-delete-result');
const goFibonacciResult = document.getElementById('go-fibonacci-result');
goTestButton.addEventListener('click', debounce(TestApi, 500, 'go', goTestButton));

const labels = [];
for (let i = 0; i < TESTS; i++) {
  labels.push(i);
}

const Data = {
  labels: labels,
};

const createData = Object.create(Data);
const readData = Object.create(Data);
const deleteData = Object.create(Data);
const fibonacciData = Object.create(Data);

const lineChartConstructor = (canvas, data) => {
  const chart = new Chart(canvas, {
    type: 'line',
    data: data,
    options: {
      onClick: (e) => {
        const canvasPosition = getRelativePosition(e, chart);
        // Substitute the appropriate scale IDs
        const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
        const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
      }
    }
  });

  return chart;
}

const createChart = lineChartConstructor(createChartCanvas, createData);
const readChart = lineChartConstructor(readChartCanvas, readData);
const deleteChart = lineChartConstructor(deleteChartCanvas, deleteData);
const fibonacciChart = lineChartConstructor(fibonacciChartCanvas, fibonacciData);

function debounce(fn, delay, tech, button) {
  let timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(tech, button);
    }, delay);
  }
}

function Factory(tech) {
  let port, color, createResult, readResult, deleteResult, fibonacciResult;
  switch (tech) {
    case 'node':
      port = 3000;
      createResult = nodeCreateResult;
      readResult = nodeReadResult;
      deleteResult = nodeDeleteResult;
      fibonacciResult = nodeFibonacciResult
      color = 'rgb(255, 193, 123)';
      break;

    default:
      port = 9010;
      createResult = goCreateResult;
      readResult = goReadResult;
      deleteResult = goDeleteResult;
      fibonacciResult = goFibonacciResult
      color = 'rgb(124, 192, 255)';
      break;
  }
  return { createResult, readResult, deleteResult, fibonacciResult, color, port };
}

async function TestApi(tech, button) {
  console.log('TestApi');
  const { createResult, readResult, deleteResult, fibonacciResult, color, port } = Factory(tech);
  const label = (tech, test) => `${tech.toUpperCase()} api ${test} test`;
  const selectComponents = (test) => {
    let resultComponent, chartComponent;
    switch (test) {
      case 'create':
        resultComponent = createResult;
        chartComponent = createChart;
        break;
      case 'read':
        resultComponent = readResult;
        chartComponent = readChart;
        break;
      case 'fibonacci':
        resultComponent = fibonacciResult;
        chartComponent = fibonacciChart;
        break;
      default:
        resultComponent = deleteResult;
        chartComponent = deleteChart;
        break;
    }
    return { resultComponent, chartComponent }
  }
  const tests = ['create', 'read', 'delete', 'fibonacci'];
  button.disabled = true;
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const { resultComponent, chartComponent } = selectComponents(test);
    await Test(test, resultComponent, chartComponent, color, port, label, tech);
  }
  button.disabled = false;
}

async function Test(test, resultComponent, chartComponent, color, port, label, tech) {
  console.log(`${test} test started`);

  const TestManager = {
    create: async function (resultComponent, port, products) {
      // return await CreateProducts({ resultComponent, products, port });
      const createTest = new CreateProducts(resultComponent, port, products);
      return await createTest.runTest();
    },
    read: async function (resultComponent, port, tests) {
      // return await ReadProducts({ resultComponent, tests, port });
      const readTest = new ReadProducts(resultComponent, port, tests);
      return await readTest.runTest();
    },
    delete: async function (resultComponent, port, products) {
      // return await DeleteProducts({ resultComponent, products, port });
      const deleteTest = new DeleteProducts(resultComponent, port, products);
      return await deleteTest.runTest();
    },
    fibonacci: async function (resultComponent, port, tests) {
      // return await Fibonacci({ resultComponent, tests, port });
      const fibonacciTest = new Fibonacci(resultComponent, port, tests, 30);
      return await fibonacciTest.runTest();
    },
    execute: async function (name) {
      return await TestManager[name] && TestManager[name].apply(TestManager, [].slice.call(arguments, 1));
    }
  }

  const index = chartComponent.data.datasets.findIndex((data) => data.label.includes(tech.toUpperCase()));
  const times = await TestManager.execute(test, resultComponent, port, test === 'read' || test === 'fibonacci' ? TESTS : testData);
  const dataset = {
    label: label(tech, test),
    data: times,
    fill: false,
    borderColor: color,
    tension: 0.1
  };
  index >= 0 ?
    chartComponent.data.datasets[index] = dataset
    :
    chartComponent.data.datasets.push(dataset)
  chartComponent.update();
}