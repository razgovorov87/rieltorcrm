<template>
    <div class="flex flex-col px-8 py-4"> 
      <h3 class="font-medium text-gray-500">Отказы от клиента</h3>
      <div class="flex flex-col">
          <div v-for="(cause, idx) in causes" :key="cause + idx" class="flex flex-col mt-4 border-2 px-3 py-2 rounded bg-white space-y-3">

              <div class="flex items-center">
                  <span class="w-36">Причина отказа:</span>
                  <span v-if="cause.cause !== 'Другое'" class="flex-grow border-b-2 border-gray-300 border-dashed italic">{{cause.cause}}</span>
                  <span v-else class="flex-grow border-b-2 border-gray-300 border-dashed italic">{{cause.otherCause}}</span>
              </div>

              <div v-if="cause.comment" class="flex mt-3">
                  <span class="w-36">Комментарий:</span>
                  <div class="ml-1 rounded border-2 border-gray-300 px-2 italic break-words" style="max-width: 78.5%;">{{cause.comment}}</div>
              </div>

              <div class="flex items-center w-full">
                  <span class="w-36">Агент:</span>
                  <span class="font-medium flex-grow">{{ takeAgentInfo(cause.agent) }}</span>
              </div>

            <div class="flex items-center w-full">
                <span class="w-36">Дата:</span>
                <span class="rounded-full bg-white shadow border px-3">{{ cause.date | date('fullmonthDayPlusTime') }}</span>
            </div>

          </div>
      </div>
    </div>
</template>

<script>
export default {

    props: ['client'],


    data: () => ({
        agents: [],
        causes: []
    }),

    async mounted() {
        this.agents = await this.$store.dispatch('fetchAgents');
        this.causes = this.client.causes
    },

    methods: {
        takeAgentInfo(id) {
			if (this.agents) {
				const agent = this.agents.filter((agent) => agent.id === id);
				if (agent[0]) return agent[0].surname + ' ' + agent[0].name;
			}
		},
    }

}
</script>