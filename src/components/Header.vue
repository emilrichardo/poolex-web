<template>
  <header
    :class="` ${
      haveHero ? 'fixed' : 'fixed'
    } z-50 w-full backdrop-blur-sm bg-light-100 bg-opacity-70 py-4 `"
  >
    <div class="mx-auto px-2 lg:px-8" v-if="globalOptions.options.data">
      <nav class="flex items-center justify-between gap-1 lg:gap-8">
        <div class="brand shrink-0">
          <NuxtLink :to="localePath('/')">
            <NuxtImg
              v-if="data.header.logo_light.data?.attributes?.url"
              class="w-32 sm:w-40"
              :src="data.header?.logo_light?.data?.attributes?.url"
              :alt="data?.Site_name"
            />
            <span v-else>{{ data?.Site_name }}</span>
          </NuxtLink>
        </div>
        <div class="menu_1">
          <ul class="hidden lg:flex flex-row items-center gap-4">
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
              <li class="hidden lg:block">
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
              <li class="relative hidden lg:block">
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
                  class="submenu border border-light-400 rounded absolute z-20 top-12 right-0 bg-white flex flex-col items-center w-60"
                >
                  <div class="divide-y divide-gray-400">
                    <template v-for="itemBo in globalData.myProducts">
                      <NuxtLink
                        :to="`${itemBo.attributes?.backoffice_url}${
                          itemBo.cookie && itemBo.bo !== 'investment'
                            ? 'user_sessions/set_remote_session?key=' +
                              removeString(itemBo.cookie)
                            : ''
                        }`"
                        target="_blank"
                      >
                        <button
                          v-if="itemBo.success"
                          class="bg-white w-full rounded hover:bg-primary hover:text-light py-2"
                        >
                          {{ itemBo.attributes?.name }}
                        </button>
                      </NuxtLink>
                    </template>
                  </div>
                </div>
                <div
                  class="openbo-overlay h-screen w-screen fixed top-0 left-0 z-0"
                  v-if="openBo"
                  @click="openBo = !openBo"
                ></div>
              </li>
            </template>

            <li v-else class="hidden lg:block">
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
        <div
          :class="`menu_mobile lg:hidden ${
            menuIsOpen
              ? 'block absolute bg-light top-0 pt-24 w-full h-screen overflow-y-auto left-0 -z-20 px-10 pb-10'
              : 'hidden'
          }`"
        >
          <ul class="flex flex-col items-center mb-3">
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
                    class="text-lg py-3 px-7 block"
                    >{{ item.label }}
                  </Button>
                </NuxtLink>
                <a
                  class="cursor-pointer hover:text-primary text-lg py-3 px-7 block"
                  v-else
                  @click="toggleMegaMenu()"
                  >{{ item.label }}</a
                >
              </template>
            </li>
          </ul>
          <ul class="flex flex-col items-center gap-4">
            <template v-if="globalOptions.userData">
              <li>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  class="w-60"
                  @click="getLogOut()"
                >
                  <span>Logout</span>
                  <Icon class="ml-2" name="heroicons-outline:logout" />
                </Button>
              </li>
              <li class="relative -order-1">
                <Button
                  @click="openBo = !openBo"
                  type="button"
                  variant="primary"
                  size="sm"
                  class="w-60"
                  >Backoffices
                  <Icon class="ml-2" name="heroicons:chevron-down-solid"
                /></Button>
                <div
                  v-if="openBo"
                  class="submenu border border-light-400 bg-white flex flex-col items-center w-60 mt-0.5 rounded-lg"
                >
                  <div class="divide-y divide-gray-400">
                    <template v-for="itemBo in globalData.myProducts">
                      <NuxtLink
                        :to="`${itemBo.attributes?.backoffice_url}${
                          itemBo.cookie && itemBo.bo === 'academy'
                            ? 'user_sessions/set_remote_session?key=' +
                              removeString(itemBo.cookie)
                            : ''
                        }`"
                        target="_blank"
                      >
                        <button
                          v-if="itemBo.success"
                          class="bg-white w-full rounded hover:bg-primary hover:text-light py-2"
                        >
                          {{ itemBo.attributes?.name }}
                        </button>
                      </NuxtLink>
                    </template>
                  </div>
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
          </ul>
        </div>
      </nav>

      <!--  {{ globalData.myBackoffices }} -->
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

  <ClientOnly>
    <Login
      v-if="modalState"
      @closeMenu="closeMenu"
      @toggleModalLogin="toggleModalLogin"
    />
  </ClientOnly>
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

watch(options.value, (newValue) => {
  /*   console.log("El valor en el local storage ha cambiado:", newValue.userData);
   */
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
    globalData.setMyProducts(null);

    menuIsOpen.value = false;
  } catch (error) {
    console.log(error);
  }
};

const openBo = ref(false);

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

const removeString = (string) => {
  var indice = string.indexOf("=");
  if (indice !== -1) {
    return string.substring(indice + 1);
  } else {
    return string;
  }
};
</script>
