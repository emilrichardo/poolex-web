<template>
  <Header />
  <h2>{{ locale }}</h2>
  {{ i18 }}

  <main class="container mx-auto in-h-full">
    <slot />
  </main>
  <Footer />
</template>
<script setup>
import qs from "qs";
import { computed, ref } from "vue";
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGlobalData } from "@/stores/getGlobaData";

import { useGetColors } from "@/composables/getColors";

const { locales, locale } = useI18n();
const i18 = useI18n();

const useOptions = useGlobalOptions();

const query = qs.stringify({
  populate: {
    header: {
      populate: "*",
    },
    colors: {
      populate: "*",
    },
    Social_networks: {
      populate: "*",
    },
    localizations: {
      populate: "*",
    },
  },
});

const optionsFromApi = await useFetch(`/api/option?${query}`);

useOptions.setOptions(optionsFromApi);

const useData = useGlobalData();
const productsFromApi = await useFetch(`/api/products?populate=*`);
useData.setProducts(productsFromApi.data.value.data);

const { themeColors, themeStylesTag } = useGetColors();

themeColors(optionsFromApi.data.value.data.attributes.colors);

// meta datos
useHead({
  style: [{ children: themeStylesTag }],
});
</script>
