<template>
  <Carousel :wrap-around="true" :autoplay="4000">
    <Slide v-for="product in globalData.products" :key="product">
      <Hero
        :title="useGetLocale(locale, product).name"
        :caption="useGetLocale(locale, product).description"
        :background="product.attributes.Featured_image.data?.attributes.url"
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
            <nuxt-link :to="localePath('/' + product.attributes.slug)">
              <Button type="button" variant="default">{{
                locale === "es" ? "Ver más" : "View more"
              }}</Button>
            </nuxt-link>
          </div>
        </template>
      </Hero>
    </Slide>

    <template #addons>
      <div class="absolute bottom-20 w-full">
        <div class="container mx-auto"><Pagination /></div>
      </div>
    </template>
  </Carousel>
  <WidgetsHome />
</template>

<script setup>
import axios from "axios";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useGlobalData } from "@/stores/getGlobaData";
import { useGetLocale } from "@/composables/getLocale";
const { locale } = useI18n();
const localePath = useLocalePath();

const globalData = useGlobalData();

const dataTeam = ref(null);

async function getUser() {
  try {
    const response = await axios.get(
      "http://localhost:1337/api/our-team?populate=*"
    );
    dataTeam.value = response;
    globalData.setTeam(response);
  } catch (error) {
    console.error(error);
  }
}
getUser();
</script>
