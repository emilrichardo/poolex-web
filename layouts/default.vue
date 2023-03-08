<template>
    <div>
        <Header/>
        <main>
            <slot/>
        </main>

    </div>
</template>
<script setup>
import qs from 'qs'
import {computed, ref} from "vue"
import {useGlobalOptions} from '@/stores/getGlobaOptions'


const useOptions = useGlobalOptions()

const query = qs.stringify({
    populate : {
        header:{
            populate:'*'
        }
    }
})

const optionsFromApi = await useFetch(`/api/option?${query}`)


useOptions.setOptions(optionsFromApi)


</script>