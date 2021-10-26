<template>
  <div v-if="info" class="py-4 px-6 flex flex-col h-full overflow-y-auto">
    <div class="flex justify-between">
      <h3 class="text-xl font-semibold items-center flex-grow">
        Информация о клиенте
      </h3>
    </div>

    <div class="flex flex-col space-y-3 mt-4">
      <div class="flex items-center">
        <label class="font-medium w-24 text-gray-600">Телефон</label>
        <div class="flex flex-grow bg-white rounded border-2 border-gray-300">
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div
            class="w-2/3 flex-grow flex items-center justify-between pl-2 pr-4"
          >
            {{ info.phone }}
            <span v-if="info.missedCall" class="relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                />
              </svg>
              <span
                class="absolute -top-12 -left-24 transform translate-x-1.5 text-white bg-darkDivider z-50 rounded py-1 px-2 opacity-0 transition duration-300 group-hover:opacity-100"
                >Пропущенный</span
              >
            </span>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <label class="font-medium text-gray-600 w-24">ФИО</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <input
            v-model="fio"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
          />
        </div>
      </div>

      <!-- <div class="flex items-center">
        <label class="font-medium text-gray-600 w-24">Компания</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input
            v-model="company"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
          />
        </div>
      </div> -->

      <div class="flex items-center">
        <label class="font-medium w-24 text-gray-600">Бюджет</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <currency-input
            v-model="budget"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
            currency="RUB"
            :precision="0"
            :distraction-free="false"
          />
        </div>
      </div>
      <!-- 
      <div class="flex items-center">
        <label class="font-medium w-24 text-gray-600">Адрес</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <input
            v-model="adress"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
          />
        </div>
      </div> -->

      <div v-if="compositionType && composition" class="flex flex-col">
        <div class="flex items-center">
          <span class="font-medium text-gray-600">Состав проживающих:</span>
          <span
            class="text-sm rounded-full font-medium py-1 px-3 bg-white shadow text-center ml-2"
            >{{ compositionType }}</span
          >
        </div>
        <div class="flex flex-col flex-grow mt-5">
          <template v-if="composition.men">
            <div
              v-for="(man, idx) in composition.men"
              :key="man + idx"
              class="flex flex-col bg-white w-full relative pt-4 px-2 pb-2 rounded shadow text-sm mb-6"
            >
              <div
                class="absolute top-0 left-0 transform border-2 -translate-x-4 -translate-y-1/2 flex items-center justify-center px-2 py-1 bg-white rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-700 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="font-medium text-sm">Человек</span>
              </div>

              <p v-if="man.fio" class="font-medium">
                ФИО: <span class="font-normal">{{ man.fio }}</span>
              </p>
              <p v-if="man.gender" class="font-medium">
                Пол: <span class="font-normal">{{ man.gender }}</span>
              </p>
              <p v-if="man.age" class="font-medium">
                Возраст: <span class="font-normal">{{ man.age }}</span>
              </p>
              <p v-if="man.work" class="font-medium">
                Сфера деятельности:
                <span class="font-normal">{{ man.work }}</span>
              </p>
              <p v-if="man.national" class="font-medium">
                Гражданство: <span class="font-normal">{{ man.national }}</span>
              </p>
              <p v-if="man.register" class="font-medium">
                Прописка: <span class="font-normal">{{ man.register }}</span>
              </p>
              <p v-if="man.salary" class="font-medium">
                Зарплата: <span class="font-normal">{{ man.salary }}</span>
              </p>
              <p v-if="man.info" class="font-medium">
                Доп.информация: <span class="font-normal">{{ man.info }}</span>
              </p>
            </div>
          </template>

          <div v-if="composition.men" class="mb-5 h-px bg-gray-400"></div>

          <div
            v-for="(man, idx) in composition.kids"
            :key="man + idx"
            class="flex flex-col bg-white w-full relative pt-4 px-2 pb-2 rounded shadow text-sm mb-6"
          >
            <div
              class="absolute top-0 left-0 transform border-2 -translate-x-4 -translate-y-1/2 flex items-center justify-center px-2 py-1 bg-white rounded-full"
            >
              <svg
                class="mr-2 w-5 h-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                stroke="currentColor"
                fill="currentColor"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M27.4,13.3c-1-3.2-3.4-5.8-6.4-7.2c-0.4-1.4-1.2-2.6-2.4-3.6c-0.4-0.3-1.1-0.3-1.4,0.2c-0.3,0.4-0.3,1.1,0.2,1.4  c2,1.6,2.6,4.4,1.4,6.7c-1,2-3.5,2.7-5.5,1.7c-1.5-0.8-2.1-2.6-1.3-4.1c0.3-0.5,0.7-0.9,1.3-1.1c0.6-0.2,1.2-0.1,1.7,0.2  c0.4,0.2,0.7,0.5,0.8,0.9c0.1,0.4,0.1,0.8-0.1,1.2c-0.3,0.5-0.1,1.1,0.4,1.4c0.5,0.3,1.1,0.1,1.4-0.4c0.4-0.8,0.5-1.8,0.3-2.7  s-0.9-1.7-1.8-2.1c-1-0.5-2.2-0.6-3.2-0.3c-0.4,0.1-0.8,0.3-1.1,0.6c-3.3,1.3-5.8,4-6.9,7.4C3.1,13.8,2,15.3,2,17  c0,1.7,1.1,3.2,2.6,3.8C6.2,25.6,10.8,29,16,29s9.8-3.4,11.4-8.3c1.5-0.6,2.6-2.1,2.6-3.8C30,15.3,28.9,13.8,27.4,13.3z M12,17  c0-0.6,0.4-1,1-1s1,0.4,1,1v2c0,0.6-0.4,1-1,1s-1-0.4-1-1V17z M14,24c-1.7,0-3.2-1.1-3.8-2.7c-0.2-0.5,0.1-1.1,0.6-1.3  c0.5-0.2,1.1,0.1,1.3,0.6c0.3,0.8,1,1.3,1.9,1.3c0.6,0,1,0.4,1,1S14.6,24,14,24z M20,19c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2  c0-0.6,0.4-1,1-1s1,0.4,1,1V19z"
                />
              </svg>
              <span class="font-medium text-sm">Ребенок</span>
            </div>

            <p v-if="man.name" class="font-medium">
              Имя: <span class="font-normal">{{ man.name }}</span>
            </p>
            <p v-if="man.age" class="font-medium">
              Возраст: <span class="font-normal">{{ man.age }}</span>
            </p>
            <p v-if="man.info" class="font-medium">
              Доп.информация: <span class="font-normal">{{ man.info }}</span>
            </p>
          </div>

          <div v-if="composition.kids" class="mb-5 h-px bg-gray-400"></div>

          <div
            v-for="(man, idx) in composition.pets"
            :key="man + idx"
            class="flex flex-col bg-white w-full relative pt-4 px-2 pb-2 rounded shadow text-sm mb-6"
          >
            <div
              class="absolute top-0 left-0 transform border-2 -translate-x-4 -translate-y-1/2 flex items-center justify-center px-2 py-1 bg-white rounded-full"
            >
              <svg
                class="mr-2 w-5 h-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                stroke="currentColor"
                fill="currentColor"
              >
                <path
                  d="M4.5,12 C3.11928813,12 2,10.8807119 2,9.5 C2,8.11928813 3.11928813,7 4.5,7 C5.88071187,7 7,8.11928813 7,9.5 C7,10.8807119 5.88071187,12 4.5,12 Z M9,8 C7.61928813,8 6.5,6.88071187 6.5,5.5 C6.5,4.11928813 7.61928813,3 9,3 C10.3807119,3 11.5,4.11928813 11.5,5.5 C11.5,6.88071187 10.3807119,8 9,8 Z M15,8 C13.6192881,8 12.5,6.88071187 12.5,5.5 C12.5,4.11928813 13.6192881,3 15,3 C16.3807119,3 17.5,4.11928813 17.5,5.5 C17.5,6.88071187 16.3807119,8 15,8 Z M19.5,12 C18.1192881,12 17,10.8807119 17,9.5 C17,8.11928813 18.1192881,7 19.5,7 C20.8807119,7 22,8.11928813 22,9.5 C22,10.8807119 20.8807119,12 19.5,12 Z M17.34,14.86 C18.65,16.17 20.26,17.62 19.95,19.66 C19.66,20.67 18.93,21.69 17.62,21.98 C16.89,22.12 14.56,21.54 12.08,21.54 L11.9,21.54 C9.42,21.54 7.09,22.13 6.36,21.98 C5.05,21.69 4.32,20.68 4.03,19.66 C3.73,17.63 5.34,16.18 6.65,14.87 C7.53,13.85 8.26,12.98 9.13,11.96 C9.6,11.42 10.18,10.88 10.88,10.64 C10.99,10.6 11.1,10.57 11.21,10.55 C11.47,10.5 11.74,10.5 12,10.5 C12.26,10.5 12.53,10.5 12.78,10.54 C12.89,10.56 13,10.59 13.11,10.63 C13.81,10.87 14.4,11.41 14.86,11.95 C15.74,12.97 16.47,13.84 17.34,14.86 Z"
                  id="🔹-Primary-Color"
                  fill="#1D1D1D"
                />
              </svg>
              <span class="font-medium text-sm">Питомец</span>
            </div>

            <p v-if="man.type" class="font-medium">
              Тип: <span class="font-normal">{{ man.type }}</span>
            </p>
            <p v-if="man.age" class="font-medium">
              Возраст: <span class="font-normal">{{ man.age }}</span>
            </p>
            <p v-if="man.info" class="font-medium">
              Доп.информация: <span class="font-normal">{{ man.info }}</span>
            </p>
          </div>

          <div v-if="composition.pets" class="mb-5 h-px bg-gray-400"></div>
        </div>
      </div>

      <div v-if="reserveArr" class="flex flex-col mt-4">
        <div class="flex items-center">
          <span class="font-medium text-gray-600 mb-2">Просмотры квартир:</span>
        </div>
        <div
          class="flex flex-col flex-grow rounded overflow-hidden border-2 border-gray-300"
        >
          <div
            v-for="(item, idx) in this.reserveArr"
            :key="item + idx"
            class="w-full bg-white px-3 py-2 border-b flex items-center justify-between"
          >
            <div class="flex items-center flex-grow">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>

              <span class="ml-1 border-b border-dashed border-gray-400 text-sm"
                >{{ item.date | date("fullmonthDay") }} в {{ item.time }}</span
              >
            </div>

            <div class="flex items-center mr-2 pr-2 border-r border-gray-400">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <span class="ml-1 text-sm">{{ takeAgentInfo(item.agent) }}</span>
            </div>

            <div class="flex items-center">
              <a :href="item.obj.link" target="__blank">
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-grow"></div>
  </div>
