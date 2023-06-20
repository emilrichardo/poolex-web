<template>
  <div
    class="bg-[#3e3747] bg-opacity-70 w-screen h-screen fixed z-50 left-0 top-0 grid gap-4 p-4 place-content-center overflow-hidden"
    @click="closeModal()"
  >
    <div
      class="bg-white rounded-lg px-12 py-8 w-screen max-w-[480px]"
      @click.stop
    >
      <form @submit.prevent="login">
        <h1 class="text-xl text-center">Login to Poolex</h1>
        <div>
          <label :class="labelClass" for="email">Email</label>
          <input
            :class="inputClass"
            type="text"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="relative">
          <label :class="labelClass" for="password">Contraseña:</label>
          <input
            :class="inputClass"
            :type="passwordIsVisible ? 'text' : 'password'"
            id="password"
            v-model="password"
            required
          />
          <Icon
            class="absolute bottom-4 cursor-pointer right-4"
            :name="
              !passwordIsVisible
                ? 'heroicons:eye-solid'
                : 'heroicons:eye-slash-solid'
            "
            @click="showPasswors()"
          ></Icon>
        </div>
        <Button
          :disabled="!validateForm"
          type="submit"
          variant="primary"
          class="w-full mt-4"
        >
          Iniciar sesión
          <Icon class="ml-4 -mr-4" name="heroicons:arrow-right-solid"></Icon
        ></Button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGlobalData } from "@/stores/getGlobaData";

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
    const data = await response.json();

    /* email.value = "";
    password.value = ""; */
    globalOptions.setUserData(data);

    if (data.data_array) {
      globalData.setMyBO(
        mergeArrays(globalData.myBackoffices, data.data_array)
      );

      data.data_array.forEach((bo) => {
        const expirationDate = new Date(); // Obtén la fecha actual
        expirationDate.setDate(expirationDate.getDate() + 7); // Añade 7 días a la fecha actual

        const cookieString = `${bo.cookie} domain=.poolex.io`;

        document.cookie = cookieString;
        console.log(cookieString);
      });
    }

    closeModal();
  } catch (error) {
    console.log(error);
  }
};

const getWhoami = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      runtimeConfig.public.apiSession + "/api/v1/whoami",
      requestOptions
    );
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};

// merge products

const mergeArrays = (array1, array2) => {
  const result = [];
  for (const item1 of array1) {
    let matched = false;
    for (const item2 of array2) {
      if (!item2.bo || !item1.attributes.name) {
        continue;
      }
      const nameMatch = item1.attributes.name
        .trim()
        .toLowerCase()
        .includes(item2.bo.trim().toLowerCase());
      const boMatch = item2.bo
        .trim()
        .toLowerCase()
        .includes(item1.attributes.name.trim().toLowerCase());
      if (nameMatch || boMatch) {
        result.push({ ...item1, ...item2 });
        matched = true;
        break;
      }
    }
    if (!matched) {
      result.push(item1);
    }
  }
  return result;
};

//emit close tag

const emit = defineEmits(["inFocus", "submit"]);
const closeModal = () => {
  emit("toggleModalLogin");
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

function getCookie(cname) {
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
}
</script>
