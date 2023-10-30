<template>
  <section class="plans bg-[#f6f6fb] pt-24 pb-14 px-6 md:px-12">
    <h3 class="`font-medium text-2xl text-center w-full `">{{ content.title }}</h3>
    <hr class="h-[4px] bg-primary mx-auto w-[18%] mt-2 mb-6" />
    <div class="carousel-container">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="video in videoData.videos" :key="video" class="py-10">
          <div class="neomorphism_video rounded-lg w-full md:min-w-[300px] bg-[#F1F1F7] p-4 mx-2 my-6">
            <iframe class="w-full aspect-video" :src="video" title="YouTube video player" frameborder="0"></iframe>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
  {{ console.log("LINKS----") }}
  {{ console.log(content) }}
</template>
<script setup>
const { content } = defineProps(["content"]);
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const settings = {
  wrapAround: true,
  autoplay: false,
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

const videoData = {
  title: "Testimonios",
  videos: ["https://www.youtube.com/embed/jfKfPfyJRdk?si=TUGIQrMB6TOU9vY3", "https://www.youtube.com/embed/jfKfPfyJRdk?si=TUGIQrMB6TOU9vY3", "https://www.youtube.com/embed/jfKfPfyJRdk?si=TUGIQrMB6TOU9vY3", "https://www.youtube.com/embed/jfKfPfyJRdk?si=TUGIQrMB6TOU9vY3", "https://www.youtube.com/embed/jfKfPfyJRdk?si=TUGIQrMB6TOU9vY3", "https://www.youtube.com/embed/jfKfPfyJRdk?si=TUGIQrMB6TOU9vY3", "https://www.youtube.com/embed/jfKfPfyJRdk?si=TUGIQrMB6TOU9vY3"]
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
