<template>
  <div>
    <AdminTeamHeader />
    <Loading v-if="loading" />
    <NoData v-else-if="!team || team.length === 0" :screen="true" />
    <div v-else class="relative flex-grow pt-divider">
      <AdminTeamTable v-if="!loading" :clients="clients" />
    </div>

    <transition name="fade">
      <ItemDrawer
        v-if="itemsDrawer"
        :client="client"
        @closeDrawer="itemsDrawer = false"
      />
    </transition>
  </div>
</template>

<script>
import AdminTeamHeader from "@/components/AdminTeam/AdminTeamHeader";
import AdminTeamTable from "@/components/AdminTeam/AdminTeamTable";
import ItemDrawer from "@/components/Clients/ItemDrawer";
import NoData from "@/components/NoData";
export default {
  data: () => ({
    loading: true,
    team: {},
    itemsDrawer: false,
  }),

  mounted() {
    this.fetchClients();
  },

  methods: {
    openClient(client) {
      this.client = client;
      this.itemsDrawer = true;
    },

    async fetchClients() {
      this.clients = await this.$store.dispatch("fetchClients");
      this.loading = false;
      this.refreshList++;
      this.refreshList2++;
    },
  },

  components: {
    AdminTeamHeader,
    AdminTeamTable,
    NoData,
    ItemDrawer,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
}

.opacity-enter-active,
.opacity-leave-active {
  transition: 0.3s ease;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
</style>
