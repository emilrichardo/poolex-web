<template>
  <header
    :class="` ${
      haveHero && '----absolute'
    } z-50 w-full backdrop-blur-sm bg-light-100 bg-opacity-50 py-4 `"
  >
    <div class="mx-auto px-2 lg:px-8" v-if="globalOptions.options.data">
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
              v-for="item in useGetLocale(
                locale,
                globalOptions.options.data.data
              ).header.menu_links"
              :key="item.key"
            >
              <template v-if="item.active">
                <NuxtLink :to="localePath(item.url)">
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
            <template v-if="globalOptions.userData">
              <li>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  @click="getLogOut()"
                >
                  <span>Logout</span>
                  <Icon class="ml-2" name="heroicons-outline:logout" />
                </Button>
              </li>
              <li class="relative">
                <Button type="button" variant="primary" size="sm"
                  >Backoffices
                  <Icon class="ml-2" name="heroicons:chevron-down-solid"
                /></Button>
                <div
                  class="submenu border border-light-400 rounded absolute top-12 right-0 bg-white flex flex-col items-center w-60"
                >
                  <ul class="">
                    <li>Poolex</li>
                    <li>Poolex</li>
                    <li>Poolex</li>
                  </ul>
                </div>
              </li>
            </template>

            <li v-else>
              <Button
                @click="toggleModalLogin()"
                type="button"
                variant="primary"
                size="sm"
                >Login</Button
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <Alert type="danger" v-else>{{ globalOptions.options.error }}</Alert>
  </header>
  <Login v-if="modalState" @toggleModalLogin="toggleModalLogin" />
  {{ globalOptions.userData?.data_array }}
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGetLocale } from "@/composables/getLocale";
const runtimeConfig = useRuntimeConfig();

const route = useRoute();

const localePath = useLocalePath();

const { locale } = useI18n();

const globalOptions = useGlobalOptions();

const data = computed(() => {
  if (globalOptions.options.data) {
    return globalOptions.options.data.data.attributes;
  } else {
    return null;
  }
});

const haveHero = computed(() => {
  return (
    route.path === "/" ||
    route.path === "/es" ||
    route.params.hasOwnProperty("product")
  );
});

//login logout

const modalState = ref(false);

const toggleModalLogin = () => {
  modalState.value = !modalState.value;
};

const getLogOut = async () => {
  console.log(runtimeConfig.public);
  try {
    await fetch(`${runtimeConfig.public.apiSession}/api/v1/logout`);
    globalOptions.setUserData(null);
  } catch (error) {
    console.log(error);
  }
};
</script>
