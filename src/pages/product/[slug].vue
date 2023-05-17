<template>
  <Hero
    :title="useGetLocale(locale, product).name"
    :caption="useGetLocale(locale, product).description"
    :background="product.attributes.Featured_image.data?.attributes.url"
    bgStyle="half"
  >
    <template #cta>
      <div class="flex gap-4">
        <NuxtLink
          v-if="product.attributes.register_link"
          :to="product.attributes.register_link"
          ><Button type="button" variant="primary_shadow">{{
            locale === "es" ? "Registrate" : "Register"
          }}</Button></NuxtLink
        >
      </div>
    </template>
  </Hero>
  <template v-for="section in product.attributes.sections">
    <component
      v-for="section in product.attributes.sections"
      :key="section.id"
      :is="formatName(section.__component)"
      :content="section"
    ></component>
  </template>
  <!--  <component
    v-for="section in product.attributes.sections"
    :key="section.id"
    :is="formatName(component.__component)"
  ></component> -->
</template>
<script setup>
import { useGlobalData } from "@/stores/getGlobaData";
const { locales, locale } = useI18n();
const globalData = useGlobalData();
const route = useRoute();

//filter product

const product = ref(null);

const productColor = computed(() => {
  if (product.value.attributes.color) {
    return ":root{--product: " + product.value.attributes.color + "};";
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

// Actualizar el valor de product cuando cambia la búsqueda
product.value = filterProduct.value;

const formatName = (name) => {
  const newName = name
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replace(".", "")
    .replace("-", "")
    .replace(" ", "");
  return newName;
};

useHead({
  title: product.value.attributes.name,
  meta: [
    {
      name: "description",
      content: product.value.attributes.description,
    },
  ],
  bodyAttrs: {
    class: "theme-" + product.value.attributes.slug,
  },
  style: [{ children: productColor.value }],
});
</script>
