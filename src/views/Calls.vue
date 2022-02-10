<template>
  <div class="flex w-full p-5 h-screen">
    <div
      v-if="!loading"
      class="h-full flex flex-col overflow-hidden rounded-md w-full"
    >
      <div class="bg-white py-4 px-6 flex items-center shadow space-x-4">
        <div
          class="
            block
            bg-white
            border-2 border-gray-300
            rounded-md
            px-3
            py-2
            text-left
            cursor-default
            transition
            focus:outline-none
            hover:ring-2 hover:ring-indigo-500 hover:border-indigo-500
            cursor-pointer
            sm:text-sm
          "
          @click="setToday"
        >
          Сегодня
        </div>

        <div class="flex justify-center items-center space-x-4">
          <v-icon @click="$refs.calendar.prev()">mdi-chevron-left</v-icon>
          <span class="font-medium select-none text-xl" v-if="$refs.calendar">{{
            $refs.calendar.title
          }}</span>
          <span class="font-medium select-none text-xl" v-else>{{
            now | date("monthYear")
          }}</span>
          <v-icon @click="$refs.calendar.next()">mdi-chevron-right</v-icon>
        </div>

        <div class="flex flex-col flex-grow items-end">
          <span class="mb-1 text-sm text-gray-500">Статистика за месяц:</span>
          <div
            class="
              mb-1
              text-sm text-green-500
              font-bold
              flex
              items-center
              space-x-1
            "
          >
            <span>Принято:</span>
            <span
              v-if="selectedAgent"
              class="px-1 py-0.5 text-xs bg-green-100 rounded"
              >{{ getNotMissedCallsFromStats() }}</span
            >
          </div>
          <div
            class="text-sm text-red-500 font-bold flex items-center space-x-1"
          >
            <span>Пропущено:</span>
            <span
              v-if="selectedAgent"
              class="px-1 py-0.5 text-xs bg-red-100 rounded"
              >{{ getMissedCallsFromStats() }}</span
            >
          </div>
        </div>

        <div class="flex">
          <div class="mt-1 relative" style="min-width: 200px">
            <button
              type="button"
              class="
                relative
                bg-white
                w-full
                ring-2 ring-gray-300
                rounded-md
                pl-3
                pr-10
                py-2
                text-left
                cursor-default
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:border-indigo-500
                sm:text-sm
              "
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              @click="selectOpen = !selectOpen"
            >
              <span v-if="selectedAgent" class="block truncate">
                {{ selectedAgent["name"] + " " + selectedAgent["surname"] }}
              </span>
              <span
                class="
                  ml-3
                  absolute
                  inset-y-0
                  right-0
                  flex
                  items-center
                  pr-2
                  pointer-events-none
                "
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>

            <ul
              v-if="selectOpen"
              class="
                absolute
                z-10
                mt-1
                w-full
                bg-white
                max-h-56
                rounded-md
                px-0
                text-base
                ring-1 ring-gray-300
                overflow-auto
                focus:outline-none
                sm:text-sm
              "
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              v-click-outside="
                () => {
                  selectOpen = false;
                }
              "
            >
              <li
                v-for="agent in agents"
                :key="agent['id']"
                class="
                  group
                  text-gray-900
                  cursor-default
                  select-none
                  relative
                  py-2
                  pr-9
                  pl-2
                  transition
                  hover:text-white hover:bg-indigo-600
                "
                id="listbox-option-0"
                role="option"
                @click="
                  () => {
                    selectedAgent = agent;
                    selectOpen = false;
                  }
                "
              >
                <div class="flex items-center">
                  <span class="font-normal block truncate">
                    {{ agent["name"] + " " + agent["surname"] }}
                  </span>
                </div>
                <span
                  class="
                    text-indigo-600
                    absolute
                    inset-y-0
                    right-0
                    flex
                    items-center
                    pr-4
                  "
                >
                  <svg
                    v-if="agent == selectedAgent"
                    class="h-5 w-5 text-indigo-600 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="p-4 h-full bg-gray-200 overflow-y-auto">
        <v-calendar
          v-if="selectedAgent != null"
          v-model="calendar"
          :event-more="false"
          ref="calendar"
          locale="ru"
          :weekdays="weekday"
          :type="type"
          @change="changeNow"
        >
          <template v-slot:day="{ date }">
            <div class="flex flex-grow items-stretch justify-center space-x-2">
              <div
                v-if="getDay(date)['notMissedCalls'] != null"
                class="flex items-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                  />
                </svg>
                <span class="text-md font-bold text-green-500">{{
                  getDay(date)["notMissedCalls"]
                }}</span>
              </div>

              <div
                v-if="getDay(date)['missedCalls'] != null"
                class="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                  />
                </svg>
                <span class="text-md font-bold text-red-500">{{
                  getDay(date)["missedCalls"]
                }}</span>
              </div>
            </div>
          </template>
        </v-calendar>
      </div>
    </div>
    <div class="flex items-center justify-center h-screen w-full" v-else>
      <CubeLoader :size="'60px'" :background="'#2563eb'" />
    </div>
  </div>
</template>

