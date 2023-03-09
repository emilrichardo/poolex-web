<template>

        <Header/>
        <main class="container mx-auto">
            <slot/>
        </main>


</template>
<script setup>
import qs from 'qs'
import {computed, ref} from "vue"
import {useGlobalOptions} from '@/stores/getGlobaOptions'
import {useGetColors} from '@/composables/getColors'


const useOptions = useGlobalOptions()

const query = qs.stringify({
    populate : {
        header:{
            populate:'*'
        },
        colors: {
            populate: '*'
        }
    }
})

const optionsFromApi = await useFetch(`/api/option?${query}`)


useOptions.setOptions(optionsFromApi)



const {themeColors, themeStylesTag} = useGetColors()

themeColors(optionsFromApi.data.value.data.attributes.colors)



// meta datos
useHead({
    style: [{children:  themeStylesTag }]
})

/* const d = useFetch('https://strapi-114755-0.cloudclusters.net/api/option')
console.log(d.data.value.data.attributes); */
</script>