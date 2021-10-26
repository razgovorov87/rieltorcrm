<template>
	<div class="container py-4 mx-auto">
		<ClientsHeader :categories="categories" :clients="clients" />
		<AdminList
			:categories="categories"
			:clients="clients"
			:disableBtn="true"
			@openItemDrawer="
				(client) => {
					$emit('openClient', client);
				}
			"
		/>
	</div>
</template>

<script>
import ClientsHeader from '@/components/Clients/ClientsHeader';
import AdminList from '@/components/Admin/AdminList';
export default {
	props: ['categories', 'clients'],

	data: () => ({
		itemsDrawer: false,
	}),

	methods: {},

	components: {
		ClientsHeader,
		AdminList,
	},
};
</script>
