<template>
  <div
    @click="tooggleProduct()"
    class="card relative bg-white rounded-lg overflow-hidden h-24 shadow-lg neomorphism flex items-center transition-all cursor-pointer hover:scale-105"
  >
    <span
      class="w-4 h-4 bg-primary text-light flex items-center justify-center border-2 border-light border-opacity-20 rounded-full absolute right-3 top-3"
      v-if="isRegister"
    >
      <Icon name="mdi:check" />
    </span>
   
    <div class="card-body py-3 px-6 flex items-center">
      <NuxtImg
        class="w-8 flex-none mr-2"
        v-if="icon"
        :src="icon.data?.attributes?.url"
        alt="icon_product"
      />
      <h3 class="font-semibold text-lg text-primary-700">{{ title }}</h3>
    </div>
  </div>
  <div
    v-if="openPanel"
    class="panel w-full h-full py-6 px-10 bg-white absolute z-20 top-0 left-0 bg-opacity-90 backdrop-blur"
  >
    <div class="panel-header flex justify-between">
      <h3 v-if="title" class="text-lg font-medium">{{ title }}</h3>
      <div class="flex gap-4">
        <nuxt-link :to="localePath('/product/' + data?.attributes?.slug)">
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
        <NuxtImg
          v-if="data?.attributes?.Featured_image?.data"
          class="hidden md:block rounded-lg w-full"
          :src="data?.attributes?.Featured_image?.data?.attributes?.url"
          alt="product image"
        />
        <div class="caption lg:col-span-2 text-lg">
          <p>{{ useLocaleComponent(locale, data).description }}</p>
          <div class="flex gap-4 mt-4">
            <NuxtLink
              v-if="data?.attributes?.register_link"
              :to="data?.attributes?.register_link"
              ><Button type="button" size="sm" variant="primary_shadow">{{
                locale === "es" ? "¡Consiguelo ahora!" : "Get it now!"
              }}</Button></NuxtLink
            >
            <nuxt-link :to="localePath('/product/' + data?.attributes?.slug)">
              <Button type="button" variant="default" size="sm">{{
                locale === "es" ? "Ver más" : "View more"
              }}</Button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="h-full flex items-center justify-center py-4"
          v-if="loadingData"
        >
          <Icon name="svg-spinners:dot-revolve"></Icon>
        </div>
        <div
          class="dataArray col-span-3 bg-light rounded-md shadow-lg"
          v-for="plan in currentData?.data_array"
        >
          <h3
            class="flex justify-between font-semibold text-md border-b py-2 px-4 cursor-pointer"
            @click="togglePlan(plan.name)"
          >
            <span>{{ plan.name }}</span>
            <Icon
              :name="`${
                planIsOpen
                  ? 'heroicons:chevron-up-20-solid'
                  : 'heroicons:chevron-down-20-solid'
              }`"
            ></Icon>
          </h3>
          <div
            v-if="planIsOpen === plan.name"
            class="grid grid-cols-1 lg:grid-cols-3 gap-1 py-2 px-4"
          >
            <template v-for="(value, key) in plan">
              <h5 v-if="key != 'name'" class="text-xs">
                <strong class="font-semibold"
                  >{{ convertirCadena(key) }}:
                </strong>
                {{ value }}
              </h5>
            </template>
          </div>
        </div>
        <div
          v-if="currentData?.success"
          class="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-4"
        >
          <div v-for="(value, key) in currentData?.data">
            <h5 class="font-semibold">{{ convertirCadena(key) }}</h5>
            <h4 class="text-md">$ {{ value }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLocaleComponent } from "@/composables/getLocale";
import { useGlobalData } from "@/stores/getGlobaData";

const globalData = useGlobalData();

const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();

const localePath = useLocalePath();
const { title, color, icon, isRegister, data } = defineProps([
  "title",
  "color",
  "icon",
  "isRegister",
  "data",
]);

const openPanel = ref(false);

const tooggleProduct = () => {
  openPanel.value = !openPanel.value;

  if (data?.success) {
    getContent(data?.attributes?.api_endpoint, data?.cookie);
  }
};
const mainCookie = ref(null);

const currentData = ref(null);

const loadingData = ref(true);

const getContent = async (endpoint, cookie) => {
  if (globalData.myProducts) {
    const res = globalData.myProducts?.find((obj) => obj.bo === "investment");
    mainCookie.value = removeString(res.cookie);
  }

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Secret: mainCookie.value,
    },
  };

  const resApi = await useFetch(
    runtimeConfig.public.apiSession + endpoint,
    requestOptions
  );

  if (!resApi.pending.value) {
    console.log(resApi.pending.value);
    loadingData.value = false;
  }

  if (resApi.error !== null) {
    currentData.value = resApi.data?.value;
  }
};

const removeString = (string) => {
  var indice = string.indexOf("=");
  if (indice !== -1) {
    return string.substring(indice + 1);
  } else {
    return string;
  }
};

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

function convertirCadena(cadena) {
  // Dividir la cadena en palabras separadas por "_"
  var palabras = cadena.split("_");

  // Capitalizar la primera letra de cada palabra
  var resultado = palabras.map(function (palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  });

  // Unir las palabras en una sola cadena separadas por espacio
  return resultado.join(" ");
}

//toogle plan

const planIsOpen = ref(false);

const togglePlan = (planName) => {
  if (planIsOpen.value && planIsOpen.value === planName) {
    planIsOpen.value = false; // Si el plan actualmente abierto es el mismo que se hizo clic, se cierra
  } else {
    planIsOpen.value = planName; // Si el plan actualmente abierto es diferente, se actualiza al nuevo plan
  }
};
</script>
<style>
.card {
  --color: v-bind(color);
  background-color: var(--color);
}
</style>
