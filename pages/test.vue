<template>
    <div>
        testeando
        {{ data.data.value.data.attributes }}

    </div>
</template>
<script setup>
const data = useFetch('https://strapi-114755-0.cloudclusters.net/api/option')
console.log(data.data.value.data.attributes);

</script>
