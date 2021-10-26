<template>
    <div class="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div class="w-2/3 bg-white flex flex-col rounded">

            <div class="flex justify-center items-center px-6 py-4 border-b">
                <span class="font-medium text-gray-600 text-xl flex-grow">Отредактируйте объявление</span>
                <button
                    class="focus:outline-none rounded-full hover:bg-gray-400 p-1 flex items-center justify-center transition relative flex-shrink-0 w-8 h-8 cursor-pointer"
                    @click="$emit('close')"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div v-if="jsonData" class="flex-grow py-4 px-6">

                <div class="flex items-center space-x-3 mb-3">
                    <input
                        v-model="jsonData.title"
                        type="text"
                        class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg flex-grow"
                        placeholder="Заголовок"
                    />

                    <input
                        v-model="jsonData.price"
                        type="text"
                        class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg flex-grow"
                        placeholder="Цена"
                    />
                </div>

                <div class="flex items-center space-x-3 mb-3">
                    <textarea 
                        v-model="jsonData.info"
                        rows="3" 
                        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex" 
                        placeholder="Информация"
                        @keydown.enter.exact.prevent>
                    </textarea>

                    <textarea 
                        v-model="jsonData.features"
                        rows="3" 
                        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex" 
                        placeholder="Что внутри"
                        @keydown.enter.exact.prevent>
                    </textarea>
                </div>

                <div class="flex items-center space-x-3 mb-3">
                    <textarea 
                        v-model="jsonData.underground"
                        rows="3" 
                        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex" 
                        placeholder="Метро"
                        @keydown.enter.exact.prevent>
                    </textarea>

                    <textarea 
                        v-model="jsonData.params"
                        rows="3" 
                        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex" 
                        placeholder="Дополнительная информация"
                        @keydown.enter.exact.prevent>
                    </textarea>
                </div>

                <div class="flex items-center space-x-3 mb-3">
                    <textarea 
                        v-model="jsonData.description"
                        rows="3" 
                        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex" 
                        placeholder="Описание"
                        @keydown.enter.exact.prevent>
                    </textarea>
                </div>
                
            </div>


            <div class="flex justify-end items-center px-6 py-4 border-t">

                <div class="relative mr-4">
                    <input
                        v-if="jsonData"
                        v-model="jsonData.fee"
                        type="number"
                        class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded flex-grow"
                        placeholder="Коммисия"
                    />
                    <div class="absolute top-0 rounded-r right-0 h-full w-12 bg-gray-300 flex items-center justify-center text-lg">%</div>
                </div>

                <button
                    class="mr-4 focus:outline-none rounded text-red-500 hover:text-red-600 p-1 px-3 text-lg font-medium flex items-center justify-center transition relative flex-shrink-0 cursor-pointer"
                    @click="$emit('close')"
                >
                    Отмена
                </button>

                <button
                    class="focus:outline-none rounded bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:text-gray-200 p-1 px-3 text-lg font-medium flex items-center justify-center transition relative flex-shrink-0 cursor-pointer"
                    @click="saveData"
                >
                    Сохранить
                </button>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: ['info'],

    data: () => ({
        jsonData: null
    }),

    mounted() {
        this.jsonData = this.info
    },

    methods: {
        saveData() {
            this.$emit('saveObj', this.jsonData)
        }
    }
}
</script>