</template>

<script>
import { CurrencyInput } from "vue-currency-input";
export default {
  props: ["info"],
  data: () => ({
    fio: "",
    budget: null,
    composition: null,
    compositionType: null,
    reserveArr: null,
    agents: null,
  }),

  watch: {
    fio() {
      if (this.fio !== this.info.fio && this.fio !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },

    // company() {
    //   if (this.company !== this.info.company && this.company !== "")
    //     this.$emit("openSave", true);
    //   else this.$emit("openSave", false);
    // },

    budget() {
      if (this.budget !== this.info.budget && this.budget !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },

    // adress() {
    //   if (this.adress !== this.info.adress && this.adress !== "")
    //     this.$emit("openSave", true);
    //   else this.$emit("openSave", false);
    // },
  },

  created() {
    if (Object.keys(this.info).length !== 0) {
      this.fio = this.info.fio ? this.info.fio : "";
      // this.company = this.info.company ? this.info.company : "";
      this.budget = this.info.budget ? this.info.budget : 0;
      // this.adress = this.info.adress ? this.info.adress : "";
      this.compositionType = this.info.compositionType
        ? this.info.compositionType
        : 0;
      this.composition = this.info.composition ? this.info.composition : 0;
    }
  },

  async mounted() {
    this.updateReserve();
    this.agents = await this.$store.dispatch("fetchAgents");
  },

  methods: {
    async updateReserve() {
      this.reserveArr = await this.$store.dispatch(
        "fetchClientReserves",
        this.info.id
      );
    },

    updateInfo(info) {
      this.fio = info.fio;
      // this.company = company;
      this.budget = info.budget;
      // this.adress = adress;
      this.composition = info.composition;
      this.compositionType = info.compositionType;
    },

    fioVerify() {
      if (this.fio.length < 3) return false;
      else return true;
    },

    cancel() {
      this.fio = this.info.fio;
      // this.company = this.info.company;
      this.budget = this.info.budget;
      // this.adress = this.info.adress;
      this.$emit("openSave", false);
    },

    getClientInfo() {
      return {
        fio: this.fio,
        // company: this.company,
        budget: this.budget,
        // adress: this.adress,
      };
    },

    peoplesArr(type) {
      if (type === "Друзья") return this.composition.friends;
      if (type === "Другой состав") return this.composition.peoples;
      else return this.composition;
    },

    takeAgentInfo(id) {
      if (this.agents) {
        const agent = this.agents.filter((agent) => agent.id === id);
        if (agent[0]) return agent[0].surname + " " + agent[0].name;
      }
    },
  },

  computed: {
    sortedReserve() {
      if (!this.reserveArr) return [];
      const result = this.reserveArr.sort(function(a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA - dateB;
      });

      return result;
    },
  },

  components: {
    CurrencyInput,
  },
};
</script>
