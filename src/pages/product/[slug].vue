<template>
  <Hero :title="useGetLocale(locale, product).name" :caption="useGetLocale(locale, product).description" :background="imageLink || product.attributes?.Featured_image?.data?.attributes?.url
    " bgStyle="half">
    <template #cta>
      <div class="gap-4 px-4 lg:px-0">
        <div v-if="product.attributes?.broker_url ||
          product.attributes?.broker_url_2
          " :class="` flex flex-col  md:flex-row justify-center lg:justify-normal gap-2 w-full`">
          <template v-if="!globalOptions.userData?.success">
            <NuxtLink v-if="product.attributes?.register_link" :to="product.attributes?.register_link">
              <button
                class="bg-product shadow-lg border-primary shadow-product hover:bg-primary-200 text-accesible-primary text-sm py-2 px-4 rounded-xl min-h-[40px] min-w-[180px]">
                {{ locale === "es" ? "Regístrate ahora" : "Register now" }}
              </button>
            </NuxtLink>
          </template>
          <template v-else>
            <a v-if="product.attributes?.backoffice_url" :href="product.attributes?.backoffice_url" target="_blank">
              <Button type="button" variant="primary_shadow" size="sm">{{
                locale === "es"
                ? "Ingresar al Backoffice"
                : "Enter the back office"
              }}</Button>
            </a>
          </template>

          <a v-if="product.attributes?.broker_url && !product.attributes?.broker_url_2"
            :href="product.attributes?.broker_url" target="_blank">
            <Button type="button" variant="secondary" size="sm" class="min-h-[40px] min-w-[180px]">
              <Icon name="ri:line-chart-line"></Icon>
              {{ locale === "es" ? "Ir a Broker" : "Go to Broker" }}
            </Button>
          </a>

          <div v-if="product.attributes?.broker_url_2 && product.attributes?.broker_url"
            class="w-full flex flex-col gap-2 md:gap-0 md:flex-row">
            <a v-if="product.attributes?.broker_url" :href="product.attributes?.broker_url" target="_blank">
              <button
                :class="`text-secondary min-h-[40px] min-w-[180px] border-secondary hover:border-secondary-600 hover:text-secondary-600 hover:bg-secondary-100/40 ${product.attributes?.broker_url_2 ? 'rounded-xl border-2 md:border-r-0 md:rounded-l-xl md:rounded-r-none md:border-l-2 md:border-t-2 md:border-b-2' : 'rounded-xl '}`">
                <Icon name="ri:line-chart-line"></Icon>
                {{ locale === "es" ? "Ir a Broker" : "Go to Broker" }}
              </button>
            </a>
            <a v-if="product.attributes?.broker_url_2" :href="product.attributes?.broker_url_2" target="_blank">
              <button
                class="text-secondary min-h-[40px] min-w-[180px] rounded-xl md:rounded-r-xl md:rounded-l-none border-secondary border-2 hover:border-secondary-600 hover:text-secondary-600 hover:bg-secondary-100/40">
                <Icon name="ri:line-chart-line"></Icon>
                {{ locale === "es" ? "Segundo Broker" : "Second Broker" }}
              </button>
            </a>
          </div>
        </div>
      </div>
    </template>
  </Hero>

  <!-- <pre class="text-primary">{{ useGetLocaleSections(locale, product) }}</pre> -->
  <component nt v-for="section in useGetLocaleSections(locale, product).sections" :key="section.id"
    :is="formatName(section.__component)" :content="section">
  </component>
</template>
<script setup>
import { useGlobalData } from "@/stores/getGlobaData";
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGetLocale, useGetLocaleSections } from "@/composables/getLocale";
const { locales, locale } = useI18n();
const globalData = useGlobalData();
const globalOptions = useGlobalOptions();
const route = useRoute();
const product = ref(null);

const productColor = computed(() => {
  if (product.value.attributes?.color) {
    return ":root{--product: " + product.value.attributes?.color + "};";
  }
});

const filterProduct = computed(() => {
  for (let i = 0; i < globalData.products.length; i++) {
    if (
      globalData.products[i]?.attributes &&
      globalData.products[i]?.attributes?.slug === route.params.slug
    ) {
      return globalData.products[i];
    }
  }
  return null;
});

// Actualizar el valor de product cuando cambia la búsqueda
product.value = filterProduct.value;
globalData.setCurrentProduct(product?.value?.attributes?.slug);
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
  title: product.value.attributes?.name,
  meta: [
    {
      name: "description",
      content: product.value.attributes?.description,
    },
  ],
  bodyAttrs: {
    class: "theme-" + product.value.attributes?.slug,
  },
  style: [{ children: productColor.value }],
});

let imageLink;
switch (product.value.attributes?.slug) {
  case "academy":
    imageLink =
      "https://res.cloudinary.com/di4frs2px/image/upload/v1698338432/academy_2_29504487ad.png?updated_at=2023-10-26T16:40:37.431Z";
    break;

  case "investment":
    imageLink =
      "https://res.cloudinary.com/di4frs2px/image/upload/v1698338820/investment_1_b845e0b3df.png?updated_at=2023-10-26T16:47:02.155Z";
    break;

  case "space":
    imageLink =
      "https://res.cloudinary.com/di4frs2px/image/upload/v1698338958/space_2_b639e469f0.png?updated_at=2023-10-26T16:49:22.854Z";
    break;

  case "trading":
    imageLink = "";
    break;

  case "eco-real-estate":
    imageLink =
      "https://res.cloudinary.com/di4frs2px/image/upload/v1698443777/eco_1_67fa5334a6.png?updated_at=2023-10-27T21:56:19.157Z";
    break;
  default:
    break;
}
</script>

<style>
/* .text_academy_color{
background-color: ;
} */
</style>
