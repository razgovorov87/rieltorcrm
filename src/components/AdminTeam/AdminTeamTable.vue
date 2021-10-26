<template>
  <div class="bg-white rounded my-6" style="height: 91vh">
    <table class="w-full shadow-md">
      <thead>
        <tr
          class="
            bg-gray-200
            text-gray-600
            uppercase
            text-sm
            leading-normal
            flex
            w-full
          "
        >
          <th class="py-3 px-6 text-left w-2/12">ФИО</th>
          <th class="py-3 px-6 text-center w-2/12">Логин и пароль</th>
          <th class="py-3 px-6 text-center w-2/12">Телефон</th>
          <th class="py-3 px-6 text-center w-2/12">Дата регистрации</th>
          <th class="py-3 px-6 text-center w-1/12">Клиентов</th>
          <th class="py-3 px-6 text-center w-2/12">Предлож. объектов</th>
          <th class="py-3 px-6 text-center w-1/12">Действия</th>
        </tr>
      </thead>
      <tbody
        class="
          text-gray-600 text-sm
          font-light
          overflow-y-auto
          flex flex-col
          w-full
        "
        style="max-height: 84vh"
      >
        <TableTeamGroup
          :agents="agents"
          :clients="clients"
          @openClient="
            (client) => {
              $emit('openClient', client);
            }
          "
          @refreshList="
            () => {
              this.agentsInfo();
            }
          "
          @deleteUser="
            (agent) => {
              deleteAgent = agent;
              verifyDelete = true;
            }
          "
        />
      </tbody>
    </table>

    <transition name="slide">
      <div
        v-if="verifyDelete"
        class="
          absolute
          bottom-0
          w-full
          left-0
          h-36
          bg-gray-200
          flex
          justify-center
          items-center
        "
      >
        <div class="text-xl mr-14">
          Вы действительно хотите удалить этого агента?
        </div>
        <div class="flex">
          <div
            class="
              mr-4
              focus:outline-none
              rounded
              bg-green-600
              text-white
              hover:bg-green-700
              hover:shadow-lg
              hover:text-gray-200
              p-1
              px-3
              text-lg
              font-medium
              flex
              items-center
              justify-center
              transition
              flex-shrink-0
              cursor-pointer
            "
            @click="deleteUser"
          >
            Да, хочу
          </div>

          <div
            class="
              focus:outline-none
              rounded
              bg-red-600
              text-white
              hover:bg-red-700
              hover:shadow-lg
              hover:text-gray-200
              p-1
              px-3
              text-lg
              font-medium
              flex
              items-center
              justify-center
              transition
              flex-shrink-0
              cursor-pointer
            "
            @click="verifyDelete = false"
          >
            Отменить
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TableTeamGroup from "@/components/AdminTeam/TableTeamGroup";
export default {
  props: ["clients"],
  data: () => ({
    agents: [],
    verifyDelete: false,
    deleteAgent: null,
  }),

  mounted() {
    this.agentsInfo();
  },

  methods: {
    async agentsInfo() {
      this.agents = await this.$store.dispatch("fetchAgents");
    },

    async deleteUser() {
      await this.$store.dispatch("deleteUser", this.deleteAgent);
      this.verifyDelete = false;
      this.deleteAgent = null;
      this.agentsInfo();
      this.$toasts.push({
        type: "success",
        message: "Агент успешно удален",
      });
    },
  },

  components: { TableTeamGroup },
};
</script>


<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
