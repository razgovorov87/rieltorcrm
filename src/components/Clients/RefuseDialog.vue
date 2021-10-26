<template>
    <div class="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div class="w-1/3 bg-white flex flex-col rounded">

            <div class="flex justify-center items-center px-6 py-4 border-b">
                <span class="font-medium text-gray-600 text-xl flex-grow">Укажите причину отказа</span>
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
                
                <h3 class="font-medium text-gray-500 mb-2">Причина отказа</h3>
                <div class="flex-grow border rounded bg-white cursor-pointer relative border-gray-300">
                    <div class="flex justify-between items-center px-4 py-2" @click="openList = true">
                        <span v-if="cause">{{ cause }}</span>
                        <span v-else class="text-gray-400">Выберите подходящих вариант из списка...</span>
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
                    <div v-if="openList" class="absolute top-full h-20 w-full right-0 pt-2 z-30"
                        v-click-outside="() => {
                            openList = false;
                        }"
                    >
                        <div class="bg-white flex flex-col border rounded shadow border-gray-100 overflow-hidden">
                            <span
                            v-for="(item, idx) in causeItems"
                            :key="item + idx"
                            class="border-b px-4 py-2 hover:bg-dividerBg hover:text-white select-none"
                            @click="
                                ($event) => {
                                cause = $event.target.innerText;
                                openList = false;
                                }
                            ">{{ item }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="cause === 'Другое'" class="flex mt-4">
                    <input
                        v-model="otherCause"
                        type="text"
                        class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg mb-2 flex-grow mr-2"
                        placeholder="Другая причина"
                    />
                </div>

                <div class="mt-4">
                    <h3 class="font-medium text-gray-500">Комментарий</h3>
                    <textarea 
                        v-model="comment"
                        rows="4" 
                        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex mt-2 mb-4"
                        @keydown.enter.exact.prevent
                        @input="$emit('openSave', true)"
                        @keydown.enter.shift.exact="newline">
                    </textarea>
                </div>

                
            </div>


            <div class="flex justify-center items-center px-6 py-4 border-t">
                <button
                    class="focus:outline-none rounded bg-dividerBg text-white hover:bg-darkDivider hover:shadow-lg hover:text-gray-200 p-1 px-3 text-lg font-medium flex items-center justify-center transition relative flex-shrink-0 cursor-pointer"
                    @click="refuse"
                >
                    Отказаться
                </button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: ['client'],
    data: () => ({
        cause: null,
        causeItems: ['Не актуально', 'Реклама', 'Ищут без комиссии', 'Не сработались', 'Прислал варинаты, игнор', 'По конкретной квартире/не нужна подборка', 'Не берет трубку/Не доступен','Другое'],
        openList: false,
        otherCause: null,
        comment: null
    }),


    methods: {
        async refuse() {
            if(this.cause === '' || !this.cause) {
                this.$toasts.push({
                    type: 'error',
                    message: 'Укажите причину отказа'
                })
                return
            } else if (this.cause === 'Другое' && (this.otherCause === '' || !this.otherCause) ) {
                this.$toasts.push({
                    type: 'error',
                    message: 'Укажите причину отказа'
                })
                return
            }

            const data = {
                cause: this.cause,
                otherCause: this.otherCause,
                comment: this.comment,
                clientId: this.client.id
            }

            try {
                await this.$store.dispatch('refuseClient', data)
                this.$parent.$emit('closeDrawer')
                this.$parent.$emit('reloadList')
            } catch (e) {throw e}
        },

        newline() {
            this.value = `${this.value}\n`;
        },
    }
}
</script>