<template>
  <div class="w-full flex flex-col bg-gray-200">
    <div
      class="flex items-center px-6 py-2 cursor-pointer border-b border-gray-300"
      @click="isOpen = !isOpen"
    >
      <svg
        class="w-6 h-6 mr-2 text-gray-800"
        :class="{
          'transform -rotate-90': !isOpen,
        }"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div class="flex shadow-md">
        <span
          class="rounded text-white px-4 py-1 font-medium select-none rounded-r-none"
          :class="'bg-' + category.color"
          >{{ category.title }}</span
        >
        <span
          class="text-sm py-1 px-2 flex items-center justify-center rounded-r text-white font-medium border-l border-white border-opacity-25"
          :class="'bg-' + category.color"
        >
          {{ items.filter((item) => item.status === category.title).length }}
        </span>
      </div>
    </div>
    <div v-show="isOpen" class="bg-white">
      <tr
        v-for="client in items.filter((item) => item.status === category.title)"
        :key="client.id"
        class="border-b border-gray-200 hover:bg-gray-100 flex items-center cursor-pointer"
        @click="$emit('openClient', client)"
      >
        <td class="w-2/12 py-3 px-6 text-left whitespace-nowrap">
          <div class="flex items-center">
            <span class="font-medium">{{ client.fio }}</span>
          </div>
        </td>

        <td class="w-2/12 py-3 px-6 text-left">
          <div v-if="refusedGroup" class="flex items-center">
            <span class="mr-1 whitespace-nowrap">Причина отказа:</span>
            <span class="border-b border-gray-500 truncate">{{
              lastCauses(client.causes)
            }}</span>
          </div>
          <div v-else class="flex items-center">
            <span class="border-b border-gray-500">{{
              takeAgentInfo(client.agent)
            }}</span>
          </div>
        </td>

        <td class="w-2/12 py-3 px-6 text-center">
          <div class="flex items-center justify-center">
            <div class="mr-2">
              <svg
                class="w-5"
                xmlns="http://www.w3.org/2000/svg"
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
            </div>
            <span class="font-medium border-b border-gray-400">{{
              client.phone
            }}</span>
          </div>
        </td>

        <td class="w-2/12 py-3 px-6 text-center">
          <span
            class="text-white py-1 px-3 rounded-full text-xs"
            :class="'bg-' + category.color"
          >
            {{ client.status }}</span
          >
        </td>

        <td class="w-1/12 py-3 px-6 text-center">
          <div class="flex items-center justify-center">
            <span class="font-medium">{{
              offerCount(client.proposedObjects)
            }}</span>
          </div>
        </td>

        <td class="w-1/12 py-3 px-6 text-center">
          <div class="flex items-center justify-center">
            <span
              v-if="refuseCount(client.causes) >= 3"
              class="font-medium p-2 bg-red-600 rounded-full h-8 w-8 flex items-center justify-center text-white"
              >{{ refuseCount(client.causes) }}</span
            >
            <span v-else class="font-medium">{{
              refuseCount(client.causes)
            }}</span>
          </div>
        </td>

        <td class="w-2/12 py-3 px-6 text-center">
          <div class="flex items-center justify-center">
            <div
              class="w-5 mr-2 transform transition hover:text-blue-500 hover:scale-110 cursor-pointer"
              @click.stop="returnClientToStart(client)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                />
              </svg>
            </div>
          </div>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category", "items", "agents", "refusedGroup"],
  data: () => ({
    isOpen: false,
  }),

  mounted() {
    if (
      this.items.filter((item) => item.status === this.category.title).length <
      10
    )
      this.isOpen = true;
  },

  methods: {
    takeAgentInfo(id) {
      if (this.agents) {
        const agent = this.agents.filter((agent) => agent.id === id);
        if (agent[0]) return agent[0].surname + " " + agent[0].name;
      }
    },

    async returnClientToStart(client) {
      try {
        await this.$store.dispatch("returnArchiveClientToStart", client);
        this.$parent.$parent.fetchClients();
        this.$toasts.push({
          type: "success",
          message: 'Клиент успешно перенесен в группу "Не обработано"',
        });
      } catch (e) {
        throw e;
      }
    },

    offerCount(objects) {
      if (!objects) return 0;

      return objects.length;
    },

    refuseCount(causes) {
      if (!causes) return 0;
      return Object.keys(causes).length;
    },

    async removeClient(client) {
      try {
        await this.$store.dispatch("deleteClient", client);
        this.$parent.$parent.fetchClients();
        this.$toasts.push({
          type: "success",
          message: "Клиент успешно удален",
        });
      } catch (e) {
        throw e;
      }
    },

    lastCauses(causes) {
      const idx = Object.keys(causes).length;
      const arr = Object.keys(causes).map((key) => ({
        ...causes[key],
        id: key,
      }));
      return arr[idx - 1].cause;
    },
  },
};
</script>
