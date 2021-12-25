<template>
  <header class="absolute pl-divider h-divider bg-white z-10 w-full flex">
    <div class="flex items-center py-4 px-8 h-full border-r flex-shrink-0">
      <span class="uppercase font-bold">{{ routeName }}</span>
      <span class="text-xs text-gray-400 ml-2"
        >Свободных в базе: {{ freeClients }}</span
      >
    </div>

    <div class="flex flex-grow text-right items-center px-4">
      <!-- <div class="text-gray-400 w-full">0 сделок: <span class="text-gray-900">0 &#8381;</span></div> -->
    </div>

    <div
      v-if="userInfo"
      class="flex items-center py-4 px-8 h-full border-l flex-shrink-0"
    >
      <div class="p-3 bg-gray-200 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <div class="flex space-x-1 ml-3 select-none">
        <span>{{ userInfo.name }}</span>
        <span>{{ userInfo.surname }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    userInfo: null,
  }),

  mounted() {
    this.fetchInfo();
    try {
      this.$store.dispatch("fetchFreeClients");
    } catch (e) {
      const msg = e.data["message"];
      if (msg) {
        this.$toasts.push({
          type: "error",
          message: errors[msg],
        });
      } else {
        this.$toasts.push({
          type: "error",
          message: msg,
        });
      }
      throw e;
    }
  },

  methods: {
    async fetchInfo() {
      this.userInfo = this.$store.state.auth.loggedInUser;
    },
  },

  computed: {
    ...mapGetters(["freeClients"]),
    routeName() {
      return this.$route.name;
    },

    ClientsLength() {
      if (Object.keys(this.$store.getters.clients).length !== 0) {
        const today = new Date().toISOString().slice(0, -14);
        return this.$store.getters.clients.filter(
          (client) =>
            !client.agent && (!client.lastCause || client.lastCause !== today)
        ).length;
      } else return 0;
    },
  },
};
</script>
