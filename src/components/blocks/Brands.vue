<template>
  <section class="carousel-brands py-12">
    <Carousel v-if="content.carousel_active" :breakpoints="breakpoints">
      <Slide v-for="logo in content.logo" :key="logo.id">
        <div class="carousel__item">
          <div class="bg-light rounded-lg px-8 mx-4 py-8">
            <a :href="`${logo?.caption}`">
              <NuxtImg v-if="logo.icon?.data?.attributes?.url" :src="logo.icon?.data?.attributes?.url" :alt="logo.title"
                :class="`w-52`" />
            </a>
          </div>
        </div>
      </Slide>
    </Carousel>
    <div v-else class="flex justify-center gap-8 items-center">
      <div v-for="logo in content.logo">
        <a href="
        ">
          <NuxtImg v-if="logo.icon?.data?.attributes?.url" :src="logo.icon?.data?.attributes?.url" :alt="logo.title"
            :class="`${imageSize[content.size]} min-w-[180px]`" />
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
    itemsToShow: Math.min(showSlides.value, 3), // Mostrar hasta 3 elementos en pantallas más grandes
    snapAlign: "center",
  },
  1400: {
    itemsToShow: Math.min(showSlides.value, 5), // Mostrar hasta 4 elementos en pantallas aún más grandes
    snapAlign: "center",
  },
};

const imageSize = {
  sm: "w-[200px]",
  md: "w-[240px]",
  lg: "w-[345px]",
  xl: "w-[400px]",
};
</script>
