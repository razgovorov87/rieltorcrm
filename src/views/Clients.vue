<template>
  <Loading v-if="loading" />
  <NoData v-else-if="!clients" :screen="false" />
  <div v-else class="flex flex-col container mx-auto pt-4 h-full">
    <ClientsHeader
      :categories="categories"
      :clients="clients"
      :key="refreshList2"
    />
    <ClientsList
      :categories="categories"
      :clients="clients"
      @openItemDrawer="openItemDrawer"
      @catchNewClient="fetchClients(false)"
      :key="refreshList"
    />

    <transition name="fade">
      <ItemDrawer
        v-if="itemsDrawer"
        :client="client"
        @closeDrawer="itemsDrawer = false"
        @reloadList="
          () => {
            fetchClients(true);
          }
        "
      />
    </transition>

    <NewClients
      v-if="newClientDialog"
      :clients="newClients"
      @close="newClientDialog = false"
    />
  </div>
</template>

<script>
import ClientsHeader from "@/components/Clients/ClientsHeader";
import ClientsList from "@/components/Clients/ClientsList";
import ItemDrawer from "@/components/Clients/ItemDrawer";
import NewClients from "@/components/Clients/NewClients";
import NoData from "@/components/NoData";
export default {
  data: () => ({
    loading: true,
    itemsDrawer: false,
    client: {},
    categories: [
      { id: 0, title: "Не обработано", color: "gray-500" },
      { id: 1, title: "В работе", color: "blue-500" },
      { id: 2, title: "Просмотр квартир", color: "yellow-600" },
      { id: 3, title: "Прошла сделка", color: "green-500" },
    ],
    clients: [],
    refreshList: 0,
    refreshList2: 1,
    newClientDialog: false,
    newClients: [],
  }),

  async mounted() {
    await this.fetchClients();
    this.checkNewClients();
    this.loading = false;
  },

  methods: {
    changeTypeDisplay(type) {
      this.typeDisplay = type;
    },

    async fetchClients(bool) {
      this.clients = await this.$store.dispatch("fetchUserClients");
      if (bool) {
        this.refreshList++;
        this.refreshList2++;
      }
    },

    async checkNewClients() {
      const matched = this.clients.filter(
        (client) => client.notification === true
      );
      if (matched.length !== 0) {
        this.newClients = matched;
        this.newClientDialog = true;
      }
    },

    openItemDrawer(item) {
      this.client = item;
      this.itemsDrawer = true;
    },
  },

  components: {
    ClientsHeader,
    ClientsList,
    ItemDrawer,
    NoData,
    NewClients,
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
</style>
