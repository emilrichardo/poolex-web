<template>
  <section id="testimonials" class="bg-product pt-24 px-3">
    <div class="container max-w-[1024px]">
      <h2 class="text-center text-white text-4xl mb-8">Testimonials</h2>
      <div class="bg-white relative px-24 py-24">
        <Carousel :wrap-around="true" :autoplay="4000">
          <template v-for="testimonial in content.testimonial" :key="product">
            <Slide>
              <div class="">
                <h4 class="text-left">{{ testimonial.body }}</h4>
                <p class="text-right font-bold mt-8">
                  - {{ testimonial.testifier }}
                </p>
              </div>
            </Slide>
          </template>
          <template #addons>
            <div class="w-full justify-center">
              <div class="container mx-auto"><Pagination /></div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
const { content } = defineProps(["content"]);
</script>
