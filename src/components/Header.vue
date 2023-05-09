<template>
  <header
    class="absolute z-50 w-full backdrop-blur-sm bg-light-100 bg-opacity-50 py-4"
  >
    <div class="mx-auto px-2 lg:px-8" v-if="useOptions.options.data">
      <nav class="flex items-center justify-between gap-8">
        <div class="brand">
          <NuxtLink to="/">
            <NuxtImg
              class="w-40"
              :src="data.header.logo_light.data.attributes.url"
              :alt="data?.Site_name"
            />
          </NuxtLink>
        </div>
        <div class="menu_1">
          <ul class="flex flex-col items-center md:flex-row gap-4">
            <li
              v-for="item in useGetLocale(locale, useOptions.options.data.data)
                .header.menu_links"
              :key="item.key"
            >
              <template v-if="item.active">
                <NuxtLink :to="item.url">
                  <Button
                    :type="item.type"
                    :size="item.size"
                    :variant="item.style"
                    >{{ item.label }}
                  </Button>
                </NuxtLink>
              </template>
            </li>
          </ul>
        </div>
        <div class="menu_2">
          <ul class="flex flex-col items-center md:flex-row gap-4">
            <li
              v-for="item in useGetLocale(locale, useOptions.options.data.data)
                .header.menu_links_2"
              :key="item.key"
            >
              <template v-if="item.active">
                <NuxtLink
                  :to="localePath(item.url)"
                  :target="` ${!item.internal ? '_self' : '_blank'}`"
                >
                  <Button
                    :type="item.type"
                    :size="item.size"
                    :variant="item.style"
                    >{{ item.label }}
                  </Button>
                </NuxtLink>
              </template>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <Alert type="danger" v-else>{{ useOptions.options.error }}</Alert>
  </header>
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGetLocale } from "@/composables/getLocale";

const localePath = useLocalePath();

const { locale } = useI18n();

const useOptions = useGlobalOptions();

const data = computed(() => {
  if (useOptions.options.data) {
    return useOptions.options.data.data.attributes;
  } else {
    return null;
  }
});
</script>
