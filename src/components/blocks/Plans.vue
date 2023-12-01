<template>
  <section class="plans bg-[#444444] py-14 sm:pt-19 sm:pb-12 ">
    <div ref="container" class="container relative"></div>
    <div class="carousel-container ml-[4%] sm:ml-[7%]">
      <Carousel v-bind="settings" :breakpoints="breakpoints" class="carousel_gold">
        <Slide v-for="plan in content.plan" :key="plan.id" class="plan sm:min-w-[280px]">
          <div class="rounded overflow-hidden bg-[#2A2A2B] mx-4 xl:mx-6 flex flex-col h-full">
            <div v-if="plan.name" class="py-3 px-8 bg-[#9F6734] text-white font-bold text-center w-full">
              {{ plan.name }}
            </div>
            <div class="px-8 py-8 flex flex-col items-center text-white">
              <NuxtImg v-if="plan.icon.data" :src="plan.icon?.data?.attributes?.url" :alt="plan.name"
                class="h-28 mb-14 flex-none" />
              <ul class="flex flex-col text-md font-light">
                <li v-if="plan.duration">{{ plan.duration }}</li>
                <li class="py-3 my-3 border border-light-400 border-r-0 border-l-0" v-if="plan.roi">
                  ROI: <strong class="text-md font-light">{{ plan.roi }}</strong>
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
  autoplay: "6000",
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
