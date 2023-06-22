<template>
  <div class="relative">
    <div class="grid grid-cols-2 gap-4 border-b border-light-500 py-4 px-6">
      <div class="basis-1/2">Token</div>
      <div class="basis-1/2">Price</div>
    </div>
    <ul class="max-h-[270px] overflow-y-auto py-4 px-6">
      <li class="grid grid-cols-2 gap-4" v-for="item in cryptoData.data?.value">
        <div class="flex items-center gap-2">
          <div
            v-if="item.image"
            class="w-12 h-12 bg-light-300 flex justify-center items-center rounded"
          >
            <NuxtImg
              class="w-16 px-2 flex-none"
              alt="icon-crypto"
              :src="item.image"
            />
          </div>

          {{ item.name }}
        </div>
        <div
          :class="`card-price rounded-md px-4 py-2  my-2 text-right ${
            item.price_change_percentage_24h > 0
              ? ' bg-green-300 border border-green-300 text-green-600 bg-opacity-30'
              : 'bg-red-300 border border-red-300 text-red-900 bg-opacity-30'
          } `"
        >
          <h5>$ {{ item.current_price?.toFixed(2) }}</h5>
          <p>{{ item.price_change_percentage_24h?.toFixed(2) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();
const { type } = defineProps(["type"]);

const apiParamsCrypto =
  "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const cryptoData = await useFetch(
  `${runtimeConfig.public.apiCryptoUrl}/${apiParamsCrypto}`
);
</script>
