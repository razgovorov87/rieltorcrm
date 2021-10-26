<template>
    <div class="absolute inset-0 bg-black bg-opacity-60 h-screen z-50 flex items-center justify-center">
        <div class="w-1/3 bg-white flex flex-col rounded">

            <div class="flex justify-center items-center px-6 py-4 border-b text-gray-600">
                <div class="flex-grow flex items-center justify-center">
                    <span class="font-medium text-xl">У Вас новые клиенты!</span>
                </div>
            </div>

            <div class="flex-grow py-4 px-6">

                <div
                    v-for="i in clients"
                    :key="i.id"
                    class="w-full py-1 px-2 mb-2 bg-white shadow border flex cursor-pointer hover:bg-gray-100 transition select-none"
                >
                    <div class="flex flex-col flex-grow">
                        <span v-if="i.fio" class="text-sm text-gray-500">{{ i.fio }}</span>
                        <span v-else class="text-sm text-gray-500 italic">Неизвестно</span>
                        <h2
                            class="text-blue-500 font-semibold mb-1 truncate"
                            style="max-width: 234px"
                        >
                            {{ i.phone }}
                        </h2>
                        <span class="text-sm text-gray-500">{{ i.budget | currency }}</span>
                    </div>
                    <div class="flex flex-shrink-0 items-start">
                        <span class="text-xs text-gray-500">{{ i.createdAt | date }}</span>
                    </div>
                </div>

                
            </div>


            <div class="flex justify-center items-center px-6 py-4 border-t">
                <button
                    class="focus:outline-none rounded bg-dividerBg text-white hover:bg-darkDivider hover:shadow-lg hover:text-gray-200 p-1 px-3 text-lg font-medium flex items-center justify-center transition relative flex-shrink-0 cursor-pointer"
                    @click="closeDialog"
                >
                    Отлично
                </button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: ['clients'],
    data: () => ({

    }),

    methods: {
        async closeDialog() {
            try {
                await this.$store.dispatch('removeNewClients', this.clients)
                this.$emit('close')
            } catch (e) {throw e}
        }
    }
}
</script>