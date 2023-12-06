<template>
  <div class="fixed bottom-10 right-10 z-10">
    <a :href="`https://api.whatsapp.com/send?phone=${whastappNumber}&text=${message}`" target="_blank"
      rel="noopener noreferrer"
      class="bg-[#4dc247] shadow-md rounded-full aspect-square flex items-center justify-center w-12 h-12 hover:bg-green-600">
      <Icon size="32px" name="ic:outline-whatsapp" color="white"></Icon>
    </a>
  </div>
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";

const message = "%C2%A1Hola!%2C%20quisiera%20conocer%20m%C3%A1s%20sobre%20Poolex"

const useOptions = useGlobalOptions();
const whastappNumber = useOptions.options.data.data.attributes.whatsapp_number;
</script>
