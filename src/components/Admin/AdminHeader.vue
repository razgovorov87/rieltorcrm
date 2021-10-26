<template>
	<header class="absolute h-divider bg-white z-10 flex" style="width: calc(100% - 65px);">
		<div class="flex items-center py-4 px-8 h-full border-r flex-shrink-0">
			<span class="uppercase font-bold">Клиенты</span>
			<div class="text-gray-400 flex items-center ml-4 space-x-2">
				<!-- <div class="cursor-pointer group" @click="changeTypeDisplay('column')">
					<svg
						class="w-6 transform rotate-90 group-hover:text-blue-500 transition"
						:class="typeDisplay === 'column' ? 'text-blue-500' : ''"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h7M4 12h12M4 18h16"
						/>
					</svg>
				</div> -->

				<div class="cursor-pointer group" @click="changeTypeDisplay('table')">
					<svg
						class="w-6 group-hover:text-blue-500 transition"
						:class="typeDisplay === 'table' ? 'text-blue-500' : ''"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</div>
			</div>
		</div>

		<div class="flex flex-grow items-center px-4">
			<div class="my-2 flex bg-white rounded">
				<div class="flex flex-auto">

					<autocomplete
						:search="search"
						aria-placeholder="Поиск телефона"
						placeholder="Поиск телефона"
						style="width: 26rem;"
						@submit="openClient"
						:get-result-value="getResultValue"
					>
						<template #result="{ result, props }">
							<li v-bind="props">
								<div class="flex justify-between">
									<span v-if="!result.archived">{{result.phone}}</span>
									<span v-else-if="result.archived" class="text-red-600">{{result.phone}}</span>
									<div v-if="result.archived">
										<span class="text-xs text-white bg-red-400 py-1 px-3 rounded-full text-xs">Удален</span>
									</div>
									<div>
										<span v-if="result.status === 'Не обработано' " class="text-white py-1 px-3 rounded-full text-xs bg-gray-500">{{ result.status }}</span>
										<span v-if="result.status === 'В работе' " class="text-white py-1 px-3 rounded-full text-xs bg-blue-500">{{ result.status }}</span>
										<span v-if="result.status === 'Просмотр квартир' " class="text-white py-1 px-3 rounded-full text-xs bg-yellow-600">{{ result.status }}</span>
										<span v-if="result.status === 'Прошла сделка' " class="text-white py-1 px-3 rounded-full text-xs bg-green-500">{{ result.status }}</span>
										<span v-if="result.status === 'Отказались' " class="text-white py-1 px-3 rounded-full text-xs bg-red-500">{{ result.status }}</span>
									</div>
								</div>
							</li>
						</template>
					</autocomplete>
				</div>
			</div>
		</div>

		<div class="flex items-center py-4 px-4 h-full border-l flex-shrink-0">
			<div
				class="flex cursor-pointer rounded bg-blue-500 px-3 py-2 text-white font-medium hover:bg-blue-600 transition"
				@click="$emit('addNewClient')"
			>
				<svg
					class="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
					></path>
				</svg>
				<span>Добавить клиента</span>
			</div>
		</div>
	</header>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
export default {
	props: ['typeDisplay'],
	data: () => ({
		checkPhone: null,
		phones: [],
		archivePhones: []
	}),

	async mounted() {
		this.phones = await this.$store.dispatch('fetchClients');
		this.archivePhones = await this.$store.dispatch('fetchArchiveClients');
		this.replacePhone();
	},

	methods: {
		replacePhone() {
			if (this.phones && this.phones.length === 0) return;


			const resultArr = this.phones.concat(this.archivePhones)

			resultArr.forEach((client) => {
				let phone = client.phone;
				const result =
					'8' + phone.slice(4, 7) + phone.slice(9, 12) + phone.slice(13, 15) + phone.slice(16, 18);
				client.checkPhone = result;
			});
		},

		getResultValue(result) {
			return result.phone
		},

		search(input) {
			if (input.length < 1) return [];

			const resultArr = this.phones.concat(this.archivePhones)

			const list = resultArr.filter((phone) => {
				return phone.checkPhone.includes(input);
			});

			const res = [];
			if (list.length !== 0) {
				list.forEach((phone) => res.push(phone.phone));
			}
			return list;
		},

		openClient(result) {
			const resultArr = this.phones.concat(this.archivePhones)
			const item = resultArr.find((phone) => phone.phone === result.phone);
			this.$emit('openClient', item);
		},

		changeTypeDisplay(type) {
			if (this.typeDisplay === type) return;

			this.$emit('changeTypeDisplay', type);
		},
	},

	components: { Autocomplete },
};
</script>
