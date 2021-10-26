<template>
  <div class="px-8 py-4 flex flex-col space-y-4">
    <div class="flex flex-col">
      <h3 class="font-medium text-gray-500">Интересующий объект</h3>
      <div v-if="interestingObj" class="flex flex-col my-2 px-4">
        <div class="flex mt-2 items-center">
          <span class="font-medium text-gray-500 w-24">Адрес:</span>
          <span
            class="border-b text-gray-500 border-b border-gray-500 ml-2 cursor-pointer"
            @click="$emit('openObjectList')"
            >{{ interestingObj.adress }}</span
          >
          <span @click="$emit('openObjectList')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-600 ml-2 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </span>
        </div>

        <div v-if="interestingObj.room" class="flex mt-2">
          <span class="font-medium text-gray-500 w-24">Комнат:</span>
          <span class="border-b text-gray-500 border-b border-gray-500 ml-2">{{
            interestingObj.room
          }}</span>
        </div>

        <div v-else class="flex mt-2">
          <span class="font-medium text-gray-500 w-24">Этаж:</span>
          <span class="border-b text-gray-500 ml-2">-</span>
        </div>

        <div class="flex mt-2">
          <span class="font-medium text-gray-500 w-24">Стоимость:</span>
          <span class="border-b text-gray-500 ml-2 border-b border-gray-500">{{
            interestingObj.price | currency
          }}</span>
        </div>
        <div class="flex mt-2">
          <span class="font-medium text-gray-500 w-24">URL:</span>
          <a
            :href="interestingObj.url"
            target="__blank"
            class="border-b text-gray-500 ml-2 border-b border-gray-500 truncate"
            >{{ interestingObj.url }}</a
          >
        </div>
      </div>
      <div
        v-else
        class="flex justify-center items-center mt-4 font-medium text-gray-500 cursor-pointer"
        @click="$emit('openObjectList')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Добавить квартиру</span>
      </div>
    </div>

    <div v-if="client.comment">
      <div class="flex flex-col">
        <label class="font-medium text-gray-600">Комментарий менеджера</label>
        <div class="flex bg-white rounded-lg border p-3 shadow">
          {{ client.comment }}
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-medium text-gray-500">
        Как вы отвели клиента от интересующей квартиры?
      </h3>
      <textarea
        v-model="exceptions"
        rows="4"
        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex mt-2"
        placeholder="Какие Вы привели аргументы, чтобы клиент отказался от интересующей квартиры"
        @keydown.enter.exact.prevent
        @input="$emit('openSave', true)"
        @keydown.enter.shift.exact="newline"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ["client"],
  data: () => ({
    interestingObj: null,
    exceptions: null,
  }),

  watch: {
    exceptions() {
      if (
        this.exceptions !==
        (this.client.exceptions || this.client.criterion.exceptions)
      )
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },
  },

  mounted() {
    this.interestingObj = this.client.interestingObj
      ? this.client.interestingObj
      : null;
    this.exceptions = this.client.exceptions ? this.client.exceptions : null;
  },

  methods: {
    async saveExceptions() {
      const data = {
        clientId: this.client.id,
        exceptions: this.exceptions,
      };
      await this.$store.dispatch("saveExceptions", data);
    },

    newline() {
      this.value = `${this.value}\n`;
    },
  },
};
</script>
