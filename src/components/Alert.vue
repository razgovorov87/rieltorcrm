<template>
  <li
    :class="[
      `bg-${color}-200`,
      {
        'mb-2': position.includes('top'),
        'mt-2': position.includes('bottom')
      },
      type === 'error' ? 'border-red-300' : '',
      type === 'success' ? 'border-green-300' : '',
    ]"
    class="alert flex flex-row items-center p-5 rounded border-b-2"
    role="alert"
    @click="$emit('remove')"
  >
    <div v-if="type === 'error'" class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
        <span class="text-red-500">
            <svg fill="currentColor"
                    viewBox="0 0 20 20"
                    class="h-6 w-6">
                <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
            </svg>
        </span>
    </div>

    <div v-else-if="type === 'success'" class="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
        <span class="text-green-500">
            <svg fill="currentColor"
                    viewBox="0 0 20 20"
                    class="h-6 w-6">
                <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
            </svg>
        </span>
    </div>

    <div class="alert-content ml-4">
        <div class="alert-title font-semibold text-lg text-red-800"
        :class="[
            type === 'error' ? 'text-red-800' : '',
            type === 'success' ? 'text-green-800' : '',
        ]">
            {{type === 'error' ? 'Ошибка' : 'Успешно'}}
        </div>
        <div class="alert-description text-sm"
        :class="[
            type === 'error' ? 'text-red-600' : '',
            type === 'success' ? 'text-green-600' : '',
        ]">
            {{message}}
        </div>
    </div>
  </li>
</template>

<script>
import ToastMixin from "vue-my-toasts/src/mixins/ToastMixin"
import TimerMixin from "vue-my-toasts/src/mixins/TimerMixin"

export default {
  name: 'Alert',

  mixins: [ToastMixin, TimerMixin],

  props: {
    badge: {
      type: [String, Boolean],
      required: false,
      default: false
    }
  },

  computed: {
    color() {
      switch (this.type) {
        case 'base':
          return 'blue'
        case 'warning':
          return 'orange'
        case 'error':
          return 'red'
        case 'success':
          return 'green'
        default:
          return 'blue'
      }
    }
  }
}
</script>

<style scoped>
svg.bottom-middle {
  transform: rotate(90deg);
}

svg.top-middle {
  transform: rotate(-90deg);
}

svg.bottom-left {
  transform: rotate(180deg);
}

svg.top-left {
  transform: rotate(180deg);
}
</style>