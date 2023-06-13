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
