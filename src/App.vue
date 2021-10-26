<template>
  <component :is="layout">
  </component>
</template>


<script>
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
export default {
  
    computed: {
      layout() {
        return this.$route.meta.layout ? (this.$route.meta.layout + '-layout') : 'auth-layout'
      }
    },

    components: {MainLayout, AuthLayout}

}
</script>


