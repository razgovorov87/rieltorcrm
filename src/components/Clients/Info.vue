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
            class="
              flex
              items-center
              justify-center
              py-2
              px-3
              bg-gray-200
              flex-shrink-0
            "
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
                class="
                  absolute
                  -top-12
                  -left-24
                  transform
                  translate-x-1.5
                  text-white
                  bg-darkDivider
                  z-50
                  rounded
                  py-1
                  px-2
                  opacity-0
                  transition
                  duration-300
                  group-hover:opacity-100
                "
                >Пропущенный</span
              >
            </span>
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <label class="font-medium text-gray-600 w-24">ФИО</label>
        <div
          class="
            flex flex-grow
            bg-white
            rounded
            border-2 border-gray-300
            group
            focus:ring-2
            ring-blue-500
          "
        >
          <div
            class="
              flex
              items-center
              justify-center
              py-2
              px-3
              bg-gray-200
              flex-shrink-0
            "
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
          class="
            flex flex-grow
            bg-white
            rounded
            border-2 border-gray-300
            group
            focus:ring-2
            ring-blue-500
          "
        >
          <div
            class="
              flex
              items-center
              justify-center
              py-2
              px-3
              bg-gray-200
              flex-shrink-0
            "
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

      <div
        v-if="composition && typeof composition == 'string'"
        class="flex flex-col"
      >
        <div class="flex flex-col">
          <span class="font-medium text-gray-600">Состав проживающих:</span>
          <div
            class="
              text-sm
              rounded-md
              font-medium
              py-1
              px-3
              bg-white
              shadow
              break-words
            "
          >
            {{ composition }}
          </div>
        </div>
      </div>

      <div v-if="reserveArr" class="flex flex-col mt-4">
        <div class="flex items-center">
          <span class="font-medium text-gray-600 mb-2">Просмотры квартир:</span>
        </div>
        <div
          class="
            flex flex-col flex-grow
            rounded
            overflow-hidden
            border-2 border-gray-300
          "
        >
          <div
            v-for="(item, idx) in this.reserveArr"
            :key="item + idx"
            class="
              w-full
              bg-white
              px-3
              py-2
              border-b
              flex
              items-center
              justify-between
            "
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
import errors from "../../errors";
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
      this.composition = this.info.composition ? this.info.composition : 0;
    }
  },

  async mounted() {
    this.updateReserve();
    try {
      this.agents = await this.$store.dispatch("fetchAgents");
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

  methods: {
    async updateReserve() {
      try {
        this.reserveArr = await this.$store.dispatch(
          "fetchClientReserves",
          this.info.id
        );
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
      const result = this.reserveArr.sort(function (a, b) {
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
