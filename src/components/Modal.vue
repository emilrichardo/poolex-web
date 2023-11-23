<template>
  <!-- Modal -->
  <Teleport to="body">
    <div class="fixed z-50 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity" @click="closeModal">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="flex items-center justify-center h-screen">
          <div
            :class="`inline-block align-bottom  bg-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`"
          >
            <!-- Aquí puedes agregar el contenido del modal -->
            <div class="bg-light border-t-4 b-color p-4">
              <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
              <!-- Puedes mostrar información de la membresía aquí -->
              <slot />
            </div>

            <!-- Botón para cerrar el modal -->
            <div class="bg-gray-100 px-4 py-2 text-right">
              <Button
                @click="closeModal"
                variant="primary"
                type="button"
                size="sm"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>

        <!-- Contenido del modal -->
      </div>
    </div>
  </Teleport>
</template>
<script setup>
const { title, color } = defineProps(["title", "color"]);
const emit = defineEmits(["inFocus", "submit"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<style>
.b-color {
  --m-color: v-bind(color);
  border-color: var(--m-color);
}
</style>
