<template>
	<header class="absolute h-divider bg-white z-10 flex" style="width: calc(100% - 65px);">
		<div class="flex items-center py-4 px-8 h-full border-r flex-shrink-0">
			<span class="uppercase font-bold">Просмотры</span>
		</div>

		<div class="flex items-center ml-4">
			<label class="flex justify-start items-start">
				<div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-dividerBg">
					<input v-model="myViews" type="checkbox" class="opacity-0 absolute">
					<svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
				</div>
				<div class="select-none">Мои просмотры</div>
			</label>

		</div>
	</header>
</template>


<script>
export default {
	data: () => ({
		myViews: false
	}),

	watch: {
		myViews() {
			this.$emit('myViews', this.myViews)
		}
	}
}
</script>

<style>
input:checked + svg {
  display: block;
}
</style>