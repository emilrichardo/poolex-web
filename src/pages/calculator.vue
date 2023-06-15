<template>
  <div>
    <select id="select_plan" v-model="selectedPlanId">
      <option v-for="plan in plans" :key="plan.id" :value="plan.id">
        {{ plan.name }}
      </option>
    </select>

    <input class="border border-primary" v-model="amount" type="number" />
    {{ amount }}

    <div
      v-if="selectedPlan"
      class="card-plan-datail bg-white rounded-md shadow-lg max-w-[560px] mx-auto px-8 py-6 text-center flex flex-col gap-4"
    >
      <div
        class="title bg-primary text-xl text-white py-2 font-semibold rounded-md"
        v-if="selectedPlan.name"
      >
        {{ selectedPlan.name }}
      </div>
      <div class="months" v-if="selectedPlan.months">
        {{ selectedPlan.months }} months
      </div>
      <div class="roy" v-if="selectedPlan.roi">
        ROI {{ selectedPlan.roi }} %
      </div>
      <div class="roy" v-if="selectedPlan.withdraw">
        Withdrawal of interest after first month: {{ selectedPlan.withdraw }} %
      </div>
    </div>

    <Button @click="calculate()">Calculate</Button>

    {{ totalProfit.toFixed(2) }}

    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Profit</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ row.month }}</td>
          <td>{{ row.profit.toFixed(2) }}</td>
          <td>{{ row.balance.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
const plans = ref([
  { id: 1, name: "Bassic", roi: 4, months: 12, withdraw: 1 },
  { id: 2, name: "Business", roi: 4.5, months: 24, withdraw: 13 },
  { id: 3, name: "Professional", roi: 5, months: 48, withdraw: 25 },
  { id: 4, name: "Dreams", roi: 5.5, months: 84, withdraw: 61 },
  { id: 5, name: "Retirement", roi: 6, months: 120, withdraw: 120 },
]);

const selectedPlanId = ref(1);
const selectedPlan = computed(() => {
  return plans.value.find((plan) => plan.id === selectedPlanId.value);
});

const amount = ref(100);
const rows = ref([]);
const totalProfit = ref(0);

watch(selectedPlanId, (newVal) => {
  calculate();
});

watch(amount, (newVal) => {
  amount.value = newVal;
  calculate();
});

onMounted(() => {
  calculate();
});

const calculate = () => {
  rows.value = [];
  if (!amount.value || amount.value <= 0) {
    return;
  }
  const { roi, months } = selectedPlan.value;
  let balance = amount.value;

  for (let month = 1; month <= months; month++) {
    const profit = (balance * roi) / 100;
    balance += profit;
    totalProfit.value += profit;

    rows.value.push({
      month,
      profit,
      balance,
    });
  }
};
</script>
<!--


<script setup>
const plan1 = { id: 1, name: "Basic", roi: 4, months: 12, withdraw: 1 };
const plan2 = { id: 2, name: "Business", roi: 4.5, months: 24, withdraw: 13 };
const plan3 = { id: 3, name: "Professional", roi: 5, months: 48, withdraw: 25 };
const plan4 = { id: 4, name: "Dreams", roi: 5.5, months: 84, withdraw: 61 };
const plan5 = { id: 5, name: "Retirement", roi: 6, months: 120, withdraw: 120 };
const plans = [plan1, plan2, plan3, plan4, plan5];

const selectedPlanId = ref(null);
const amount = ref(null);
const selectedPlan = ref(null);
const totalProfit = ref(0);
const rows = ref([]);
const profits = ref([]);
const balances = ref([]);

watch(selectedPlanId, (newVal) => {
  selectedPlan.value = plans.find((plan) => plan.id === newVal);
});

const calculate = () => {
  if (selectedPlan.value && amount.value) {
    const rowsArray = Array.from(Array(selectedPlan.value.months).keys());
    const newProfits = [];
    const newBalances = [];
    let totalInvest = parseFloat(amount.value);
    let totalProfitValue = 0;

    for (let row of rowsArray) {
      let profit = (parseFloat(selectedPlan.value.roi) / 100.0) * totalInvest;

      if (row + 1 > selectedPlan.value.months - 2) {
        profit = 0;
      }

      totalInvest += profit;
      totalProfitValue += profit;
      newProfits.push(parseFloat(profit).toFixed(2));
      newBalances.push(parseFloat(totalInvest).toFixed(2));
    }

    Vue.set(rows, "value", rowsArray);
    profits.value = newProfits;
    balances.value = newBalances;
    totalProfit.value = totalProfitValue.toFixed(2);
  }
};
</script>

<template>
  <div>
    <select id="select_plan" v-model="selectedPlanId">
      <option v-for="plan in plans" :key="plan.id" :value="plan.id">
        {{ plan.name }}
      </option>
    </select>
    <input id="amount" type="number" v-model="amount" />
    <button data-button @click="calculate">Calculate</button>

    <div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Profit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody id="content_table">
          <tr v-for="(row, index) in rows" :key="index">
            <td class="table-data">{{ row }}</td>
            <td class="table-data">
              {{ parseFloat(profits[index]).toFixed(2) }}
            </td>
            <td class="table-data">
              {{ parseFloat(balances[index]).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <p>
        Total Profit:
        <span id="total_profit">{{ parseFloat(totalProfit).toFixed(2) }}</span>
      </p>
      <p>
        Plan Name:
        <span id="plan_name">{{ selectedPlan ? selectedPlan.name : "" }}</span>
      </p>
      <p>
        ROI: <span id="roi">{{ selectedPlan ? selectedPlan.roi : "" }}%</span>
      </p>
      <p>
        Months:
        <span id="months">{{ selectedPlan ? selectedPlan.months : "" }}</span>
      </p>
      <p>
        Withdraw:
        <span id="withdraw">{{
          selectedPlan ? selectedPlan.withdraw : ""
        }}</span>
      </p>
    </div>
  </div>
</template>
 -->
