<template>
	<div class="flex flex-col max-h-full">
		<div class="flex items-center justify-between border-b bg-gray-200 p-4">
			<span class="text-xl font-medium">Список объектов</span>
			<div class="flex-grow ml-4">
				<input v-model="search" type="text" class="px-3 py-1 rounded border-2 border-gray-300 w-1/3 focus:outline-none" placeholder="Поиск по адресу..." @input="filterObj"/>
			</div>
			<span class="cursor-pointer" @click="$emit('closeDialog')">
				<svg
					class="w-6 h-6 mt-0.5 text-gray-700"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					>
					<path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					></path>
				</svg>
			</span>
		</div>
		<div class="headerTable">
			<div class="headerTable-item borderNone"></div>
			<div class="headerTable-item textLeft">Адрес</div>
			<div class="headerTable-item">Кол-во комнат</div>
			<div class="headerTable-item">Стоимость</div>
			<div class="headerTable-item">URL</div>
		</div>
		<div class="flex-grow overflow-y-auto">
			<div class="object bg-white border-b hover:bg-gray-100" v-for="obj in filterObj()" :key="obj.id">
				<div class="flex justify-center py-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 cursor-pointer transition text-gray-400 hover:text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						@click="$emit('selectObj', obj)"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div class="flex flex-col justify-center">
					<h2 class="text-blue-500 font-semibold -mb-1">
						{{ obj.adress }}
					</h2>
				</div>
				<div v-if="obj.room" class="flex items-center justify-center">
					{{ obj.room }}
				</div>
				<div v-else class="flex items-center justify-center">-</div>
				<div class="flex justify-center items-center">{{ obj.price | currency }}</div>
				<a class="flex items-center justify-center" :href="obj.url" target="_blank">
					<span class="py-1 px-2 text-sm text-blue-800 truncate underline" style="max-width: 300px;">{{obj.url}}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		objects: [],
		search: null
	}),

	async mounted() {
		this.search = null
		this.objects = await this.$store.dispatch('fetchObjects');
		this.filterObj()
	},

	methods: {
		filterObj() {
			if( !this.search || this.search === '' || this.search.length < 3 ) return this.objects

			const arr = this.objects.filter(obj => obj.adress.toLowerCase().includes(this.search.toLowerCase()))
			return arr

		}
	}
};
</script>

<style scoped>
.headerTable {
  display: grid;
  /* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
  grid-template-columns: 150px 500px 1fr 1fr 1fr;
  background-color: #fff;
  @apply border-b shadow items-center;
}

.object {
  display: grid;
  /* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
  grid-template-columns: 150px 500px 1fr 1fr 1fr;
}

.headerTable-item {
  @apply text-center py-3 border-r text-gray-400 uppercase font-semibold text-sm tracking-widest;
}

.headerTable-item.borderNone {
  @apply border-transparent !important;
}

.headerTable-item.textLeft {
  @apply text-left !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
</style>
