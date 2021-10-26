<template>
	<div
		class="flex container mx-auto items-center"
		:class="{
			'h-full': !screen,
			'h-screen': screen,
		}"
	>
		<div class="flex bg-white rounded-lg overflow-hidden shadow items-center px-8 py-4">
			<div class="w-5/12">
				<img src="@/assets/empty.png" alt="" />
			</div>
			<div class="w-1/12"></div>
			<div class="w-5/12">
				<h1 class="font-black text-4xl text-gray-500">Ошибка!</h1>
				<p class="text-xl my-4">Нам не удалось получить информацию из базы данных.</p>
				<p class="text-sm">
					Попробуйте обновить страницу позже и обратитесь к администрации приложения для скорейшего
					решения проблемы.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['screen'],
};
</script>
