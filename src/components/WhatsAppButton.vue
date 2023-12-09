<template>
  <div class="fixed bottom-10 right-10 z-10 move-short">
    <a :href="`https://api.whatsapp.com/send?phone=${whastappNumber}&text=${message}`" target="_blank"
      rel="noopener noreferrer"
      class="bg-[#4dc247] shadow-xl shadow-[#555555] rounded-full aspect-square flex items-center justify-center w-14 h-w-14 hover:bg-green-600 border-white border-2">
      <Icon size="36px" name="ic:outline-whatsapp" color="white"></Icon>
    </a>
  </div>
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";

const message = "%C2%A1Hola%2C%20Deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20poolex!"

const useOptions = useGlobalOptions();
const whastappNumber = useOptions.options?.data?.data?.attributes?.whatsapp_number ? useOptions.options.data.data.attributes.whatsapp_number : "0";
</script>
