<template>
  <div class="flex space-x-2 justify-center mt-1 h-full">
    <div
      class="w-1/4 flex flex-col space-y-0 flex-shrink-0 overflow-y-auto h-full"
      style="margin: 0"
    >
      <transition-group name="list" tag="div">
        <div
          v-for="item in list"
          :key="item.id"
          class="w-full px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition"
          :class="item.fio ? 'py-1' : 'py-2'"
          @click="openItemDrawer(item)"
        >
          <div class="flex flex-col flex-grow">
            <span v-if="item.fio" class="text-sm text-gray-500">{{
              item.fio
            }}</span>
            <h2
              class="text-blue-500 font-semibold truncate"
              style="max-width: 234px"
            >
              {{ item.phone }}
            </h2>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <span class="text-xs text-gray-500">{{
              item.createdAt | date
            }}</span>
          </div>
        </div>
      </transition-group>
    </div>

    <div class="list-column">
      <transition-group type="transition" name="list">
        <div
          v-for="i in processed"
          :key="i.id"
          class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none"
          @click="openItemDrawer(i)"
        >
          <div class="flex flex-col flex-grow">
            <span class="text-sm text-gray-500">{{ i.phone }}</span>
            <h2
              class="text-blue-500 font-semibold mb-1 truncate"
              style="max-width: 234px"
            >
              {{ i.fio }}
            </h2>
            <span class="text-sm text-gray-500">{{ i.budget | currency }}</span>
          </div>
          <div class="flex flex-shrink-0 items-start">
            <span class="text-xs text-gray-500">{{ i.createdAt | date }}</span>
          </div>
        </div>
      </transition-group>
    </div>


    <div class="list-column">
      <transition-group type="transition" name="list">
        <div
          v-for="i in view"
          :key="i.id"
          class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none"
          @click="openItemDrawer(i)"
        >
          <div class="flex flex-col flex-grow">
            <span class="text-sm text-gray-500">{{ i.phone }}</span>
            <h2
              class="text-blue-500 font-semibold mb-1 truncate"
              style="max-width: 234px"
            >
              {{ i.fio }}
            </h2>
            <span class="text-sm text-gray-500">{{ i.budget | currency }}</span>
          </div>
          <div class="flex flex-shrink-0 items-start">
            <span class="text-xs text-gray-500">{{ i.createdAt | date }}</span>
          </div>
        </div>
      </transition-group>
    </div>

    <div class="list-column">
      <transition-group type="transition" name="list">
        <div
          v-for="i in success"
          :key="i.id"
          class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none"
          @click="openItemDrawer(i)"
        >
          <div class="flex flex-col flex-grow">
            <span class="text-sm text-gray-500">{{ i.phone }}</span>
            <h2
              class="text-blue-500 font-semibold mb-1 truncate"
              style="max-width: 234px"
            >
              {{ i.fio }}
            </h2>
            <span class="text-sm text-gray-500">{{ i.budget | currency }}</span>
          </div>
          <div class="flex flex-shrink-0 items-start">
            <span class="text-xs text-gray-500">{{ i.createdAt | date }}</span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: ["categories", "clients", "disableBtn"],

  data: () => ({
    list: [],
    processed: [],
    conversation: [],
    view: [],
    success: [],
    drag: false,
    loading: true,
  }),

  mounted() {
    this.filterClients();
    this.loading = false;
  },

  methods: {
    openItemDrawer(item) {
      this.$emit("openItemDrawer", item);
    },

    log: function (e) {
      window.console.log(e);
    },

    async filterClients() {
      this.list = this.clients.filter(
        (item) => item.status === "Не обработано"
      );
      this.processed = this.clients.filter(
        (item) => item.status === "В работе"
      );
      this.view = this.clients.filter(
        (item) => item.status === "Просмотр квартир"
      );
      this.success = this.clients.filter((item) => item.status === "Прошла сделка");
    },
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "clients",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },

  components: { draggable },
};
</script>


<style>
.list-column {
  @apply w-1/4 flex flex-col space-y-2 flex-shrink-0 overflow-y-auto h-full;
}

.list-column {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>