<template>
	<div class="w-full flex flex-col bg-gray-200">
		<div class="bg-white">
			<tr
				v-for="agent in agents.filter(agent => agent.status !== 'deleted')"
				:key="agent.id"
				class="border-b border-gray-200 hover:bg-gray-100 flex items-center"
			>
				<td class="w-2/12 py-3 px-6 text-left flex items-center whitespace-nowrap">
					<div class="flex items-center">
						<span class="font-medium">{{ agent.surname + ' ' + agent.name + ' ' + agent.secondName }}</span>
					</div>
					<div v-if="agent.isAdmin" class="bg-red-400 px-2 py-0.5 text-xs text-white font-medium rounded shadow ml-2">
						Администратор
					</div>
				</td>

				<td class="w-2/12 py-3 px-6 text-center whitespace-nowrap">
					<div class="flex flex-col items-center justify-center">
						<div>
							<span class="border-b border-gray-400 select-none">Логин:</span> {{agent.login}}
						</div>
						<div>
							<span class="border-b border-gray-400 select-none">Пароль:</span> {{agent.password}}
						</div>
					</div>
				</td>

				<td class="w-2/12 py-3 px-6 text-center">
					<div class="flex items-center justify-center">
						<div class="mr-2">
							<svg
								class="w-5"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<span class="font-medium border-b border-gray-400">{{ agent.phone }}</span>
					</div>
				</td>

				<td class="w-2/12 py-3 px-6 text-center whitespace-nowrap">
					<div class="flex items-center justify-center">
						<span class="font-medium">{{ agent.createdAt | date('fullmonthDayPlusTime') }}</span>
					</div>
				</td>

				<td v-if="!agent.isAdmin" class="w-1/12 py-3 px-6 text-center whitespace-nowrap">
					<div class="flex items-center justify-center">
						<span class="font-medium">{{ clientsCount(agent.id) }}</span>
					</div>
				</td>

				<td v-if="!agent.isAdmin" class="w-2/12 py-3 px-6 text-left whitespace-nowrap">
					<div class="flex items-center justify-center">
						<span class="font-medium">{{ offerCount(agent.id) }}</span>
					</div>
				</td>

				<td v-if="agent.isAdmin" class="w-3/12 py-3 px-6 flex flex-col justify-center items-center text-center whitespace-nowrap">
					<div class="flex items-center justify-center">
						Принятых звонков: 
						<span v-if="callCount(agent.id) !== 0" class="font-medium ml-1">{{ (callNotMissedCount(agent.id) / callCount(agent.id) * 100).toFixed(2) + "%" }}</span>
						<span v-else class="font-medium ml-1">0%</span>
					</div>
					<div>
						Сегодня:
						<span class="font-medium ml-1">{{callToday(agent.id)}}</span>
					</div>
				</td>

				<td class="w-1/12 py-3 px-6 text-center">
					<div class="flex items-center justify-center">

						<!-- <div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer" @click="$emit('openClient', client)">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
								/>
							</svg>
						</div> -->

						<div class="w-5 mr-2 group cursor-pointer relative" @click="verifyAgent(agent)">
							<svg 
								class="transition duration-300 group-hover:text-green-500"
								:class="[{
									'text-green-600 cursor-default': agent.verify
								}]"
								xmlns="http://www.w3.org/2000/svg" 
								fill="none" 
								viewBox="0 0 24 24" 
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div v-if="!agent.verify" class="absolute bottom-1/2 transform translate-y-1/2 right-0 w-36 text-white bg-darkDivider z-50 rounded py-1 px-2 opacity-0 transition duration-300 group-hover:opacity-100">
								Подтвердить аккаунт
							</div>
						</div>

						<div class="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer" @click="$emit('deleteUser', agent)">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</div>


					</div>
				</td>
			</tr>
		</div>
	</div>
</template>

<script>
export default {
	props: ['agents', 'clients'],
	data: () => ({
	}),

	methods: {
		takeAgentInfo(id) {
			if (this.agents) {
				const agent = this.agents.filter((agent) => agent.id === id);
				if (agent[0]) return agent[0].fio;
			}
		},

		offerCount(objects) {
			if(!objects) return 0
				
			let count = 0;
			objects.forEach(obj => {
				if(obj.status === 'offered') count++
			});

			return count
		},

		refuseCount(causes) {
			if(!causes) return 0
			return Object.keys(causes).length
		},

		async verifyAgent(agent) {
			try {
				await this.$store.dispatch('verifyAgent', agent.id)
				this.$toasts.push({
					type: 'success',
					message: 'Аккаунт успешно подтвержден'
				})
				this.$emit('refreshList')
			} catch (e) {throw e}
		},

		clientsCount(id) {
			if(!this.clients) return 0

			const matched = this.clients.filter(client => client.agent === id)
			return matched.length
		},

		callCount(id) {
			if(!this.clients) return 0

			
			const matched = this.clients.filter(client => client.author === id)
			return matched.length
		},

		callMissedCount(id) {
			if(!this.clients) return 0

			
			const matched = this.clients.filter(client => client.author === id && client.missedCall)
			return matched.length
		},

		callNotMissedCount(id) {
			if(!this.clients) return 0

			
			const matched = this.clients.filter(client => client.author === id && !client.missedCall)
			return matched.length
		},

		callToday(id) {
			if(!this.clients) return 0

			const isoDate = new Date().toISOString()
			const today = isoDate.slice(0, -14)


			
			const matched = this.clients.filter(client => {
				const clientDate = new Date(client.createdAt).toISOString().slice(0, -14)
				if( clientDate === today &&  client.author === id && !client.missedCall) {
					return client
				}
			})
			return matched.length
		},

		offerCount(id) {
			if(!this.clients) return 0

			const matched = this.clients.filter(client => client.agent === id)
			let count = 0
			matched.forEach( item => {
				if(item.logs) {
					Object.keys(item.logs).forEach( key => {
						Object.keys(item.logs[key]).forEach(logId => {
							const path = item.logs[key][logId]

							if( path.logType === 'offerObject' && path.agent === id) count++
						})
					})
				}
				
			})

			return count
		},
	},
};
</script>
