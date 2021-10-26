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
        v-for="client in sortToDate(
          items.filter((item) => item.status === category.title)
        )"
        :key="client.id"
        class="border-b border-gray-200 hover:bg-gray-100 flex items-center cursor-pointer"
        @click="$emit('openClient', client)"
      >
        <td class="w-2/12 py-3 px-6 text-left">
          <div v-if="refusedGroup" class="flex items-center truncate max-w-lg">
            <span class="mr-1 whitespace-nowrap">Причина:</span>
            <span class="border-b border-gray-500">{{
              lastCauses(client.causes)
            }}</span>
          </div>
          <div v-else class="flex items-center">
            <span class="border-b border-gray-500">{{
              takeAgentInfo(client.agent)
            }}</span>
          </div>
        </td>

        <td
          class="w-1/12 py-3 px-6 text-center flex justify-center whitespace-nowrap"
        >
          <div class="flex items-center">
            <span class="font-medium">{{ client.fio }}</span>
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
              client.proposedObjects != null ? client.proposedObjects.length : 0
            }}</span>
          </div>
        </td>
        <td class="w-1/12 py-3 px-6 text-center">
          <div class="flex items-center justify-center">
            <span
              v-if="client.reserves != null && client.reserves.length >= 3"
              class="font-medium p-2 bg-red-600 rounded-full h-8 w-8 flex items-center justify-center text-white"
              >{{ client.reserves.length }}</span
            >
            <span v-else class="font-medium">{{
              client.reserves != null ? client.reserves.length : 0
            }}</span>
          </div>
        </td>

        <td class="w-2/12 py-3 px-2 text-center">
          <div class="flex items-center justify-center">
            <span class="font-medium"
              >{{ client.createdAt | date("tableGroupDate_Time") }}
              {{ client.createdAt | date("tableGroupDate_Date") }}</span
            >
          </div>
        </td>

        <td class="w-1/12 py-3 px-2 text-center">
          <div class="flex items-center justify-center">
            <div
              v-if="refusedGroup"
              class="w-5 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
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

            <div
              class="w-5 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
              @click.stop="$emit('switchAgent', client)"
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
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>

            <!-- <div
							class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer"
							@click="$emit('openClient', client)"
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
									d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
								/>
							</svg>
						</div> -->

            <div
              class="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer"
              @click.stop="removeClient($event, client)"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
    if (this.refusedGroup) this.isOpen = true;
  },

  methods: {
    takeAgentInfo(id) {
      if (this.agents) {
        const agent = this.agents.filter((agent) => agent.id === id);
        if (agent[0]) return agent[0].surname + " " + agent[0].name;
      }
    },

    sortToDate(arr) {
      arr.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return arr;
    },

    async returnClientToStart(client) {
      try {
        await this.$store.dispatch("returnClientToStart", client);
        await this.$parent.$parent.fetchClients();
        await this.$parent.filterClients();
        this.$parent.refused = this.$parent.clients.filter(
          (client) => client.status === "Отказались"
        );
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

      let count = 0;
      objects.forEach((obj) => {
        if (obj.status === "offered") count++;
      });

      return count;
    },

    refuseCount(causes) {
      if (!causes) return 0;
      return Object.keys(causes).length;
    },

    async removeClient(e, client) {
      try {
        await this.$store.dispatch("deleteClient", client);
        await this.$parent.$parent.fetchClients();
        await this.$parent.filterClients();
        this.$parent.refused = this.$parent.clients.filter(
          (client) => client.status === "Отказались"
        );
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
      const cause = arr[idx - 1].cause;
      if (cause !== "Другое") {
        return cause;
      } else {
        return arr[idx - 1].otherCause;
      }
      return;
    },
  },
};
</script>
