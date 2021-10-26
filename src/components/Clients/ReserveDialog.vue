<template>
    <div class="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-40">
        <div class="w-6/12 bg-white flex flex-col rounded">

            <div class="flex justify-center items-center px-6 py-4 border-b">
                <span class="font-medium text-gray-600 text-xl flex-grow">Записать на просмотр квартиры</span>
                <button
                    class="focus:outline-none rounded-full hover:bg-gray-400 p-1 flex items-center justify-center transition relative flex-shrink-0 w-8 h-8 cursor-pointer"
                    @click="$emit('close')"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="flex-grow py-4 px-6">

                <h3 class="font-medium text-gray-500 mb-2">Ссылка на объявление</h3>
                <div class="w-full bg-gray-200 px-3 py-1 text-gray-500 rounded border-2 border-gray-300">
                    {{obj.link}}
                </div>

                <h3 class="font-medium text-gray-500 mb-2 mt-4">Дата просмотра</h3>
                <div class="flex items-center space-x-2">
                    <input v-model="date" max="2024-12-31" min="2021-01-01" type="date" class="w-full px-3 py-1 rounded border-2 border-gray-300 focus:outline-none">
                    <input v-model="time" type="time" class="w-full px-3 py-1 rounded border-2 border-gray-300 focus:outline-none">
                </div>

                <h3 class="font-medium text-gray-500 mb-2 mt-4">Агент, который поедет показывать квартиру</h3>
                <div class="flex-grow border rounded bg-white cursor-pointer relative border-gray-300">
                    <div class="flex justify-between items-center px-4 py-2" @click="openList = true">
                        <span v-if="selectAgent">{{ selectAgent }}</span>
                        <span v-else class="text-gray-400">Выберите агента из списка...</span>
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
                    <div v-if="openList" class="absolute top-full h-20 w-full right-0 pt-2 z-50"
                        v-click-outside="() => {
                            openList = false;
                        }"
                    >
                        <div class="bg-white flex flex-col border rounded shadow border-gray-100 overflow-y-auto" style="max-height: 23vh;">
                            <span
                            v-for="(item, idx) in agents.filter(agent => agent.verify && agent.status !== 'deleted')"
                            :key="item + idx"
                            class="border-b px-4 py-2 transition hover:bg-dividerBg hover:text-white select-none"
                            @click="
                                ($event) => {
                                selectAgent = item.name + ' ' + item.surname
                                selectAgentId = item.id
                                openList = false
                                }
                            ">{{ item.name + ' ' + item.surname }}</span>
                        </div>
                    </div>
                </div>

                
            </div>


            <div class="flex justify-center items-center px-6 py-4 border-t">
                <button 
                class="focus:outline-none rounded bg-dividerBg text-white hover:bg-darkDivider hover:shadow-lg hover:text-gray-200 p-1 px-3 text-lg font-medium flex items-center justify-center transition relative flex-shrink-0 cursor-pointer"
                @click="reserve"
                >
                    Записать
                </button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: ['obj'],

    data: () => ({
        openList: false,
        date: null,
        time: null,
        agents: [],
        selectAgent: null,
        selectAgentId: null
    }),

    async mounted() {
        this.agents = await this.$store.dispatch('fetchAgents')
    },

    methods: {
        reserve() {
            if( this.date <= '2021-01-01' || this.date >= '2024-12-31' || !this.date || !this.time) {
                this.$toasts.push({
                    type: 'error',
                    message: 'Неверная дата или время'
                })
                return
            }
            else if(this.selectAgent === '' || !this.selectAgent) {
                this.$toasts.push({
                    type: 'error',
                    message: 'Необходимо выбрать агента'
                })
                return
            }

            const data = {
                obj: this.obj,
                agent: this.selectAgentId,
                date: this.date,
                time: this.time
            }

            this.$emit('reserveObj', data)
        }
    },
}
</script>