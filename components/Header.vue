<template>
    <header class=" bg-gray-100 py-4">
        <div class="flex justify-between items-center mx-auto container" v-if="useOptions.options.data">
            <div class="brand">
                <img :src="apiBase+data?.header.logo_light.data.attributes.url" :alt="data?.Site_name">
            </div>
            <nav class="flex gap-8">
                <div class="menu_1">
                    <ul class=" flex flex-col md:flex-row gap-4">
                        <li v-for="item in data?.header.menu_links" :key="item.key" >
                            <template v-if="item.active" >
                                <NuxtLink v-if="item.internal" :to="item.url">
                                {{ item.label }}
                                </NuxtLink>
                                <a v-else :href="item.url" target="_blank">
                                    {{ item.label }}
                                </a>
                            </template>

                        </li>
                    </ul>
                </div>
                <div class="menu_2">
                    <ul class="flex flex-col md:flex-row">
                        <li v-for="item in data?.header.menu_links_2" :key="item.key" >
                            <template v-if="item.active" >
                                <NuxtLink v-if="item.internal" :to="item.url">
                                {{ item.label }}
                                </NuxtLink>
                                <a v-else :href="item.url" target="_blank">
                                    {{ item.label }}
                                </a>
                            </template>

                        </li>
                    </ul>
                </div>
            </nav>


        </div>
        <Alert type="danger" v-else>{{ useOptions.options.error }}</Alert>
        <!-- <NuxtImg src="" ></NuxtImg> -->


    </header>
</template>
<script setup>
import {useGlobalOptions} from '@/stores/getGlobaOptions'

const config = useRuntimeConfig();
const {apiBase} = config.public
const useOptions = useGlobalOptions()

const data = computed(()=>{
    if(useOptions.options.data){
        return useOptions.options.data.data.attributes
    } else{
        return null
    }
})

console.log(data.value);
</script>