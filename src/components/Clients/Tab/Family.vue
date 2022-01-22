<template>
  <div class="flex flex-col px-8 py-4">
    <div>
      <h3 class="font-medium text-gray-500">Состав проживающих</h3>
      <textarea
        v-model="family"
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
        placeholder="Запишите весь состав семьи клиента"
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
import InputGender from "@/components/Clients/Tab/Family/InputGender";
export default {
  props: ["client"],
  data: () => ({
    family: "",
    openConfirmDialog: false,
  }),

  mounted() {
    const type = typeof this.client.composition;
    if (type == "string") {
      this.family = this.client.composition;
    }
  },

  methods: {
    saveInfo() {
      try {
        this.$store.dispatch("saveClientComposition", [
          this.client.id,
          this.family,
        ]);
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
  },

  components: {
    InputGender,
  },
};
</script>
