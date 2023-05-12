<template>
  <div
    class="bg-[#3e3747] bg-opacity-70 w-screen h-screen fixed z-50 left-0 top-0 grid place-content-center overflow-hidden"
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
        <div>
          <label :class="labelClass" for="password">Contraseña:</label>
          <input
            :class="inputClass"
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <Button type="submit" variant="primary" class="w-full mt-4"
          >Iniciar sesión</Button
        >
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

const email = ref("test8@email.com");
const password = ref("abcd1234");

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
    globalOptions.setUserData(data);
    if (data.data_array) {
      globalData.setMyBO(mergeArrays(globalData.products, data.data_array));
    }

    closeModal();
  } catch (error) {
    console.log(error);
  }
};

// merge products

const mergeArrays = (array1, array2) => {
  const result = [];
  for (const item1 of array1) {
    for (const item2 of array2) {
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
        break;
      }
    }
  }
  console.log(result);
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
</script>
