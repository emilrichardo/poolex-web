<template>
  <div class="container my-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
      <div class="caption flex flex-col justify-center gap-8">
        <h3 class="font-semibold text-3xl" v-if="content.headings.headline">
          {{ content.headings.headline }}
        </h3>
        <p class="text-xl font-light" v-if="content.headings.caption">
          {{ content.headings.caption }}
        </p>
      </div>
      <div class="features flex flex-col gap-8 ">
        <div v-for="item in content.features"
          class="item-feature bg-light rounded-md py-4 px-10 shadow-lg w-full sm:max-w-[96%] mx-auto sm:m-0">
          <h4 v-if="item.headline" class="text-primary mb-2 text-2xl font-semibold">
            {{ item.headline }}
          </h4>
          <p v-if="item.caption">{{ item.caption }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="hidden bg-primary py-24 mt-24">
    <div class="container text-center">
      <h3 class="text-2xl text-light mb-8">
        Contáctanos en nuestra dirección de email:
      </h3>
      <Button variant="default" type="button" size="md">vicepresidencia@poolex.io</Button>
      <h2 class="text-4xl font-light text-light mt-8">
        ¡Tú eres parte fundamental de este sueño!
      </h2>
    </div>
  </div>
</template>
<script setup>
const { content } = defineProps(["content"]);
</script>
