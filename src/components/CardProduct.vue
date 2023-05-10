<template>
  <div
    class="card relative bg-white rounded-lg overflow-hidden h-24 shadow-lg shadow-[#C6DDFF] flex items-center"
  >
    <svg
      class="absolute left-0 top-0 w-full"
      viewBox="0 0 266 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style="mix-blend-mode: overlay" opacity="0.38">
        <path
          d="M0 0H266V17.5C266 17.5 192.725 13.5 131.494 42C70.2642 70.5 55.7094 96 55.7094 96H0V0Z"
          fill="url(#paint0_linear_11_4758)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_11_4758"
          x1="133"
          y1="0"
          x2="133"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="0.9999" stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="card-body py-3 px-6 flex items-center">
      <img class="w-12" v-if="icon" :src="icon.data.attributes.url" />
      <h3 class="font-semibold text-lg">{{ title }}</h3>
    </div>
  </div>
</template>
<script setup>
const { title, color, icon } = defineProps(["title", "color", "icon", "icon"]);
</script>
<style>
.card {
  --color: v-bind(color);
  background-color: var(--color);
}
</style>
