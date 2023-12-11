<template>
  <div>
    <section class="bg-light border-t py-16">
      <div class="container max-w-[1024px]">
        <h2 class="text-3xl text-center mb-2 font-semibold">
          {{ locale == "es" ? "Proyecta tu inversión" : "Project your investment" }}
        </h2>
        <hr class="border-b-product border-b-4 w-1/4 mx-auto mb-6" />
        <div class="form grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="input-group flex flex-col gap-1">
            <label class="text-sm" for="select_plan">Plan</label>
            <select class="py-2 px-2 focus:outline-primary" id="select_plan" v-model="selectedPlanId">
              <option v-for="plan in locale == 'es' ? plansSpanish : plansEnglish" :key="plan.id" :value="plan.id">
                {{ plan.name }}
              </option>
            </select>
          </div>
          <div class="input-group flex flex-col gap-1">
            <label class="text-sm" for="amount">{{ locale == "es" ? "Monto" : "Investment amount" }}
            </label>
            <input class="py-2 px-2 focus:outline-primary" v-model="amount" type="number" id="amount" />
          </div>
        </div>

        <div class="total text-center mt-24" v-if="totalProfit">
          <h5>{{ locale == "es" ? "Beneficios totales" : "Total profits" }}</h5>
          <h4 class="text-primary text-2xl md:text-4xl font-light">
            {{ totalProfit.toFixed(2) }}
          </h4>
        </div>
      </div>
    </section>

    <div v-if="selectedPlan"
      class="card-plan-datail my-8 bg-white rounded-md shadow-lg max-w-[560px] mx-auto px-8 py-6 text-center flex flex-col gap-4">
      <div class="title bg-primary text-xl text-white py-2 font-semibold rounded-md" v-if="selectedPlan.name">
        {{ selectedPlan.name }}
      </div>
      <div class="months" v-if="selectedPlan.months">
        {{ selectedPlan.months }} {{ locale == "es" ? "Meses" : " Months" }}
      </div>
      <div class="roy" v-if="selectedPlan.roi">
        ROI {{ selectedPlan.roi }} %
      </div>
      <div class="roy" v-if="selectedPlan.withdraw">
        {{
          locale == "es"
          ? "Retiro de intereses después del primer mes:"
          : "Withdrawal of interest after first month:"
        }}
        {{ selectedPlan.withdraw }} %
      </div>
    </div>

    <div class="container max-w-[1024px">
      <table class="min-w-full divide-y divide-gray-200" v-if="rows.length > 1">
        <thead>
          <tr>
            <th class="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ locale == "es" ? "Mes" : " Month" }}
            </th>
            <th class="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Profit
            </th>
            <th class="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" :class="[index % 2 === 0 ? 'bg-white' : 'bg-gray-100']">
            <td class="px-6 py-1 whitespace-nowrap">{{ row.month }}</td>
            <td class="px-6 py-1 whitespace-nowrap">
              {{ row.profit.toFixed(2) }}
            </td>
            <td class="px-6 py-1 whitespace-nowrap">
              {{ row.balance.toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
const { locale } = useI18n();

const plansSpanish = ref([
  { id: 1, name: "Básico", roi: 4, months: 12, withdraw: 1 },
  { id: 2, name: "Negocio", roi: 4.5, months: 24, withdraw: 13 },
  { id: 3, name: "Profesional", roi: 5, months: 48, withdraw: 25 },
  { id: 4, name: "Sueños", roi: 5.5, months: 84, withdraw: 61 },
  { id: 5, name: "Jubilación", roi: 6, months: 120, withdraw: 120 },
]);

const plansEnglish = ref([
  { id: 1, name: "Bassic", roi: 4, months: 12, withdraw: 1 },
  { id: 2, name: "Business", roi: 4.5, months: 24, withdraw: 13 },
  { id: 3, name: "Professional", roi: 5, months: 48, withdraw: 25 },
  { id: 4, name: "Dreams", roi: 5.5, months: 84, withdraw: 61 },
  { id: 5, name: "Retirement", roi: 6, months: 120, withdraw: 120 },
]);

const selectedPlanId = ref(1);
const selectedPlan = computed(() => {
  const plansToSearch = locale?._value == 'es' ? plansSpanish.value : plansEnglish.value;
  return plansToSearch.find((plan) => plan.id === selectedPlanId.value);
});

const amount = ref(0);
const rows = ref([]);
const totalProfit = ref(0);

watch(selectedPlanId, (newVal) => {
  calculate();
});

watch(amount, (newVal) => {
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
    let profit = (balance * roi) / 100;
    if (month > months - 2) {
      profit = 0; // Establecer el interés en 0 para los últimos dos meses
    }

    balance += profit;
    totalProfit.value = balance - amount.value;

    rows.value.push({
      month,
      profit,
      balance,
    });
  }
};
</script>
