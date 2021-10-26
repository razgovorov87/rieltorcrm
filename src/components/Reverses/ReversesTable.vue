<template>
	<div class="">
		<div class="w-full text-center text-xl font-medium mt-4">
			Предстоящие встречи
		</div>

		<table class="w-full bg-white shadow-md rounded mt-3 mb-6">
			<thead>
				<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex w-full">
					<th class="py-3 px-6 text-left w-2/12">Агент</th>
					<th class="py-3 px-6 text-center w-2/12">Дата и время</th>
					<th class="py-3 px-6 text-center w-2/12">Клиент</th>
					<th class="py-3 px-6 text-center w-2/12 truncate">Ссылка на объект</th>
					<th class="py-3 px-6 text-left w-2/12">Создал</th>
					<th class="py-3 px-6 text-center w-2/12">Результат встречи</th>
				</tr>
			</thead>
			<tbody
				class="text-gray-600 text-sm font-light overflow-y-auto flex flex-col w-full"
				style="max-height: 32.2vh"
			>

				<div class="bg-white">
					<tr 
						v-for="(item, idx) in sortedReserve"
						:key="item + idx"
						class="border-b border-gray-200 hover:bg-gray-100 flex items-center"
					>
					
						<td class="w-2/12 py-3 px-6 text-left whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium">{{ takeAgentInfo(item.agent) }}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium border-b border-dashed border-gray-400">{{ item.date | date('fullmonthDayAndYear')  }} в {{item.time}}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span v-if="item.agent === uid" class="font-medium border-b bg-gray-100 rounded px-3 py-1 shadow cursor-pointer">{{ takeClientInfo(item.clientId) }}</span>
								<div v-else class="font-medium"><span class="text-gray-400 border-b-0">Агент:</span> {{ takeAgentPhone(item.agent) }}</div>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<a :href="item.obj.link" target="_blank" class="font-medium border-b border-dashed border-gray-400 truncate max-w-xs">{{ item.obj.link  }}</a>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-left flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium">{{ takeAgentInfo(item.author) }}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-left flex justify-center whitespace-nowrap">

							<div class="flex items-center justify-center">
								
								<div v-if="item.result && item.agent === uid" class="font-medium text-white flex items-center cursor-pointer" @click="$emit('openResultDialog', item)">
									<span v-if="item.result === 'Оставили залог'" class="px-3 py-1 bg-green-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент думает'" class="px-3 py-1 bg-yellow-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент отказался'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Подписали договор'" class="px-3 py-1 bg-green-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Просмотр отменился'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>

									<span class="ml-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</span>

								</div>

								<div v-else-if="item.result && item.agent !== uid" class="font-medium text-white flex items-center">
									<span v-if="item.result === 'Оставили залог'" class="px-3 py-1 bg-green-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент думает'" class="px-3 py-1 bg-yellow-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент отказался'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Подписали договор'" class="px-3 py-1 bg-green-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Просмотр отменился'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>
								</div>
								
								<div v-else-if="!item.result && item.agent === uid" class="mr-2 transition transform hover:text-blue-500 hover:scale-110 cursor-pointer" @click="$emit('openResultDialog', item)">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</div>

								<div v-else class="mr-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</div>

							</div>
							
						</td>

					</tr>
					
				</div>

				

			</tbody>
		</table>

		<div class="w-full text-center text-xl font-medium mt-8 mb-2">
			Прошедшие встречи
		</div>

		<table class="w-full bg-white shadow-md rounded">
			<thead>
				<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex w-full">
					<th class="py-3 px-6 text-left w-2/12">Агент</th>
					<th class="py-3 px-6 text-center w-2/12">Дата и время</th>
					<th class="py-3 px-6 text-center w-2/12">Клиент</th>
					<th class="py-3 px-6 text-center w-2/12 truncate">Ссылка на объект</th>
					<th class="py-3 px-6 text-left w-2/12">Создал</th>
					<th class="py-3 px-6 text-center w-2/12">Результат встречи</th>
				</tr>
			</thead>
			<tbody
				class="text-gray-600 text-sm font-light overflow-y-auto flex flex-col w-full"
				style="max-height: 51.8vh"
			>

				<div class="bg-white">
					<tr 
						v-for="(item, idx) in sortedArchive"
						:key="item + idx"
						class="border-b border-gray-200 hover:bg-gray-100 flex items-center"
					>
					
						<td class="w-2/12 py-3 px-6 text-left whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium">{{ takeAgentInfo(item.agent) }}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium border-b border-dashed border-gray-400">{{ item.date | date('fullmonthDayAndYear')  }} в {{item.time}}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center">
								<span v-if="item.agent === uid" class="font-medium border-b bg-gray-100 rounded px-3 py-1 shadow cursor-pointer">{{ takeClientInfo(item.clientId) }}</span>
								<div v-else class="font-medium"><span class="text-gray-400 border-b-0">Агент:</span> {{ takeAgentPhone(item.agent) }}</div>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-center flex justify-center whitespace-nowrap">
							<div class="flex items-center truncate">
								<a :href="item.obj.link" target="_blank" class="font-medium border-gray-400">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
								
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-left flex whitespace-nowrap">
							<div class="flex items-center">
								<span class="font-medium">{{ takeAgentInfo(item.author) }}</span>
							</div>
						</td>

						<td class="w-2/12 py-3 px-6 text-left flex justify-center whitespace-nowrap">

							<div class="flex items-center justify-center">

								<div v-if="item.result && item.agent === uid" class="font-medium text-white flex items-center cursor-pointer" @click="$emit('openResultDialog', item)">
									<span v-if="item.result === 'Оставили залог'" class="px-3 py-1 bg-green-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент думает'" class="px-3 py-1 bg-yellow-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент отказался'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Подписали договор'" class="px-3 py-1 bg-green-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Просмотр отменился'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>

									<span class="ml-2">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</span>

								</div>

								<div v-else-if="item.result && item.agent !== uid" class="font-medium flex items-center">
									<span v-if="item.result === 'Оставили залог'" class="px-3 py-1 bg-green-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент думает'" class="px-3 py-1 bg-yellow-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Клиент отказался'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>
									<span v-else-if="item.result === 'Подписали договор'" class="px-3 py-1 bg-green-300 shadow rounded text-gray-700">{{item.result}}</span>
									<span v-else-if="item.result === 'Просмотр отменился'" class="px-3 py-1 bg-red-500 shadow rounded text-white">{{item.result}}</span>
								</div>
								
								<div v-else-if="!item.result && item.agent === uid" class="mr-2 transition transform hover:text-blue-500 hover:scale-110 cursor-pointer" @click="$emit('openResultDialog', item)">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</div>

								<div v-else class="mr-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								</div>

							</div>
							
						</td>

					</tr>
				</div>

				

			</tbody>
		</table>

	</div>
