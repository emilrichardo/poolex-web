<template>
    Home
    <div>


    </div>
</template>

<script setup>

import axios from 'axios'
import {useGlobalData}  from '@/stores/getGlobaData'




const globalData = useGlobalData()


const dataTeam = ref(null)

async function getUser() {
  try {
    const response = await axios.get('http://localhost:1337/api/our-team?populate=*');
    dataTeam.value = response
    globalData.setTeam(response)
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
getUser()





</script>