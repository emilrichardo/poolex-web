<template>
  <div class="pt-24 bg-product">
    {{ productColor }}
    {{ currentProduct }}
  </div>
</template>
<script setup>
import { useGlobalData } from "@/stores/getGlobaData";
const globalData = useGlobalData();
const route = useRoute();

//filter product

const currentProduct = ref(null);

const productColor = computed(() => {
  if (currentProduct.value.attributes.color) {
    return ":root{--product: " + currentProduct.value.attributes.color + "};";
  }
});

const filterProduct = computed(() => {
  for (let i = 0; i < globalData.products.length; i++) {
    if (
      globalData.products[i].attributes &&
      globalData.products[i].attributes.slug === route.params.slug
    ) {
      return globalData.products[i];
    }
  }
  return null;
});

// Actualizar el valor de currentProduct cuando cambia la búsqueda
currentProduct.value = filterProduct.value;

useHead({
  title: currentProduct.value.attributes.name,
  meta: [
    {
      name: "description",
      content: currentProduct.value.attributes.description,
    },
  ],
  bodyAttrs: {
    class: "theme-" + currentProduct.value.attributes.slug,
  },
  style: [{ children: productColor.value }],
});
</script>
