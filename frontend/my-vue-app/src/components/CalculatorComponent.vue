<!-- 
<template>
  <div>
    <h1>Calculator</h1>
    <input v-model="num1" placeholder="Enter first number" type="number"/>
    <input v-model="num2" placeholder="Enter second number" type="number"/>
    <button @click="performOperation('addition')">Add</button>
    <button @click="performOperation('subtraction')">Subtract</button>
    <button @click="performOperation('multiplication')">Multiply</button>
    <button @click="performOperation('division')">Divide</button>
    <p v-if="result !== null">Result: {{ result }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CalculatorComponent',
  data() {
    return {
      num1: '',
      num2: ''
    };
  },
  computed: {
    ...mapState(['result', 'error'])
  },
  methods: {
    ...mapActions(['calculate']),
    performOperation(operation) {
      this.calculate({ endpoint: operation, num1: this.num1, num2: this.num2 });
    }
  }
};
</script> -->

<template>
  <div class="calculator">
    <div class="display">{{ displayValue }}</div>
    <div class="buttons">
      <button @click="appendNumber(1)">1</button>
      <button @click="appendNumber(2)">2</button>
      <button @click="appendNumber(3)">3</button>
      <button @click="appendOperator('+')">+</button>
      <button @click="appendNumber(4)">4</button>
      <button @click="appendNumber(5)">5</button>
      <button @click="appendNumber(6)">6</button>
      <button @click="appendOperator('-')">-</button>
      <button @click="appendNumber(7)">7</button>
      <button @click="appendNumber(8)">8</button>
      <button @click="appendNumber(9)">9</button>
      <button @click="appendOperator('*')">x</button>
      <button @click="appendNumber(0)">0</button>
      <button @click="clearDisplay">C</button>
      <button @click="calculateResult">=</button>
      <button @click="appendOperator('/')">÷</button>
    </div>
    <p v-if="result !== null">Result: {{ result }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CalculatorComponent',
  data() {
    return {
      displayValue: '0'
    };
  },
  computed: {
    ...mapState(['result', 'error'])
  },
  methods: {
    ...mapActions(['calculate']),
    appendNumber(number) {
      if (this.displayValue === '0') {
        this.displayValue = String(number);
      } else {
        this.displayValue += String(number);
      }
    },
    appendOperator(operator) {
      if (this.displayValue !== '0' && !this.displayValue.endsWith(operator)) {
        this.displayValue += operator;
      }
    },
    clearDisplay() {
      this.displayValue = '0';
    },
    calculateResult() {
      const expression = this.displayValue;
      const operation = this.getOperation(expression);

      if (operation) {
        const operands = expression.split(new RegExp('[+\\-*\\/]'));
        const num1 = parseFloat(operands[0]);
        const num2 = parseFloat(operands[1]);

        if (!isNaN(num1) && !isNaN(num2)) {
          this.calculate({ endpoint: operation, num1, num2 });
        } else {
          this.error = 'Invalid numbers provided';
        }
      } else {
        this.error = 'Invalid expression';
      }
    },
    getOperation(expression) {
      if (expression.includes('+')) return 'addition';
      if (expression.includes('-')) return 'subtraction';
      if (expression.includes('*')) return 'multiplication';
      if (expression.includes('/')) return 'division';
      return null;
    }
  }
};
</script>

<style scoped>
.calculator {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.display {
  font-size: 24px;
  font-weight: bold;
  text-align: right;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  font-size: 18px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
