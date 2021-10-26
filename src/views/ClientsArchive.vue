<template>
    <div>
        <Loading v-if="loading" />
        <NoData v-else-if="!clients || clients.length === 0" :screen="true" />
        <div v-else class="relative flex-grow">
            <AdminTable
                v-if="!loading"
                :categories="categories"
                :clients="clients"
                @openClient="openClient"
            />
        </div>

        <transition name="fade">
            <ItemDrawer
                v-if="itemsDrawer"
                :client="client"
                @reloadList="() => {
                fetchClients()
                refreshHeader++
                }"
                @closeDrawer="itemsDrawer = false"
            />
        </transition>
    </div>
</template>

<script>
import NoData from "@/components/NoData";
import ItemDrawer from "@/components/Clients/ItemDrawer";
import AdminTable from "@/components/ArchiveClients/AdminTable";
export default {
    data: () => ({
        loading: true,
        clients: null,
        categories: [
            { id: 0, title: "Не обработано", color: "gray-500" },
            { id: 1, title: "В работе", color: "blue-500" },
            { id: 2, title: "Просмотр квартир", color: "yellow-600" },
            { id: 3, title: "Прошла сделка", color: "green-500" },
        ],
        client: null,
        itemsDrawer: false
    }),

    async mounted() {
        await this.fetchClients()
        this.loading = false
    },

    methods: {
        async fetchClients() {
            this.clients = await this.$store.dispatch('fetchArchiveClients')
        },

        openClient(client) {
            this.client = client;
            this.itemsDrawer = true;
        },
    },

    components: {
        NoData, ItemDrawer, AdminTable
    }
}
</script>