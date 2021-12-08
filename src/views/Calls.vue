<template>
  <div class="p-5 flex h-screen">
    <div class="h-full flex flex-col overflow-hidden rounded-xl w-2/3">
      <div class="bg-blue-700 py-4 px-6 flex">
        <v-menu
          v-if="agents != [] && selectedAgent != null"
          class="flex-1"
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="
                bg-white bg-opacity-25
                text-white
                font-bold
                tracking-tighter
                capitalize
                rounded-xl
              "
              color="tranparent"
              depressed
              small
              v-bind="attrs"
              v-on="on"
            >
              <span>
                Агент:
                {{ selectedAgent["name"] + " " + selectedAgent["surname"] }}
              </span>
              <v-icon right> mdi-chevron-down </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="agent of agents"
              :key="agent['authorId']"
              @click="selectedAgent = agent"
            >
              <v-list-item-title>{{
                agent["name"] + " " + agent["surname"]
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          class="
            flex
            items-center
            mr-2
            bg-white bg-opacity-25
            text-white
            font-bold
            tracking-tighter
            capitalize
            rounded-xl
          "
          color="tranparent"
          depressed
          small
          @click="setToday"
        >
          <span>Сегодня</span>
        </v-btn>

        <div
          class="
            flex
            justify-center
            items-center
            bg-white bg-opacity-25
            hover:bg-opacity-40
            cursor-pointer
            transition
            text-white
            font-bold
            tracking-tighter
            capitalize
            rounded-tl-xl rounded-bl-xl
          "
          @click="$refs.calendar.prev()"
        >
          <v-icon left class="m-0 text-lg font-bold text-white px-1">
            mdi-arrow-left
          </v-icon>
        </div>
        <div
          class="
            flex
            items-center
            text-center
            bg-white bg-opacity-25
            transition
            text-white
            font-bold
            tracking-tighter
            capitalize
            text-xs
            font-bold
            text-white
            px-1
          "
        >
          <span v-if="$refs.calendar">{{ $refs.calendar.title }}</span>
          <span v-else>{{ now | date("monthYear") }}</span>
        </div>
        <div
          class="
            flex
            justify-center
            items-center
            bg-white bg-opacity-25
            hover:bg-opacity-40
            cursor-pointer
            transition
            text-white
            font-bold
            tracking-tighter
            capitalize
            rounded-tr-xl rounded-br-xl
          "
          @click="$refs.calendar.next()"
        >
          <v-icon right class="m-0 text-lg font-bold text-white px-1">
            mdi-arrow-right
          </v-icon>
        </div>
      </div>
      <div class="p-4 h-full bg-gray-200">
        <v-calendar
          v-if="selectedAgent != null"
          v-model="calendar"
          ref="calendar"
          locale="ru"
          :weekdays="weekday"
          :type="type"
          :events="getUserEvents(selectedAgent)"
          :event-color="getEventColor"
        ></v-calendar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    calendar: "",
    now: Date.now(),
    selectedAgent: null,
    agents: [],
    events: [],
    type: "month",
    typeToLabel: {
      month: "Месяц",
    },
    weekday: [1, 2, 3, 4, 5, 6, 0],
  }),

  async mounted() {
    await this.getEvents();
    this.$refs.calendar.checkChange();
  },

  methods: {
    async getEvents() {
      const result = await this.$store.dispatch("getCalls");
      Object.keys(result).forEach((authorId) => {
        const events = [];
        Object.keys(result[authorId]["overallCalls"]).forEach((key) => {
          events.push({
            name: `Принято: ${this.calcMissedCalls(
              result[authorId]["overallCalls"][key]
            )}`,
            color: "bg-green-200",
            timed: false,
            start: Date.parse(
              result[authorId]["overallCalls"][key][0]["createdAt"]
            ),
          });
          events.push({
            name: `Пропущено: ${this.calcNotMissedCalls(
              result[authorId]["overallCalls"][key]
            )}`,
            color: "bg-red-200",
            timed: false,
            start: Date.parse(
              result[authorId]["overallCalls"][key][0]["createdAt"]
            ),
          });
        });

        this.agents.push({
          authorId,
          name: result[authorId]["authorName"],
          surname: result[authorId]["authorSurname"],
          calls: result[authorId]["overallCalls"],
          events: events,
        });
      });

      this.selectedAgent = this.agents[0];
    },

    getUserEvents(selectedAgent) {
      const agent = this.agents.find(
        (e) => e.authorId == selectedAgent.authorId
      );

      return agent.events;
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
  padding: 4px !important;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.06) !important;
}
.v-calendar-weekly__head-weekday.v-outside {
  background-color: transparent !important;
  box-shadow: none !important;
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
  margin-bottom: 4px !important;
}

.v-event .pl-1 {
  padding: 0 !important;
  padding-left: 5px !important;
  display: flex;
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
</style>