<template>
  <div class="px-8 py-4 flex flex-col">
    <div class="flex mt-6 items-center">
      <span class="font-medium text-gray-500 w-44">Причина переезда:</span>
      <input
        v-model="cause"
        type="text"
        class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg"
        placeholder=""
        @input="$emit('openSave', true)"
      />
    </div>

    <div class="flex mt-6 items-center">
      <span class="font-medium text-gray-500 w-72"
        >До какого числа нужно переехать:</span
      >
      <input
        v-model="date"
        type="date"
        class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg"
        placeholder=""
        @input="$emit('openSave', true)"
      />
    </div>

    <div class="flex mt-6 items-center">
      <span class="font-medium text-gray-500 w-36">Район города:</span>
      <input
        v-model="area"
        type="text"
        class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg"
        placeholder=""
        @input="$emit('openSave', true)"
      />
    </div>

    <h3 class="font-medium text-gray-500 mt-10 mb-3">
      Доступность от места работы
    </h3>
    <div class="flex">
      <input
        v-model="adressWork"
        type="text"
        class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg mb-2 flex-grow mr-2"
        placeholder="Адрес работы"
        @input="$emit('openSave', true)"
      />

      <input
        v-model="timeToWork"
        type="number"
        class="items-center px-4 py-2 flex-grow focus:outline-none border border-gray-300 rounded focus:ring-2 ring-dividerBg mb-2 w-52"
        placeholder="Сколько добираться"
        @input="$emit('openSave', true)"
      />
    </div>

    <div class="mt-4">
      <h3 class="font-medium text-gray-500">Пожелания по квартире</h3>
      <textarea
        v-model="wishes"
        rows="4"
        class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex mt-2 mb-10"
        placeholder="Перечислите пожелания клиента по будующей квартире"
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
    criterions: [
      { title: "Проживание с детьми", checked: false },
      { title: "Метро", checked: false },
      { title: "Фитнес", checked: false },
      { title: "Школа", checked: false },
    ],
    adressWork: null,
    timeToWork: null,
    area: null,
    wishes: null,
    date: null,
    cause: null,
  }),

  mounted() {
    this.checkInfo();
  },

  methods: {
    checkInfo() {
      if (!this.client.criterion) return;

      const criterionRef = this.client.criterion;

      this.criterions = criterionRef.criterion;
      this.adressWork = criterionRef.adressWork;
      this.timeToWork = criterionRef.timeToWork;
      this.area = criterionRef.area;
      this.wishes = criterionRef.wishes;
      this.date = criterionRef.date;
      this.cause = criterionRef.cause;
    },

    async saveCriterion() {
      try {
        const frontData = {
          criterion: this.criterions ? this.criterions : null,
          adressWork: this.adressWork ? this.adressWork : null,
          timeToWork: this.timeToWork ? this.timeToWork : null,
          area: this.area ? this.area : null,
          wishes: this.wishes ? this.wishes : null,
          date: this.date ? this.date : null,
          cause: this.cause ? this.cause : null,
        };
        await this.$store.dispatch("saveCriterion", {
          frontData,
          clientId: this.client.id,
        });
      } catch (e) {
        throw e;
      }
    },

    newline() {
      this.value = `${this.value}\n`;
    },
  },
};
</script>
