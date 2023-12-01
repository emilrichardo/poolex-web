<template>
  <section id="testimonials" class="bg-product pt-24 px-3">
    <div class="container lg:max-w-screen-md xl:max-w-screen-lg">
      <h2 class="text-center text-white text-4xl mb-8">
        {{ locale === "es" ? "Testimonios" : "Testimonials" }}
      </h2>
      <div class="bg-white relative px-5 py-6 md:px-16 md:pt-12 md:pb-8 lg:px-24 lg:pt-20 lg:pb-10">
        <Carousel :wrap-around="true" :autoplay="6000">
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
              <div class="container mx-auto">
                <Pagination />
              </div>
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
const { locale } = useI18n();
const { content } = defineProps(["content"]);
</script>
