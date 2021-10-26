<template>
    <div class="h-screen w-full flex items-center justify-center bg-gray-200">
        <div class="container mx-auto bg-white rounded-lg shadow-xl relative z-20">
            <div class="flex h-full">
                <transition name="opacity" mode="out-in">
                    <router-view />
                </transition>
                <div class="w-1/2 flex pr-20" id="authRight">
                    <div class="w-full h-full"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        page() {
            return this.$route.name === 'Авторизация' ? true : false 
        }
    }
}
</script>

<style>
#authRight {
    background-color: #E9EBFC;
}
#authRight div {
    background: url('../assets/animation.gif') center no-repeat;
    background-size: contain;
}
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity .3s ease;
}
.opacity-enter,
.opacity-leave-to {
    opacity: 0;
}
</style>