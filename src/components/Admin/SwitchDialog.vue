<template>
  <div
    class="absolute inset-0 bg-black bg-opacity-60 h-screen z-50 flex items-center justify-center"
  >
    <div class="w-1/3 bg-white flex flex-col rounded">
      <div
        class="flex justify-center items-center px-6 py-4 border-b text-gray-600"
      >
        <div class="flex-grow flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
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
          <span class="font-medium text-xl"
            >Передать клиента другому агенту</span
          >
        </div>
        <button
          class="focus:outline-none rounded-full hover:bg-gray-400 p-1 flex items-center justify-center transition relative flex-shrink-0 w-8 h-8 cursor-pointer"
          @click="$emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex-grow py-4 px-6">
        <h3 class="font-medium text-gray-500 mb-2">Текущий агент</h3>
        <div
          class="flex-grow border rounded bg-gray-300 relative border-gray-400 mb-4"
        >
          <div class="flex justify-between items-center px-4 py-2">
            <span v-if="client.agent">{{ takeAgentInfo(client.agent) }}</span>
            <span v-else class="italic text-gray-500">Неизвестно</span>
          </div>
        </div>

        <h3 class="font-medium text-gray-500">Новый агент</h3>
        <div
          class="flex-grow border rounded bg-white cursor-pointer relative border-gray-300 mb-2"
        >
          <div
            class="flex justify-between items-center px-4 py-2"
            @click="openList = true"
          >
            <span v-if="newAgent">{{ newAgent }}</span>
            <span v-else class="text-gray-400"
              >Выберите агента из списка...</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div
            v-if="openList"
            class="absolute top-full h-20 w-full right-0 pt-2 z-30"
            v-click-outside="
              () => {
                openList = false;
              }
            "
          >
            <div
              class="bg-white flex flex-col border rounded shadow border-gray-100 overflow-hidden"
            >
              <span
                v-for="(item, idx) in agents.filter(
                  (agent) =>
                    agent.id !== client.agent &&
                    agent.verify &&
                    agent.status !== 'deleted'
                )"
                :key="item + idx"
                class="border-b px-4 py-2 hover:bg-dividerBg hover:text-white select-none"
                @click="
                  ($event) => {
                    newAgent = $event.target.innerText;
                    openList = false;
                  }
                "
                >{{ item.surname + " " + item.name }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center px-6 py-4 border-t">
        <button
          class="focus:outline-none rounded bg-dividerBg text-white hover:bg-darkDivider hover:shadow-lg hover:text-gray-200 p-1 px-3 text-lg font-medium flex items-center justify-center transition relative flex-shrink-0 cursor-pointer"
          @click="switchAgent"
        >
          Передать клиента
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["client"],
  data: () => ({
    agents: [],
    newAgent: null,
    openList: false,
  }),

  async mounted() {
    this.agents = await this.$store.dispatch("fetchAgents");
  },

  methods: {
    async switchAgent() {
      if (!this.newAgent) {
        this.$toasts.push({
          type: "error",
          message: "Выберите нового агента",
        });
        return;
      }

      const agentId = this.agents.find(
        (agent) => agent.surname + " " + agent.name === this.newAgent
      ).id;

      const data = {
        clientId: this.client.id,
        newAgent: agentId,
      };

      try {
        await this.$store.dispatch("switchAgent", data);
        await this.$parent.$parent.fetchClients();
        this.$emit("close");
      } catch (e) {
        throw e;
      }
    },

    takeAgentInfo(id) {
      if (this.agents) {
        const agent = this.agents.filter((agent) => agent.id === id);
        if (agent[0]) return agent[0].surname + " " + agent[0].name;
      }
    },
  },
};
</script>
