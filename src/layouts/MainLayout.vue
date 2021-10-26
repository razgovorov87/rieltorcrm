<template>
  <div class="flex h-screen bg-gray-100">
    <Divider />
    <Header v-if="disableHeader" />
    <main
      id="page"
      class="flex-grow"
      :class="disableHeader ? 'pt-divider' : 'pageFull'"
    >
      <router-view />
    </main>
  </div>
</template>

<script>
import Divider from "@/components/Layout/Divider";
import Header from "@/components/Layout/Header";
export default {
  name: "App",
  data: () => ({
    //
  }),

  mounted() {
    this.$store.dispatch("fetchInfo");
  },

  computed: {
    disableHeader() {
      return this.$route.path === "/object" ||
        this.$route.path === "/admin/clients" ||
        this.$route.path === "/admin/team" ||
        this.$route.path === "/reverses"
        ? false
        : true;
    },
  },

  components: { Divider, Header },
};
</script>

<style>
body {
  overflow-x: hidden;
}
#page {
  height: calc(100vh - 100px);
}

.pageFull {
  height: 100vh !important;
}
::-webkit-scrollbar {
  width: 1px;
  height: 0;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-border-radius: 1px;
  border-radius: 1px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(173, 173, 173, 0.8);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(173, 173, 173, 0.8);
}
</style>
