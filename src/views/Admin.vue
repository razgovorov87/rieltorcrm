<template>
  <div>
    <AdminHeader
      @changeTypeDisplay="changeTypeDisplay"
      :typeDisplay="typeDisplay"
      @addNewClient="addNewClientDrawer = true"
      @openClient="openClient"
      :key="refreshHeader"
    />
    <Loading v-if="loading" />
    <NoData v-else-if="!clients || clients.length === 0" :screen="true" />
    <div v-else class="relative flex-grow pt-divider">
      <AdminTable
        v-if="typeDisplay === 'table' && !loading"
        :categories="categories"
        :clients="clients"
        @openClient="openClient"
      />
      <AdminColumn
        v-if="typeDisplay === 'column' && !loading"
        :categories="categories"
        :clients="clients"
        @openClient="openClient"
      />
    </div>

    <transition name="opacity">
      <div
        v-show="addNewClientDrawer"
        class="absolute inset-0 bg-black opacity-30 z-20"
      ></div>
    </transition>

    <transition name="fade">
      <ClientDrawer
        v-show="addNewClientDrawer"
        @closeDrawer="addNewClientDrawer = false"
        @addNewClient="
          () => {
            fetchClients();
            addNewClientDrawer = false;
            refreshHeader++;
          }
        "
      />
    </transition>

    <transition name="fade">
      <ItemDrawer
        v-if="itemsDrawer"
        :client="client"
        @reloadList="
          () => {
            fetchClients();
            refreshHeader++;
          }
        "
        @closeDrawer="itemsDrawer = false"
      />
    </transition>
  </div>
</template>

<script>
import AdminHeader from "@/components/Admin/AdminHeader";
import AdminTable from "@/components/Admin/AdminTable";
import AdminColumn from "@/components/Admin/AdminColumn";
import ClientDrawer from "@/components/Admin/ClientDrawer";
import ItemDrawer from "@/components/Clients/ItemDrawer";
import NoData from "@/components/NoData";
export default {
  data: () => ({
    loading: true,
    typeDisplay: "table",
    addNewClientDrawer: false,
    categories: [
      { id: 0, title: "Не обработано", color: "gray-500" },
      { id: 1, title: "В работе", color: "blue-500" },
      { id: 2, title: "Просмотр квартир", color: "yellow-600" },
      { id: 3, title: "Прошла сделка", color: "green-500" },
    ],
    clients: [],
    refreshList: 0,
    refreshList2: 1,
    client: {},
    itemsDrawer: false,
    refreshHeader: 3,
  }),

  mounted() {
    this.fetchClients();
  },

  methods: {
    openClient(client) {
      this.client = client;
      this.itemsDrawer = true;
    },

    changeTypeDisplay(type) {
      this.typeDisplay = type;
    },

    async fetchClients() {
      this.loading = true;
      this.clients = [];
      this.clients = await this.$store.dispatch("fetchClients");
      this.loading = false;
    },
  },

  components: {
    AdminHeader,
    AdminTable,
    AdminColumn,
    ClientDrawer,
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
