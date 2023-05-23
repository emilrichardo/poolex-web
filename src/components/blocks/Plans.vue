<template>
  <section class="plans bg-light-100 py-16">
    <div ref="container" class="container relative"></div>
    <div class="carousel-container" :style="`margin-left: ${marginRight}px`">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="plan in content.plan" :key="plan.id" class="plan">
          <div
            class="rounded overflow-hidden bg-white mx-6 flex flex-col h-full"
          >
            <div
              v-if="plan.name"
              class="py-3 px-8 bg-product text-white font-bold text-center w-full"
            >
              {{ plan.name }}
            </div>
            <div class="px-8 py-8 flex flex-col items-center">
              <img
                v-if="plan.icon.data"
                :src="plan.icon?.data?.attributes?.url"
                :alt="plan.name"
                class="h-28 mb-14 flex-none"
              />
              <ul class="flex flex-col text-xl font-light">
                <li v-if="plan.duration">{{ plan.duration }}</li>
                <li
                  class="py-3 my-3 border border-light-400 border-r-0 border-l-0"
                  v-if="plan.roi"
                >
                  ROI: <strong class="font-medium">{{ plan.roi }}</strong>
                </li>
                <li v-if="plan.description">{{ plan.description }}</li>
              </ul>
            </div>
          </div>
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
};

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  // 1024 and up
  1024: {
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
</style>
