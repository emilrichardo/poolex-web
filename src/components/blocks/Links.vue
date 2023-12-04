<template>
  <section
    :class="`plans  ${globalData?.currentProduct === 'trade' ? 'text-white bg-transparent my-12 md:mt-16 md:mb-28' : 'bg-[#f6f6fb] pt-24 pb-14 px-6 md:px-12'}`">
    <div
      :class="`${globalData?.currentProduct === 'trade' ? 'bg-gradient-to-r from-[#9747FF] via-[#A8B2FF] to-[#1AAFFD] min-h-[100px] md:h-[175px] grid place-content-center' : 'hidden'}`">
      <h3 :class="`font-medium text-2xl text-center w-full`">{{
        content.title }}</h3>
    </div>
    <h3 :class="`font-medium text-2xl text-center w-full ${globalData?.currentProduct === 'trade' && 'hidden'}`">{{
      content.title }}</h3>
    <hr :class="`h-[4px] bg-primary mx-auto w-[18%] mt-2 mb-6 ${globalData?.currentProduct === 'trade' && 'hidden'}`" />
    <div
      :class="`carousel-container ${globalData?.currentProduct === 'trade' && 'bg-[#f6f6fb] shadow-lg mx-0 rounded-none md:rounded-lg md:mx-[2%] pb-7 md:pb-12 md:px-12 md:-mt-11'}`">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="video in content.Link" :key="video" class="py-10">
          <div class="neomorphism_video rounded-lg w-full md:min-w-[300px] bg-[#F1F1F7] p-4 mx-2 my-6">
            <p v-if="video.label" class="capitalize mb-[8px]">{{ video.label }}</p>
            <iframe class="w-full aspect-video" :src="getFullYoutubeLink(video.url)"
              title="YouTube video player"></iframe>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
          <!-- <Navigation /> -->
        </template>
      </Carousel>
    </div>
  </section>
</template>
<script setup>
import { useGlobalData } from "@/stores/getGlobaData";
const globalData = useGlobalData();
const { content } = defineProps(["content"]);
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const settings = {
  wrapAround: true,
  itemsToShow: 1,
  snapAlign: "center",
};

const breakpoints = {
  // 700px and up
  728: {
    itemsToShow: "2.5",
    snapAlign: "start",
  },
  // 1024 and up
  1080: {
    itemsToShow: "3.5",
    snapAlign: "start",
  },
};

const getFullYoutubeLink = (shortLink) => {
  const videoCode = getVideoCodeFromLink(shortLink);
  return `https://www.youtube.com/embed/${videoCode}`;
};

const getVideoCodeFromLink = (link) => {
  // Extraer el código del video desde el enlace corto o completo
  const videoCode = link.split('/').pop().split('?')[0];
  return videoCode;
};

</script>
<style scoped>
.carousel__pagination {
  justify-content: center !important;
  padding-top: 24px;
}

.neomorphism_video {
  box-shadow: 7px 7px 14px #CDCDD2, -7px -7px 14px #f9f8fd;
}
</style>
