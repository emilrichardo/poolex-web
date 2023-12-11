<template>
  <section class="carousel-brands py-12">
    <Carousel v-if="content.carousel_active" :breakpoints="breakpoints" :autoplay="false" :wrap-around="true">
      <Slide v-for="logo in content.logo" :key="logo.id">
        <div class="carousel__item ">
          <a :href="`${logo?.caption}`" target="_blank" rel="noopener noreferrer">
            <div class="bg-light rounded-lg px-8 mx-4 py-8 max-h-24">
              <NuxtImg v-if="logo.icon?.data?.attributes?.url" :src="logo.icon?.data?.attributes?.url" :alt="logo.title"
                height="100%" />
            </div>
          </a>
        </div>
      </Slide>
    </Carousel>
    <div v-else class="flex justify-center gap-8 items-center">
      <div v-for="logo in content.logo">
        <a href="
        ">
          <NuxtImg v-if="logo.icon?.data?.attributes?.url" :src="logo.icon?.data?.attributes?.url" :alt="logo.title"
            :class="`min-h-[90px] h-full`" />
        </a>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
const { content } = defineProps(["content"]);

const showSlides = computed(() => {
  if (content.logo.length < 7.5) {
    return content.logo.length;
  } else {
    return 7.5;
  }
});

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 3.5,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
    itemsToShow: Math.min(showSlides.value, 4),
    snapAlign: "center",
  },
  1400: {
    itemsToShow: Math.min(showSlides.value, 6),
    snapAlign: "center",
  },
};

const imageSize = {
  sm: "w-[200px]",
  md: "w-[260px]",
  lg: "w-[365px]",
  xl: "w-[420px]",
};
</script>
