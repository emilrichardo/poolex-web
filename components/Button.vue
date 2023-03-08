<template>
    <button :class="buttonFormat">
        <slot/>
    </button>
</template>
<script setup>
const {type, size, variant, className} = defineProps(['type', 'size', 'variant', 'className'])

const sizes = {
    xs: 'text-xs py-1 px-2',
    sm: 'text-sm py-2 px-4',
    md: 'text-lg py-2 px-6',
    lg: 'text-xl py-3 px-6',
    xl: 'text-2xl py-4 px-8',
}

const variants = {
    default: 'bg-white dark:bg-black',
    default_outline: ' border-black text-black dark:text-white dark:border-white',
    primary: 'bg-primary text-accesible-primary',
    primary_outline: ' border-primary text-black dark:text-white dark:border-white',
    secondary: 'bg-secondary text-accesible-secondary',
    secondary_outline: 'border-secondary text-black dark:text-white dark:border-white',
}

const types = {
    button : 'border rounded-lg',
    link : 'text-primary',
}

const buttonFormat = computed(()=>{
    if(type === 'link'){
        return  `${types.link} `
    } else if(type === 'button'){
        return `${types.button} ${variants[variant] || variants.default} ${sizes[size] || sizes.md }  `
    }
})



</script>