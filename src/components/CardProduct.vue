<template>
  <div
    @click="tooggleProduct()"
    class="card relative bg-white rounded-lg overflow-hidden h-24 shadow-lg shadow-[#C6DDFF] flex items-center transition-all cursor-pointer hover:scale-105"
  >
    <span
      class="w-4 h-4 bg-primary text-light flex items-center justify-center border-2 border-light border-opacity-20 rounded-full absolute right-3 top-3"
      v-if="isRegister"
    >
      <Icon name="mdi:check" />
    </span>
    <svg
      class="absolute left-0 top-0 w-full"
      viewBox="0 0 266 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style="mix-blend-mode: overlay" opacity="0.38">
        <path
          d="M0 0H266V17.5C266 17.5 192.725 13.5 131.494 42C70.2642 70.5 55.7094 96 55.7094 96H0V0Z"
          fill="url(#paint0_linear_11_4758)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_11_4758"
          x1="133"
          y1="0"
          x2="133"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="0.9999" stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="card-body py-3 px-6 flex items-center">
      <img
        class="w-12 flex-none mr-2"
        v-if="icon"
        :src="icon.data.attributes.url"
      />
      <h3 class="font-semibold text-lg">{{ title }}</h3>
    </div>
  </div>
  <div
    v-if="openPanel"
    class="panel w-full h-full py-6 px-10 bg-white absolute z-20 top-0 left-0 bg-opacity-90 backdrop-blur"
  >
    <div class="panel-header flex justify-between">
      <h3 class="text-lg font-medium">{{ title }}</h3>
      <div class="flex gap-4">
        <nuxt-link :to="localePath('/product/' + attributes.slug)">
          <template v-if="isRegister">
            <Button type="button" variant="default" size="sm">{{
              locale === "es" ? "Ver más" : "View more"
            }}</Button>
          </template>
        </nuxt-link>
        <Button
          @click="openPanel = !openPanel"
          type="button"
          class="pr-8"
          variant="default_outline"
          size="sm"
          ><Icon class="ml-2" name="heroicons:chevron-left-solid" />
          <span class="hidden lg:inline-block">Back</span>
        </Button>
      </div>
    </div>
    <div class="panel-body text-sm pt-4">
      <div v-if="!isRegister" class="grid lg:grid-cols-3 gap-5">
        <img
          v-if="attributes?.Featured_image.data"
          class="rounded-lg w-full"
          :src="attributes.Featured_image?.data?.attributes?.url"
          alt="product image"
        />
        <div class="caption lg:col-span-2 text-lg">
          <p>{{ attributes.description }}</p>
          <div class="flex gap-4 mt-4">
            <NuxtLink
              v-if="attributes.register_link"
              :to="attributes.register_link"
              ><Button type="button" size="sm" variant="primary_shadow">{{
                locale === "es" ? "¡Consiguelo ahora!" : "Get it now!"
              }}</Button></NuxtLink
            >
            <nuxt-link :to="localePath('/product/' + attributes.slug)">
              <Button type="button" variant="default" size="sm">{{
                locale === "es" ? "Ver más" : "View more"
              }}</Button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="" v-else>
        <h4 v-if="currentData.title" class="text-xl mb-4">
          {{ currentData.title }}
        </h4>
        <div class="grid grid-cols-2 gap-5">
          <div v-for="data in currentData.data">
            <h5 v-if="data.title">{{ data.title }}</h5>
            <h5 class="text-lg" v-if="data.amount">$ {{ data.amount }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";
const runtimeConfig = useRuntimeConfig();
const globalOptions = useGlobalOptions();
/* const counter = useCookie("counter", { domain: "staging.poolex.io" });

counter.value = "valor"; */

const localePath = useLocalePath();
const { title, color, icon, isRegister, attributes } = defineProps([
  "title",
  "color",
  "icon",
  "isRegister",
  "attributes",
]);

const staticAssets = ref([
  {
    product: "investment",
    title: "",
    data: [
      { title: "Invested Capital", amount: 78459 },
      { title: "Month’s Profit", amount: 2358491 },
      { title: "Accumulated Profit", amount: 689543 },
      { title: "Accumulated Commissions", amount: 957346 },
    ],
  },
  {
    product: "academy",
    title: "Diamond",
    data: [
      { title: "Month’s Commissions", amount: 12577 },
      { title: "Accumulated Commissions", amount: 4198625 },
      { title: "Accumulated Profit", amount: 73892 },
      { title: "Accumulated Commissions", amount: 623871 },
    ],
  },
]);

const currentData = ref(null);

const filterData = (slug) => {
  const res = staticAssets.value.filter((obj) => obj.product == slug)[0];
  currentData.value = res;
};
filterData(attributes.slug);

const openPanel = ref(false);
const panelData = ref(null);

const tooggleProduct = () => {
  openPanel.value = !openPanel.value;
  getContent();
};

const getContent = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Secret:
        "diefer-7f0bfd673629e063b5391e62b7a5f015ed8015a1d74d34d1118c700ca470579e",
    },
  };

  const investmentApi = await useFetch(
    runtimeConfig.public.apiSession + "/api/v1/invest_plans",
    requestOptions
  );

  console.log(investmentApi);
  /*  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      runtimeConfig.public.apiSession,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } */
};
</script>
<style>
.card {
  --color: v-bind(color);
  background-color: var(--color);
}
</style>
