<template>
    <div>
        testeando
        <div v-if="!pending">
            <pre>{{ data }}</pre>
        </div>

    </div>
</template>
<script setup>
import {useGlobalData}  from '@/stores/getGlobaData'
import { useIntervalFn } from '@vueuse/core'

const globalData = useGlobalData()

const { pending, data, error, refresh } = await  useFetch('https://strapi-114755-0.cloudclusters.net/api/option')
useIntervalFn(() => {
  refresh() // will call the 'todos' endpoint, just above
  globalData.setteam(data)

}, 30000) // call it back every 3s

</script>