</template>

<script>
export default {
	props: ['reverses'],
	data: () => ({
		agents: [],
		clients: [],
		uid: null
	}),

	async mounted() {
		this.agentsInfo();
		this.clientsInfo();
		this.uid = await this.$store.dispatch('getUid');
	},

	methods: {
		test(item) {
			console.log(item)
			// $emit('openResultDialog', item)
		},
		async agentsInfo() {
			this.agents = await this.$store.dispatch('fetchAgents')
		},

		async clientsInfo() {
			this.clients = await this.$store.dispatch('fetchClients')
		},

		takeAgentInfo(id) {
			if (this.agents) {
				const agent = this.agents.filter((agent) => agent.id === id);
				if (agent[0]) return agent[0].name + ' ' + agent[0].surname;
			}
		},

		takeAgentPhone(id) {
			if (this.agents) {
				const agent = this.agents.filter((agent) => agent.id === id);
				if (agent[0]) return agent[0].phone;
			}
		},

		takeClientInfo(id) {
			if (this.clients) {
				const client = this.clients.filter((client) => client.id === id);
				if (client[0]) return client[0].phone;
			}
		},
	},

	computed: {
		sortedReserve() {
			if(!this.reverses) return []
			const arr =  Object.keys(this.reverses).map(key => ({...this.reverses[key]}))
			arr.sort( function(a, b) {
				const dateA = new Date(a.date)
				const dateB = new Date(b.date)

				return dateA - dateB
			})

			const date = new Date()

			const today =
				date.getUTCFullYear() + '-'
				+ (date.getUTCMonth() < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1) ) + '-'
				+ (date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate())


			const result = arr.filter(item => item.date >= today)


			return result
		},

		sortedArchive() {
			if(!this.reverses) return []
			const arr =  Object.keys(this.reverses).map(key => ({...this.reverses[key]}))
			arr.sort( function(a, b) {
				const dateA = new Date(a.date)
				const dateB = new Date(b.date)

				return dateB - dateA
			})

			const date = new Date()

			const today =
				date.getUTCFullYear() + '-'
				+ (date.getUTCMonth() < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1) ) + '-'
				+ (date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate())

			const result = arr.filter(item => item.date < today)


			return result
		},
	},

};
</script>
