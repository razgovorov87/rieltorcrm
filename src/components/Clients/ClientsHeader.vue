<template>
  <div class="flex space-x-2 justify-center">

    <div v-for="category in categories" :key="category.id" class="column-header" :class="'border-' + category.color">
      <h3 class="uppercase font-semibold text-sm">{{category.title}}</h3>
      <div class="text-sm">Клиентов: <span>{{clients.filter(item => item.status === category.title).length}}</span></div>
    </div>

  </div>
</template>

<script>
export default {
    props: ['categories', 'clients']
}
</script>


<style>
.column-header {
  @apply w-1/4 border-b-2 flex flex-col items-center py-2 flex-shrink-0 text-center;
}
</style>