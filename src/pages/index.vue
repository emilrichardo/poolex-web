<template>
  <div class="bg-[#f0f4f8]">
    <Carousel v-if="globalData.products" :wrap-around="true" :autoplay="4000">
      <template v-for="product in globalData.products" :key="product">
        <Slide v-if="product?.attributes?.active">
          <Hero
            :title="useGetLocale(locale, product).name"
            :caption="useGetLocale(locale, product).description"
            :background="
              product.attributes?.Featured_image?.data?.attributes?.url
            "
          >
            <template #cta>
              <div class="flex gap-4 justify-center lg:justify-start">
                <NuxtLink
                  v-if="product.attributes?.register_link"
                  :to="product.attributes?.register_link"
                  ><Button type="button" variant="primary_shadow">{{
                    locale === "es" ? "Regístrate ahora" : "Register now"
                  }}</Button></NuxtLink
                >
                <nuxt-link
                  :to="localePath('/product/' + product.attributes?.slug)"
                >
                  <Button type="button" variant="secondary_outline">{{
                    locale === "es" ? "Ver más" : "View more"
                  }}</Button>
                </nuxt-link>
              </div>
            </template>
          </Hero>
        </Slide>
      </template>

      <template #addons>
        <div class="hidden lg:block absolute bottom-10 lg:bottom-20 w-full">
          <div class="container mx-auto">
            <Pagination />
          </div>
        </div>
      </template>
    </Carousel>

    <WidgetsHome />

    <div class="grid place-content-center pt-24">
      <!-- TODO Agregar link de conocenos -->
      <NuxtLink to="conocenos_link">
        <button
          class="border-2 border-primary text-primary dark:text-white dark:border-white hover:bg-primary hover:text-accesible-primary rounded-full text-lg font-semibold py-2 px-8"
        >
          {{ locale === "es" ? "¡Conócenos!" : "Know us!" }}
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useGlobalData } from "@/stores/getGlobaData";
import { useGlobalOptions } from "@/stores/getGlobaOptions";

import { useGetLocale } from "@/composables/getLocale";

const { locale } = useI18n();
const localePath = useLocalePath();

const globalData = useGlobalData();
const globalOptions = useGlobalOptions();

useHead({
  title: globalOptions.options.data?.data?.attributes?.Site_name,
  meta: [
    {
      name: "description",
      content: globalOptions.options.data?.data?.attributes?.Site_description,
    },
  ],
});
</script>
