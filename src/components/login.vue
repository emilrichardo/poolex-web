<template>
  <div
    class="bg-[#3e3747] bg-opacity-70 w-screen h-screen fixed z-50 left-0 top-0 grid gap-4 p-4 place-content-center overflow-hidden"
    @click="closeModal()">
    <div class="bg-white rounded-lg px-12 py-8 w-full max-w-[480px]" @click.stop>
      <form @submit.prevent="login">
        <h1 class="text-xl text-center">
          {{ locale === "es" ? "Iniciar sesión en Poolex" : "Login to Poolex" }}
        </h1>
        <div>
          <label :class="labelClass" for="email">Email</label>
          <input :class="inputClass" type="text" id="email" v-model="email" required />
        </div>
        <div class="relative">
          <label :class="labelClass" for="password">{{
            locale === "es" ? "Contraseña:" : "Password"
          }}</label>
          <input :class="inputClass" :type="passwordIsVisible ? 'text' : 'password'" id="password" v-model="password"
            required />
          <Icon class="absolute bottom-4 cursor-pointer right-4" :name="!passwordIsVisible
            ? 'heroicons:eye-solid'
            : 'heroicons:eye-slash-solid'
            " @click="showPasswors()"></Icon>
        </div>
        <Button :disabled="!validateForm" type="submit" variant="primary" class="w-full mt-4">
          {{ locale === "es" ? "Iniciar sesión" : "Sign in" }}

          <Icon class="ml-4 -mr-4" name="heroicons:arrow-right-solid"></Icon>
        </Button>
      </form>
      <Alert v-if="alertOpen" type="danger" class="mt-2">{{
        locale == "es"
        ? "Usuario o contraseña incorrecta"
        : "Incorrect username or password"
      }}</Alert>
    </div>
  </div>
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGlobalData } from "@/stores/getGlobaData";

const { locale } = useI18n();

const globalData = useGlobalData();
const globalOptions = useGlobalOptions();

const runtimeConfig = useRuntimeConfig();

const email = ref("");
const password = ref("");

if (runtimeConfig.public.projectUrl?.includes("localhost")) {
  email.value = "test8@email.com";
  password.value = "abcd1234";
}

const validateForm = computed(() => {
  return validateEmail(email.value) && password.value.length > 3;
});

const alertOpen = ref(false);

const login = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  };
  try {
    const response = await fetch(
      runtimeConfig.public.apiSession + "/api/v1/login",
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    globalOptions.setUserData(data);

    if (data.data_array) {
      globalData.setMyProducts(
        mergeArrays(data.data_array, globalData.myBackoffices)
      );

      data.data_array.forEach((bo) => {
        const expirationDate = new Date(); // Obtén la fecha actual
        expirationDate.setDate(expirationDate.getDate() + 1); // Añade 7 días a la fecha actual

        const cookieString = `${bo.cookie
          }; domain=.poolex.io; path=/; expires=${expirationDate.toUTCString()}`;

        document.cookie = cookieString;
      });
    }

    // Se recarga la pagina para ordenamiento de widget poolex
    window.location.reload();
    closeModal();
  } catch (error) {
    globalOptions.setUserData(null);
    globalData.setMyProducts(null);
    console.log(error);
    alertOpen.value = true;
  } finally {
  }
};

// merge products
const mergeArrays = (array1, array2) => {
  const result = [...array1]; // Copia los elementos del primer array en el resultado inicialmente
  const matchedIndexes = new Set(); // Almacena los índices de los elementos que coinciden

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (
        containsCommonWord(
          array1[i].bo.trim().toLowerCase(),
          array2[j].attributes?.slug.trim().toLowerCase()
        )
      ) {
        result[i] = { ...array1[i], ...array2[j] };
        matchedIndexes.add(j);
        break;
      }
    }
  }

  for (let k = 0; k < array2.length; k++) {
    if (!matchedIndexes.has(k)) {
      result.push({ bo: array2[k].attributes?.slug, ...array2[k] });
    }
  }

  return result;
};

// Función para verificar si hay al menos una palabra en común entre dos cadenas
function containsCommonWord(str1, str2) {
  const words1 = str1.split(" ");
  const words2 = str2.split(" ");

  return words1.some((word1) => words2.some((word2) => word1 === word2));
}

//emit close tag

const emit = defineEmits(["inFocus", "submit"]);
const closeModal = () => {
  emit("toggleModalLogin");
  emit("closeMenu");
};

const labelClass = "text-sm";
const inputClass =
  "border border-light-400 focus:outline-primary block w-full py-2 px-3";

//show password
const passwordIsVisible = ref(false);
const showPasswors = () => {
  passwordIsVisible.value = !passwordIsVisible.value;
};

//validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const getCookie = function (cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
</script>
