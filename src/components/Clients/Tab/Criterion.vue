<template>
  <div class="px-8 py-4 flex flex-col">
    <div>
      <h3 class="font-medium text-gray-500">Критерии поиска</h3>
      <textarea
        v-model="criterion"
        rows="4"
        class="
          w-full
          border-2
          rounded
          shadow
          h-full
          px-2
          py-1
          focus:outline-none focus:ring-2
          ring-dividerBg
          flex
          mt-2
        "
        @keydown.enter.exact.prevent
        @input="$emit('openSave', true)"
        @keydown.enter.shift.exact="newline"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import errors from "../../../errors";
export default {
  props: ["client"],
  data: () => ({
    criterion: null,
  }),

  mounted() {
    this.checkInfo();
  },

  methods: {
    checkInfo() {
      const type = typeof this.client.criterion;
      if (type == "string") {
        this.criterion = this.client.criterion;
      }
    },

    async saveCriterion() {
      try {
        await this.$store.dispatch("saveCriterion", {
          criterion: this.criterion,
          clientId: this.client.id,
        });
      } catch (e) {
        const msg = e.data["message"];
        if (msg) {
          this.$toasts.push({
            type: "error",
            message: errors[msg],
          });
        } else {
          this.$toasts.push({
            type: "error",
            message: msg,
          });
        }
        throw e;
      }
    },

    newline() {
      this.value = `${this.value}\n`;
    },
  },
};
</script>
