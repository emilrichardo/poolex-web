<template>
  <section class="plans bg-[#444444] py-14 sm:pt-19 sm:pb-12 ">
    <div ref="container" class="container relative"></div>
    <h3 class="`font-medium text-md text-center width-full`">{{ content.title }}</h3>
    <hr class="h-[2px] bg-primary mx-auto w-[20%]" />
    <div class="carousel-container" :style="`margin-left: ${marginRight}px`">
      <Carousel v-bind="settings" :breakpoints="breakpoints" class="carousel_gold">
        <Slide v-for="plan in content.plan" :key="plan.id" class="plan sm:min-w-[280px]">
          <iframe :src="content.item.url" class="w-24 h-24" frameborder="0"></iframe>
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>

    <br />
  </section>
</template>
<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
const { content } = defineProps(["content"]);

const settings = {
  wrapAround: true,
  autoplay: "4000",
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

const container = ref(null);
const containerWidth = ref(0);
const marginRight = ref();

onMounted(() => {
  const updateWidth = () => {
    const containerRect = container.value.getBoundingClientRect();
    containerWidth.value = containerRect.width;
    marginRight.value =
      window.innerWidth - (containerRect.left + containerRect.width);
  };
  updateWidth();
  window.addEventListener("resize", updateWidth);
});
</script>
<style>
.carousel__pagination {
  justify-content: center !important;
  padding-top: 24px;
}

.carousel_gold .carousel__pagination-button {
  background-color: #71553c !important;
}

.carousel_gold .carousel__pagination-button--active {
  background-color: #9F8134 !important;
}
</style>
