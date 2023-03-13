<template>
    <Button @click="refresh" type="button" variant="primary">refresh</Button>

    <div>
        {{ globalData.team }}


    </div>
</template>
<script setup>
import {useGlobalData}  from '@/stores/getGlobaData'


import qs from 'qs'

const globalData = useGlobalData()





</script>