<template>
  <div class="relative" v-if="type === 'stocks'">
    <div class="grid grid-cols-2 gap-4 border-b border-light-500 py-4 px-6">
      <div class="basis-1/2">Company</div>
      <div class="basis-1/2">Price</div>
    </div>
    <ul class="max-h-[270px] overflow-y-auto py-4 px-6">
      <li class="grid grid-cols-2 gap-4" v-for="item in dataStock">
        <div class="flex items-center gap-4">
          <div
            v-if="item.icon"
            class="icon-bg bg-dark text-white w-12 h-12 flex justify-center items-center rounded"
          >
            <Icon size="28" name="mdi:apple"></Icon>
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
  <div class="relative" v-if="type === 'cryptos'">
    <div class="grid grid-cols-2 gap-4 border-b border-light-500 py-4 px-6">
      <div class="basis-1/2">Token</div>
      <div class="basis-1/2">Price</div>
    </div>
    <ul class="max-h-[270px] overflow-y-auto py-4 px-6">
      <li class="grid grid-cols-2 gap-4" v-for="item in dataStock">
        <div class="flex items-center gap-2">
          <div
            v-if="item.icon"
            class="w-12 h-12 bg-light-300 flex justify-center items-center rounded"
          >
            <Icon size="28" name="mdi:apple"></Icon>
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
const { type } = defineProps(["type"]);

const dataCrypto = [
  {
    icon: "mdi:apple",
    name: "Bitcoin",
    symbol: "btc",
    price: 27835,
    dif: -0.12,
  },
  {
    icon: "mdi:ethereum",
    name: "Ethereum",
    symbol: "eth",
    price: 7835,
    dif: 1.2,
  },
  {
    icon: "ph:coins",
    name: "Tether",
    symbol: "usdt",
    price: 0.992,
    dif: -0.02,
  },
  {
    icon: "mdi:apple",
    name: "Bitcoin",
    symbol: "btc",
    price: 27835,
    dif: -0.12,
  },
  {
    icon: "mdi:ethereum",
    name: "Ethereum",
    symbol: "eth",
    price: 7835,
    dif: 1.2,
  },
  {
    icon: "ph:coins",
    name: "Tether",
    symbol: "usdt",
    price: 0.992,
    dif: -0.02,
  },
];

const dataStock = [
  {
    icon: "mdi:apple",
    name: "Apple",
    price: 1234,
    dif: -0.12,
  },
  {
    icon: "mdi:netflix",
    name: "Netflix",
    symbol: "eth",
    price: 7835,
    dif: 3.2,
  },
  {
    icon: "mdi:uber",
    name: "Uber",
    price: 0.992,
    dif: -0.02,
  },
  {
    icon: "mdi:apple",
    name: "Apple",
    price: 1234,
    dif: -0.12,
  },
  {
    icon: "mdi:netflix",
    name: "Netflix",
    symbol: "eth",
    price: 7835,
    dif: 3.2,
  },
  {
    icon: "mdi:uber",
    name: "Uber",
    price: 0.992,
    dif: -0.02,
  },
];

const priceData = computed(() => {
  if (type === "crypto") {
    return;
  }
});

const iconApple = `<svg fill="#000000" width="800px" height="800px" viewBox="-52.01 0 560.035 560.035" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier">
<path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"/>
</g>
</svg>`;
</script>
