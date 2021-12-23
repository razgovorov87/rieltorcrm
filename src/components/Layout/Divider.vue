<template>
  <div class="flex-shrink-0 w-divider bg-dividerBg h-full flex flex-col z-20">
    <div class="logo h-divider flex-shrink-0"></div>
    <nav class="flex flex-col w-full items-center justify-start mt-2 flex-grow">
      <router-link
        to="/"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          group
        "
        exact
      >
        <svg
          class="w-8 text-gray-400 group-hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <span
          class="
            text-xs text-gray-400
            font-semibold
            mt-1
            group-hover:text-white
          "
          >Клиенты</span
        >
      </router-link>

      <router-link
        to="/object"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          group
        "
        exact
      >
        <svg
          class="w-8 text-gray-400 group-hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span
          class="
            text-xs text-gray-400
            font-semibold
            mt-1
            group-hover:text-white
          "
          >Объекты</span
        >
      </router-link>

      <router-link
        to="/reverses"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          group
        "
        exact
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 text-gray-400 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span
          class="
            text-xs text-gray-400
            font-semibold
            mt-1
            truncate
            group-hover:text-white
          "
          style="max-width: 70px"
          >Просмотры</span
        >
      </router-link>

      <div v-if="checkAdmin" class="text-gray-500 my-2">
        <span>•</span>
        <span class="mx-1">•</span>
        <span>•</span>
      </div>

      <router-link
        to="/calls"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          group
        "
        exact
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 text-gray-400 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span
          class="
            text-xs text-gray-400
            font-semibold
            mt-1
            truncate
            group-hover:text-white
          "
          style="max-width: 60px"
          >Звонки</span
        >
      </router-link>

      <router-link
        v-if="checkAdmin"
        to="/admin/clients"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          group
        "
        exact
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 text-gray-400 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span
          class="
            text-xs
            font-semibold
            mt-1
            text-center text-gray-400
            group-hover:text-white
          "
          style="max-width: 60px"
          >База клиентов</span
        >
      </router-link>

      <router-link
        v-if="checkAdmin"
        to="/admin/team"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          group
        "
        exact
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 text-gray-400 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span
          class="
            text-xs text-gray-400
            font-semibold
            mt-1
            truncate
            group-hover:text-white
          "
          style="max-width: 60px"
          >Агенты</span
        >
      </router-link>

      <router-link
        v-if="checkAdmin"
        to="/admin/archive"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          group
        "
        exact
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 text-gray-400 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
        <span
          class="
            text-xs
            font-semibold
            mt-1
            text-center text-gray-400
            group-hover:text-white
          "
          style="max-width: 60px"
          >Архив клиентов</span
        >
      </router-link>

      <div v-if="checkAdmin" class="text-gray-500 my-2">
        <span>•</span>
        <span class="mx-1">•</span>
        <span>•</span>
      </div>
    </nav>

    <div class="flex flex-shrink-0 flex-col bg-darkDivider">
      <router-link
        id="link_with_popover"
        to="#"
        class="
          py-2
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          relative
          group
        "
        exact
      >
        <svg
          class="w-9 text-gray-400 group-hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span
          class="
            popover
            absolute
            left-full
            bg-darkDivider
            shadow-lg
            top-1/2
            rounded
            transform
            -translate-y-1/2
            translate-x-2
            text-white text-sm
            py-1
            px-3
            text-gray-400
            group-hover:text-white
          "
          >Тех.поддержка</span
        >
      </router-link>

      <button
        id="link_with_popover"
        to="#"
        class="
          py-4
          flex flex-col
          items-center
          text-gray-400
          outline-none
          hover:text-white
          transition
          w-full
          relative
          focus:outline-none
        "
        exact
        @click="logout"
      >
        <svg
          class="w-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span
          class="
            popover
            absolute
            left-full
            bg-darkDivider
            shadow-lg
            top-1/2
            rounded
            transform
            -translate-y-1/2
            translate-x-2
            text-white text-sm
            py-1
            px-3
          "
          >Выйти</span
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    userInfo: false,
  }),
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (e) {
        this.$toasts.push({
          type: "error",
          message: "Что-то пошло не так.",
        });
        throw e;
      }
    },

    async fetchInfo() {
      this.userInfo = this.$store.state.auth.loggedInUser;
    },
  },

  mounted() {
    this.fetchInfo();
  },

  computed: {
    checkAdmin() {
      return this.userInfo.isAdmin;
    },
  },
};
</script>

<style>
.router-link-active {
  @apply bg-darkDivider text-white !important;
}
#link_with_popover span.popover {
  opacity: 0;
  transition: 0.3s ease;
}
#link_with_popover:hover span.popover {
  opacity: 1;
}
</style>
