import axios from 'axios';

class Test {
  constructor(resultComponent, port, testData) {
    this.resultComponent = resultComponent;
    this.port = port;
    this.testData = testData;
    this.times = [];
  }

  async test(data) { }

  async runTest() {
    const isArray = typeof this.testData === 'object';
    const testLength = isArray ? this.testData.length : this.testData;
    for (let i = 0; i < testLength; i++) {
      const start = performance.now();
      const response = await this.test(isArray ? this.testData[i] : null);
      const end = performance.now();
      this.times.push(end - start);
    }
    const totalTime = this.times.reduce((a, b) => a + b, 0);
    this.resultComponent.innerText = `${totalTime / this.times.length}ms`;
    return this.times;
  }
}

export class CreateProducts extends Test {
  async test(product) {
    return await axios.post(`http://localhost:${this.port}/api/create_product`, { product });
  }
}

export class ReadProducts extends Test {
  async test(data) {
    return await axios.get(`http://localhost:${this.port}/api/get_products`);
  }
}

export class DeleteProducts extends Test {
  async test(data) {
    return await axios.delete(`http://localhost:${this.port}/api/delete_product/${data.id}`);
  }
}

export class Fibonacci extends Test {
  constructor(resultComponent, port, testData, index) {
    super(resultComponent, port, testData);
    this.index = index;
  }
  async test(data) {
    return await axios.get(`http://localhost:${this.port}/api/fibonacci/${this.index}`);
  }
}