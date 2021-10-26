<template>
	<div class="bg-white shadow-md rounded my-4">


		<table class="w-full">
			<thead>
				<tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal flex w-full items-center">
					<th class="py-3 px-6 text-left w-2/12">Клиент</th>

					
					<th class="py-3 px-6 text-left w-2/12 flex items-center">
					
						Агент
						<div class="ml-2 w-full">
							<div class="flex-grow border rounded bg-white cursor-pointer relative border-gray-300 text-xs w-full">
								<div class="flex justify-between items-center px-2 py-1" @click="openList = true">
									<span v-if="user">{{ user }}</span>
									<span v-else class="text-gray-400"></span>
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
											@click="($event) => {
												user = $event.target.innerText;
												userId = null
												openList = false
											}" 
											class="border-b px-2 py-2 hover:bg-dividerBg text-gray-400 hover:text-white select-none italic"
										>Все агенты</span>
										<span
											v-for="(item, idx) in agents.filter(agent => agent.verify && agent.status !== 'deleted')"
											:key="item + idx"
											class="border-b px-2 py-2 hover:bg-dividerBg hover:text-white select-none"
											@click="($event) => {
												user = takeAgentInfo(item.id);
												userId = item.id
												openList = false;
											}"
										>{{ takeAgentInfo(item.id) }}</span>
									</div>
								</div>
							</div>
						</div>
					</th>

					<th class="py-3 px-6 text-center w-2/12">Телефон</th>
					<th class="py-3 px-6 text-center w-2/12">Статус</th>
					<th class="py-3 px-6 text-center w-1/12">Предложений</th>
					<th class="py-3 px-6 text-center w-1/12">Отказов</th>
					<th class="py-3 px-6 text-center w-2/12">Действия</th>
				</tr>
			</thead>
			<tbody
				class="text-gray-600 text-sm font-light overflow-y-auto flex flex-col w-full"
				style="max-height: 84vh"
			>
				<TableGroup
					v-for="category in categories"
					:key="category.id"
					:category="category"
					:items="filterClients()"
					:agents="agents"
					:refusedGroup="false"
					@openClient="(client) => {
						$emit('openClient', client);
					}"
				/>

				<TableGroup
					:category="refusedCategory"
					:items="refused"
					:agents="agents"
					:refusedGroup="true"
					@openClient="(client) => {
						$emit('openClient', client);
					}"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import TableGroup from '@/components/ArchiveClients/TableGroup';
export default {
	props: ['categories', 'clients'],
	data: () => ({
		agents: [],
		switchDialog: false,
		switchClient: {},
		refused: [],
		refusedCategory: { id: 4, title: 'Отказались', color: 'red-500'},
		user: 'Все агенты',
		userId: null,
		openList: false
	}),

	mounted() {
		this.agentsInfo();
		this.filterClients()
		
		this.refused = this.clients.filter(client => client.status === 'Отказались')
	},

	methods: {
		async agentsInfo() {
			this.agents = await this.$store.dispatch('fetchAgents');
		},

		filterClients() {
			let arr = Object.keys(this.clients).map(key => ({...this.clients[key]}))
			arr = arr.filter(client => client.status !== 'Отказались')
			if( this.user && this.user.toLowerCase() !== 'все агенты' ) {
				arr = arr.filter(item => item.agent === this.userId)
			}
			
			return arr
		},

		takeAgentInfo(id) {
			if (this.agents) {
				const agent = this.agents.filter((agent) => agent.id === id);
				if (agent[0]) return agent[0].surname + ' ' + agent[0].name;
			}
		},
	},

	components: { TableGroup },
};
</script>
