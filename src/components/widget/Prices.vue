<template>
  <div class="relative" v-if="type === 'stocks'">
    <div class="grid grid-cols-2 gap-4 border-b border-light-500 py-4 px-6">
      <div class="basis-1/2">
        {{ locale === "es" ? "Compañia" : "Company" }}
      </div>
      <div class="basis-1/2">{{ locale === "es" ? "Precio" : "Price" }}</div>
    </div>
    <ul class="max-h-[270px] overflow-y-auto py-4 px-6">
      <li class="grid grid-cols-2 gap-4" v-for="item in stocksAlpha">
        <div class="flex items-center gap-4">
          <div
            v-if="item.icon"
            class="icon-bg bg-dark text-white w-12 h-12 flex justify-center items-center rounded"
          >
            <Icon size="28" :name="item.icon"></Icon>
          </div>

          {{ item.name }}
        </div>
        <div
          :class="`card-price rounded-md px-4 py-2  my-2 text-right ${
            item.dif > 0
              ? ' bg-green-300 border border-green-300 text-green-600 bg-opacity-30'
              : 'bg-red-300 border border-red-300 text-red-900 bg-opacity-30'
          } `"
        >
          <h5>$ {{ item.price }}</h5>
          <p>{{ item.dif }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
const { locale } = useI18n();
const { type } = defineProps(["type"]);

const priceData = computed(() => {
  if (type === "crypto") {
    return;
  }
});

const stockData1 = ref(null);
const stockData2 = ref(null);
const stockData3 = ref(null);
const stockData4 = ref(null);
const stocksAlpha = ref(null);

async function getStockData() {
  try {
    // const res = await useFetch(
    //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=6WTAH252DQFFHX2K`OHJRU7KPVK97TDEP
    // );
    const res1 = await useFetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=OHJRU7KPVK97TDEP`
    );
    const res2 = await useFetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=GEZ9E3JNC3V08Q81`
    );
    const res3 = await useFetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AMZN&apikey=TRKV3SN1NDI9YGRI`
    );
    const res4 = await useFetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOG&apikey=UM0WRS93VJDH1IPQ`
    );
    stockData1.value = res1;
    stockData2.value = res2;
    stockData3.value = res3;
    stockData4.value = res4;

    stocksAlpha.value = [
      {
        icon: "mdi:microsoft",
        name: stockData1.value?.data["Global Quote"]["01. symbol"],
        price: stockData1.value?.data["Global Quote"]["05. price"],
        dif: stockData1.value?.data["Global Quote"]["09. change"],
      },
      {
        icon: "mdi:apple",
        name: stockData2.value?.data["Global Quote"]["01. symbol"],
        price: stockData2.value?.data["Global Quote"]["05. price"],
        dif: stockData2.value?.data["Global Quote"]["09. change"],
      },
      {
        icon: "mdi:amazon",
        name: stockData3.value?.data["Global Quote"]["01. symbol"],
        price: stockData3.value?.data["Global Quote"]["05. price"],
        dif: stockData3.value?.data["Global Quote"]["09. change"],
      },
      {
        icon: "mdi:google",
        name: stockData4.value?.data["Global Quote"]["01. symbol"],
        price: stockData4.value?.data["Global Quote"]["05. price"],
        dif: stockData4.value?.data["Global Quote"]["09. change"],
      },
    ];
  } catch (error) {
    console.log("Error al obtener los datos de stock:", error.message);
  }
}
getStockData();
</script>
