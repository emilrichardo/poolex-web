<template>
  <div class="fixed bottom-10 left-10 z-10">
    <a :href="`${linkForm}`" target="_blank" rel="noopener noreferrer"
      class="bg-primary shadow-xl shadow-[#555555] rounded-lg flex items-center justify-center px-4 py-2 hover:bg-primary-600 border-white border-2">
      <p class="flex flex-nowrap text-white font-medium">{{ locale === "es" ? "Dona Aquí" : "Donate Here" }}</p>
    </a>
  </div>
</template>
<script setup>
const { locale } = useI18n();
const linkForm = "https://bit.ly/Donation_Foundation"
</script>