<script>
import errors from "../errors";
import CubeLoader from "@/components/CubeLoader";
export default {
  data: () => ({
    calendar: "",
    now: new Date().toISOString().slice(0, 10),
    selectedAgent: null,
    agents: [],
    selectOpen: false,
    type: "month",
    weekday: [1, 2, 3, 4, 5, 6, 0],
    loading: true,
  }),

  async mounted() {
    await this.getEvents();
    this.loading = false;
  },

  methods: {
    changeNow(obj) {
      this.now = obj["start"]["date"];
    },

    getNotMissedCallsFromStats() {
      const date = this.now.substr(0, 7);
      const calls = this.selectedAgent["stats"][date];
      if (!calls) return "0";

      const notMissedCalls = calls["notMissedCalls"];
      const missedCalls = calls["missedCalls"];
      const percent = (notMissedCalls / (notMissedCalls + missedCalls)) * 100;
      return `${percent.toFixed(2)}% (${notMissedCalls})`;
    },

    getMissedCallsFromStats() {
      const date = this.now.substr(0, 7);
      const calls = this.selectedAgent["stats"][date];
      if (!calls) return "0";

      const notMissedCalls = calls["notMissedCalls"];
      const missedCalls = calls["missedCalls"];
      const percent = (missedCalls / (notMissedCalls + missedCalls)) * 100;
      return `${percent.toFixed(2)}% (${missedCalls})`;
    },

    getDay(date) {
      const days = this.getUserEvents(this.selectedAgent);
      const day = days[date];
      return {
        notMissedCalls: day != null ? day["notMissedCalls"] : null,
        missedCalls: day != null ? day["missedCalls"] : null,
      };
    },

    async getEvents() {
      try {
        const result = await this.$store.dispatch("getCalls");
        this.filterCalls(result);
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

    filterCalls(result) {
      if (Object.keys(result).length) {
        Object.keys(result).forEach((authorId) => {
          const events = this.calculateEvents(result, authorId);
          const stats = this.calculateStats(result, authorId);

          this.agents.push({
            authorId,
            name: result[authorId]["authorName"],
            surname: result[authorId]["authorSurname"],
            calls: events,
            stats: stats,
          });
        });

        this.selectedAgent = this.agents[0];
      }
    },

    calculateStats(result, authorId) {
      const stats = {};

      Object.keys(result[authorId]["overallCalls"]).forEach((key, index) => {
        const month = Object.keys(result[authorId]["overallCalls"])[
          index
        ].substr(0, 7);

        const missedCalls = this.calcMissedCalls(
          result[authorId]["overallCalls"][key]
        );

        const notMissedCalls = this.calcNotMissedCalls(
          result[authorId]["overallCalls"][key]
        );

        if (stats[month]) {
          stats[month]["missedCalls"] += missedCalls;
          stats[month]["notMissedCalls"] += notMissedCalls;
        } else {
          stats[month] = {
            missedCalls,
            notMissedCalls,
          };
        }
      });

      return stats;
    },

    calculateEvents(result, authorId) {
      const events = {};

      Object.keys(result[authorId]["overallCalls"]).forEach((key) => {
        const missedCalls = this.calcMissedCalls(
          result[authorId]["overallCalls"][key]
        );

        const notMissedCalls = this.calcNotMissedCalls(
          result[authorId]["overallCalls"][key]
        );

        const date = result[authorId]["overallCalls"][key][0][
          "createdAt"
        ].substr(0, 10);

        events[date] = { missedCalls, notMissedCalls };
      });

      return events;
    },

    getUserEvents(selectedAgent) {
      const agent = this.agents.find(
        (e) => e.authorId == selectedAgent.authorId
      );

      return agent.calls;
    },

    calcMissedCalls(calls) {
      let count = 0;
      const arr = calls.filter((call) => call.isMissedCall == true);
      count = arr.length;
      return count;
    },

    calcNotMissedCalls(calls) {
      let count = 0;
      const arr = calls.filter((call) => call.isMissedCall == false);
      count = arr.length;
      return count;
    },

    getEventColor(event) {
      return event.color;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    setToday() {
      this.calendar = "";
    },
  },

  components: {
    CubeLoader,
  },
};
</script>


<style lang="scss">
.theme--light.v-calendar-weekly {
  background-color: transparent !important;
  border: none !important;
}

.v-calendar-weekly__day-label {
  margin: 0 !important;

  .v-btn--fab.v-size--small {
    height: auto;
    width: auto;
    min-height: 30px;
    min-width: 30px;
    padding: 0 10px;
    border-radius: 15px !important;
  }
}

.v-calendar-weekly__day {
  background: #fff;
  margin: 5px !important;
  border: none !important;
  border-radius: 10px;
}

.v-menu {
  display: block !important;
}

.v-event {
  padding: 5px;
  position: relative;
  width: 100% !important;
  height: auto !important;
}
.v-calendar-weekly__day {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4px !important;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.06) !important;
}
.v-calendar-weekly__head-weekday.v-outside {
  background-color: transparent !important;
  box-shadow: none !important;
}

.v-calendar-weekly__week {
  min-height: 100px !important;
}

.v-calendar-weekly .v-calendar-weekly__head-weekday.v-past {
  color: black !important;
}

.v-calendar-weekly__day.v-outside {
  background-color: #d1d5db !important;
  box-shadow: none !important;
}

.v-calendar-weekly__day.v-outside .v-calendar-weekly__day-label .v-btn {
  background-color: transparent !important;
  &:hover {
    background-color: transparent !important;
  }
}

.v-calendar-weekly__day.v-present .v-calendar-weekly__day-label .v-btn {
  background-color: #1d4ed8;
  color: white;
}

.v-calendar-weekly__day-label {
  position: absolute;
  margin-bottom: 4px !important;
}

.v-event .pl-1 {
  padding: 0 !important;
  padding-left: 5px !important;
  display: flex;
  color: black !important;
  align-items: center;
}

.v-event:before {
  content: "";
  position: absolute;
  top: 0;
  left: -1px;
  height: 100%;
  width: 5px;
  border-radius: 10px;
}

.v-event.bg-red-200::before {
  background-color: red;
}
.v-event.bg-green-200::before {
  background-color: green;
}
.v-event.bg-gray-300::before {
  background-color: #6b7280;
}
</style>