<template>
	<div
		class="flex-grow shadow border rounded bg-white cursor-pointer relative border-gray-100"
	>
		<div
			class="flex justify-between items-center px-4 py-2"
			@click="openList = true"
		>
		<span v-if="gender">{{ gender }}</span>
		<span v-else class="text-gray-400">Пол</span>
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
		<div
		v-if="openList"
		class="absolute top-full h-20 w-full right-0 pt-2 z-20"
		v-click-outside="
			() => {
			openList = false;
			}
		"
		>
		<div
			class="bg-white flex flex-col border rounded shadow border-gray-100 overflow-hidden"
		>
			<span
			v-for="(item, idx) in list"
			:key="item + idx"
			class="border-b px-4 py-2  hover:bg-dividerBg hover:text-white select-none"
			@click="
				($event) => {
				gender = $event.target.innerText;
				openList = false;
				$emit('openSave', true);
				}
			"
			>{{ item }}</span
			>
		</div>
		</div>
	</div>
</template>


<script>
export default {
	props: ['men'],
	data: () => ({
		openList: false,
    	list: ["Мужчина", "Женщина"],
		gender: null
	}),

	watch: {
		gender() {
			if(this.gender !== this.men.gender) {
				this.$emit('changeGender', this.gender)
				this.$emit('openSave', true)
			} else this.$emit('openSave', false)
		}
	},

	mounted() {
		this.gender = this.men.gender ? this.men.gender : null
	}
}
</script>