<template>
  <header
    :class="` ${
      haveHero ? 'absolute' : 'relative'
    } z-50 w-full backdrop-blur-sm bg-light-100 bg-opacity-50 py-4 `"
  >
    <div class="mx-auto px-2 lg:px-8" v-if="globalOptions.options.data">
      <nav class="flex items-center justify-between gap-8">
        <div class="brand">
          <NuxtLink to="/">
            <NuxtImg
              v-if="data.header.logo_light.data?.attributes?.url"
              class="w-40"
              :src="data.header?.logo_light?.data?.attributes?.url"
              :alt="data?.Site_name"
            />
            <span v-else>{{ data?.Site_name }}</span>
          </NuxtLink>
        </div>
        <div class="menu_1">
          <ul
            :class="`${
              menuIsOpen
                ? 'block absolute bg-light top-0 pt-24 w-full left-0 -z-20 px-10 pb-10 !gap-12'
                : 'hidden'
            } lg:flex flex-col items-center md:flex-row gap-4`"
          >
            <li
              v-for="item in useGetLocale(
                locale,
                globalOptions.options.data.data
              ).header?.menu_links"
              :key="item.key"
            >
              <template v-if="item.active">
                <NuxtLink
                  v-if="item.name !== 'products'"
                  :to="localePath(item.url)"
                  @click="menuIsOpen = false"
                >
                  <Button
                    :type="item.type"
                    :size="item.size"
                    :variant="item.style"
                    >{{ item.label }}
                  </Button>
                </NuxtLink>
                <a
                  class="cursor-pointer hover:text-primary"
                  v-else
                  @click="toggleMegaMenu()"
                  >{{ item.label }}</a
                >
              </template>
            </li>
          </ul>
        </div>
        <div class="menu_2">
          <ul class="flex items-center md:flex-row gap-4">
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
                <Button
                  @click="openBo = !openBo"
                  type="button"
                  variant="primary"
                  size="sm"
                  >Backoffices
                  <Icon class="ml-2" name="heroicons:chevron-down-solid"
                /></Button>
                <div
                  v-if="openBo"
                  class="submenu border border-light-400 rounded absolute top-12 right-0 bg-white flex flex-col items-center w-60"
                >
                  <ul>
                    <li
                      v-for="item in globalOptions.userData.data_array"
                      class="py-2 px-4"
                    >
                      {{ item.bo }}
                    </li>
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
                class="flex"
                >Login</Button
              >
            </li>
            <li class="lg:hidden">
              <Button
                @click="toggleMenu()"
                type="button"
                :variant="menuIsOpen ? 'primary' : 'default'"
                size="sm"
              >
                <Icon name="heroicons:bars-2-20-solid" size="24"></Icon>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <Alert type="danger" v-else>{{ globalOptions.options.error }}</Alert>
    <MegaMenu
      v-if="megaMenuOpen"
      @toggleMegaMenu="toggleMegaMenu"
      @closeMenu="closeMenu"
    ></MegaMenu>

    <div
      @click="menuIsOpen = false"
      class="ovelay bg-primary opacity-0 -z-30 fixed w-screen h-screen"
      v-if="menuIsOpen"
    >
      overlay primary
    </div>
  </header>

  <Login v-if="modalState" @toggleModalLogin="toggleModalLogin" />
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGlobalData } from "@/stores/getGlobaData";
import { useGetLocale } from "@/composables/getLocale";

const globalData = useGlobalData();

const runtimeConfig = useRuntimeConfig();

const route = useRoute();

const localePath = useLocalePath();

const { locale } = useI18n();

const globalOptions = useGlobalOptions();

const options = ref(globalOptions);

const locaUserData = ref(JSON.parse(localStorage.getItem("userData")));

watch(options.value, (newValue) => {
  console.log("El valor en el local storage ha cambiado:", newValue.userData);
});

const menuIsOpen = ref(false);

const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value;
};

const closeMenu = () => {
  menuIsOpen.value = false;
};

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
    route.path === "/foundations" ||
    route.path === "/es/foundations" ||
    route.path.includes("/product")
  );
});

//login logout

const modalState = ref(false);

const toggleModalLogin = () => {
  modalState.value = !modalState.value;
};

const getLogOut = async () => {
  try {
    await fetch(`${runtimeConfig.public.apiSession}/api/v1/logout`);
    globalOptions.setUserData(null);
  } catch (error) {
    console.log(error);
  }
};

const openBo = ref(false);

const myBackOffices = computed(() => {
  if (globalOptions.userData) {
    const data = ref([]);
    globalOptions.userData.data_array.map((item) => {
      data.value.push({
        name: item.bo,
        user: item.username,
        cookie: item.cookie,
      });
    });
    return data;
  }
});

//globalOptions.setMyBO(data);

/// data by cookie

const getDataBo = async (endpoint, Secret) => {
  try {
    const response = await fetch(
      `${runtimeConfig.public.apiSession}/api/v1/${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Secret,
        },
      }
    );
    const json = await response.json();

    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

/// megamenu

const megaMenuOpen = ref(false);
const toggleMegaMenu = () => {
  megaMenuOpen.value = !megaMenuOpen.value;
};
</script>
