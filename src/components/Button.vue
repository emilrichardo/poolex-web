<template>
  <button
    title="button-link"
    :class="`${buttonFormat} disabled:bg-opacity-50 transition-all duration-300 ease-out`"
  >
    <slot />
  </button>
</template>
<script setup>
const { type, size, variant, className } = defineProps([
  "type",
  "size",
  "variant",
  "className",
]);

const sizes = {
  xs: "text-xs py-1 px-2",
  sm: "text-sm py-2 px-4",
  md: "text-lg py-2 px-6",
  lg: "text-xl py-3 px-6",
  xl: "text-2xl py-4 px-8",
};

const variants = {
  default: "bg-secondary border-secondary dark:bg-black",
  default_outline:
    "border border-light-500 hover:bg-secondary text-black dark:text-white dark:border-white",
  primary:
    "bg-primary border-primary hover:bg-primary-200 text-accesible-primary",
  primary_outline:
    "border border-primary text-primary dark:text-white dark:border-white hover:bg-primary hover:text-accesible-primary",
  primary_shadow:
    "bg-primary shadow shadow-lg shadow-primary-100 shadow border-primary hover:bg-primary-200 text-accesible-primary",
  secondary: "bg-secondary hover:bg-secondary-200 text-accesible-secondary",
  secondary_outline:
    "border border-secondary text-secondary dark:text-white dark:border-white hover:bg-secondary hover:text-white",
  dark_outline:
    "border border-dark-500 hover:bg-dark text-black hover:text-white dark:border-whit",
};

const types = {
  button: "rounded-xl",
  submit: "rounded-xl",
  link: "hover:text-primary",
};

const buttonFormat = computed(() => {
  if (type === "link") {
    return `${types.link} `;
  } else if (type === "button" || type === "submit") {
    return `${types.button} ${variants[variant] || variants.default} ${
      sizes[size] || sizes.md
    }  `;
  }
});
</script>
