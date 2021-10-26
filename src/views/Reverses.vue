<template>
    <div>
        <ReversesHeader @myViews="(bool) => {myViews = bool}" />
        <Loading v-if="loading" />
        <NoData v-else-if="!reverses || reverses.length === 0" :screen="true" />

        <div v-else class="relative flex-grow pt-divider">
            <ReversesTable 
            :reverses="filterArr()"
            @openResultDialog="(item) => {
                reverse = item
                resultDialog = true
            }"/>
        </div>

        <div v-if="resultDialog" class="absolute inset-0 bg-black bg-opacity-30 z-30 flex items-center justify-center">
            <div class="bg-white rounded shadow" style="min-width: 600px;">

                <div class="flex items-center justify-center border-b border-gray-300 px-3 py-3">
                    <span class="text-lg">Результат встречи</span>
                </div>

                <div class="px-3 py-4">
                    <div class="flex-grow border rounded bg-white cursor-pointer relative border-gray-300">
                        <div class="flex justify-between items-center px-4 py-2" @click="openList = true">
                            <span v-if="result">{{ result }}</span>
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
                                v-for="(item, idx) in resultItems"
                                :key="item + idx"
                                class="border-b px-4 py-2 hover:bg-dividerBg hover:text-white select-none"
                                @click="
                                    ($event) => {
                                    result = $event.target.innerText;
                                    openList = false;
                                    }
                                ">{{ item }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-300 px-3 py-3 flex items-center justify-end">
                    <div
                     class="text-red-500 px-3 py-1 rounded font-medium hover:text-red-600 transition cursor-pointer mr-4"
                     @click="resultDialog = false"
                    >Отмена</div>

                    <div
                     class="bg-green-500 px-3 py-1 rounded shadow text-white font-medium hover:bg-green-600 transition cursor-pointer"
                     @click="pushResult"
                    >Подтвердить</div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import ReversesHeader from '@/components/Reverses/ReversesHeader'
import ReversesTable from '@/components/Reverses/ReversesTable'
import NoData from "@/components/NoData";
export default {
    data: () => ({
        loading: true,
        reverses: [],
        openList: false,
        result: null,
        resultItems: ['Оставили залог', 'Клиент думает', 'Клиент отказался', 'Подписали договор', 'Просмотр отменился'],
        resultDialog: false,
        reverse: null,
        uid: null,
        myViews: false
    }),

    async mounted() {
        this.fetchReverses()
        this.uid = await this.$store.dispatch('getUid')
        this.loading = false
    },

    methods: {
        filterArr() {
            let arr = Object.keys(this.reverses).map(key => ({...this.reverses[key], id: key}))
            if(this.myViews) {
                arr = arr.filter(item => item.agent === this.uid)
            }
            
            return arr
              
        },

        async fetchReverses() {
            try {
              this.reverses = await this.$store.dispatch('fetchReserves')  
            } catch (e) {throw e}
        },

        async pushResult() {
            try {
                if( this.result === null || !this.result) {
                    this.$toasts.push({
                        type: 'error',
                        message: 'Выберите вариант из списка'
                    })
                    return
                }

                const data = {
                    reverse: this.reverse,
                    result: this.result
                }
                await this.$store.dispatch('pushResult', data)

                this.reverse = null
                this.result = null
                this.resultDialog = false
                this.fetchReverses()

                this.$toasts.push({
                    type: 'success',
                    message: 'Результат встречи добавлен'
                })
            } catch (e) {throw e}
        }
    },

    computed: {
        
    },

    components: {
        ReversesHeader,
        ReversesTable,
        NoData
    }
}
</script>