<template>
  <div
    class="absolute inset-0 ml-divider h-screen z-50 flex items-center justify-center transition overflow-hidden"
  >
    <div class="w-5/12 h-full bg-white flex flex-col relative shadow-2xl z-20">
      <div class="bg-darkDivider px-8 pt-8 w-full">
        <div class="-ml-7 flex items-center mb-4">
          <button
            class="outline-none mt-1 mr-1 cursor-pointer"
            @click="closeDrawer"
          >
            <svg
              class="w-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div class="flex justify-between w-full">
            <h1
              class="text-white text-2xl font-bold truncate"
              @click="closeDrawer"
            >
              <span class="cursor-pointer">{{ client.phone }}</span>
            </h1>
            <button
              class="focus:outline-none rounded-full hover:bg-gray-400 p-1 flex items-center justify-center transition relative flex-shrink-0 w-8 h-8 cursor-pointer"
              @click="infoMenu = !infoMenu"
            >
              <svg
                class="w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              <div
                v-if="infoMenu"
                class="absolute right-full mr-1 bg-white top-1/2 rounded flex flex-col"
              >
                <span
                  class="text-gray-400 font-semibold px-4 py-1 text-sm hover:bg-gray-100 rounded"
                  @click="refuseDialog = true"
                  >Отказаться</span
                >
              </div>
            </button>
          </div>
        </div>
        <div class="text-gray-600 text-lg flex items-center mb-4">
          <span class="mr-2 uppercase">#{{ client.id }}</span>
        </div>
        <div class="w-full flex flex-col mb-5">
          <span class="text-gray-600 text-sm">Клиенты</span>
          <div class="flex items-center" v-if="client.status === 'Отказались'">
            <span class="uppercase font-medium text-white">Статус:</span>
            <div
              class="mx-2 px-2 py-1 bg-red-600 font-medium text-white rounded"
            >
              Отказались
            </div>
          </div>
          <div
            v-else
            class="w-full rounded text-white text-lg font-bold relative pb-2 flex justify-between items-center pr-2 cursor-pointer"
            @click="categoriesMenu = true"
          >
            <span>{{ categoryName }}</span>
            <svg
              class="w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <transition name="opacity">
              <div
                v-if="categoriesMenu"
                class="absolute top-0 left-0 w-full bg-white z-20 rounded"
                v-click-outside="
                  () => {
                    categoriesMenu = false;
                  }
                "
              >
                <div
                  v-for="category in categories"
                  :key="category.id"
                  class="py-2 px-4 bg-gray-400 text-base font-medium text-white"
                  :class="'bg-' + category.color"
                  @click.stop="selectCategories(category)"
                >
                  {{ category.title }}
                </div>
              </div>
            </transition>
            <div
              class="absolute bottom-0 left-0 w-full h-1 bg-dividerBg rounded-xl flex z-10"
            >
              <div
                class="w-1/3 bg-blue-500 rounded-l-xl"
                :class="categoriesId < 1 ? 'hidden' : ''"
              ></div>
              <div
                class="w-1/3 bg-yellow-600"
                :class="categoriesId < 2 ? 'hidden' : ''"
              ></div>
              <div
                class="w-1/3 bg-green-500"
                :class="categoriesId < 3 ? 'hidden' : ''"
              ></div>
            </div>
          </div>
        </div>
        <horizontal-scroll
          class="flex flex-nowrap whitespace-nowrap overflow-x-auto space-x-3 select-none"
        >
          <span
            v-for="(tab, idx) in tabs"
            :key="tab.id"
            class="font-bold pb-2 cursor-pointer transition"
            :class="
              idx === selectableTab ? 'text-white border-b-4' : 'text-gray-600'
            "
            @click="selectableTab = idx"
            >{{ tab.name }}</span
          >
        </horizontal-scroll>
      </div>

      <div class="flex-grow overflow-y-auto">
        <HouseTab
          ref="houseTab"
          v-show="selectableTab === 0"
          :client="client"
          @openSave="openSave"
          @openObjectList="objectListDialog = true"
        />

        <div v-show="selectableTab === 1">
          <ProposedObj
            ref="proposedTab"
            :client="client"
            @openSave="openSave"
            @openProposedObjectDialog="openProposedObjectDialog"
            @openReserveDialog="openReserveDialog"
            @successSave="loading = false"
          />
        </div>

        <div v-show="selectableTab === 2">
          <Family ref="familyTab" :client="client" @openSave="openSave" />
        </div>

        <div v-show="selectableTab === 3">
          <Criterion ref="criterionTab" :client="client" @openSave="openSave" />
        </div>

        <div v-show="selectableTab === 4">
          <Refused ref="refusedTab" :client="client" />
        </div>
      </div>

      <transition name="slideUp">
        <div
          v-if="saveItem || saveBlock"
          class="flex-shrink-0 w-full h-divider border-t flex items-center px-8 bg-white"
        >
          <button
            class="bg-blue-600 text-white font-semibold focus:outline-none py-2 px-4 transition hover:bg-blue-500 focus:ring-2 rounded"
            @click="saveEdit"
          >
            Сохранить
          </button>
          <button
            class="text-gray-500 font-semibold focus:outline-none ml-4"
            @click="cancel()"
          >
            Отменить
          </button>
        </div>
      </transition>
    </div>
    <div class="w-4/12 h-full bg-gray-200 relative px-1.5">
      <Logs :logs="client.logs" @saveNote="saveNote" ref="logsBlock" />
    </div>
    <div class="w-3/12 h-full bg-gray-200">
      <Info :info="client" @openSave="openSave" ref="infoBlock" />
    </div>

    <div
      v-if="objectListDialog"
      class="absolute inset-0 z-50 flex items-center justify-center py-10 bg-black bg-opacity-30"
    >
      <div class="bg-white w-full h-full my-10 mx-10 shadow-lg">
        <ObjectList
          @selectObj="selectObj"
          @closeDialog="objectListDialog = false"
        />
      </div>
    </div>

    <RefuseDialog
      v-if="refuseDialog"
      :client="client"
      @close="refuseDialog = false"
    />
    <ReserveDialog
      v-if="reserveDialog"
      :obj="reserveObj"
      @reserveObj="reserveObjDB"
      @close="reserveDialog = false"
    />
    <ProposedObjectsDialog
      v-if="proposedObjectDialog"
      :info="proposedObjInfo"
      @saveObj="saveProposedObj"
      @close="proposedObjectDialog = false"
    />
    <div v-if="loading" class="absolute inset-0 z-50">
      <Loading />
    </div>
  </div>
</template>

<script>
import HouseTab from "@/components/Clients/Tab/HouseTab";
import ProposedObj from "@/components/Clients/Tab/ProposedObj";
import Family from "@/components/Clients/Tab/Family";
import Criterion from "@/components/Clients/Tab/Criterion";
import Refused from "@/components/Clients/Tab/Refused";
import Info from "@/components/Clients/Info";
import Logs from "@/components/Clients/Logs";
import RefuseDialog from "@/components/Clients/RefuseDialog";
import ReserveDialog from "@/components/Clients/ReserveDialog";
import ProposedObjectsDialog from "@/components/Clients/ProposedObjectsDialog";
import ObjectList from "@/components/Admin/ObjectList";
import HorizontalScroll from "vue-horizontal-scroll";
export default {
  props: ["client"],
  data: () => ({
    infoMenu: false,
    categoriesMenu: false,
    startId: 0,
    categoriesId: 0,
    categories: [
      { id: 0, title: "Не обработано", color: "gray-500" },
      { id: 1, title: "В работе", color: "blue-500" },
      { id: 2, title: "Просмотр квартир", color: "yellow-600" },
      { id: 3, title: "Прошла сделка", color: "green-500" },
    ],
    selectableTab: 0,
    tabs: [
      { id: 0, name: "Интересующий объект" },
      { id: 1, name: "Предложенные объекты" },
      { id: 2, name: "Состав проживающих" },
      { id: 3, name: "Критерии поиска" },
      { id: 4, name: "Отказы" },
    ],
    saveBlock: false,
    objectListDialog: false,
    interestingObj: null,
    refuseDialog: false,
    reserveDialog: false,
    reserveObj: null,
    refreshProposedObj: 0,
    proposedObjectDialog: false,
    proposedObjInfo: null,
    loading: false,
  }),

  mounted() {
    if (this.client.status !== "Отказались") {
      this.categoriesId = this.categories.find(
        (category) => category.title === this.client.status
      ).id;
      this.startId = this.categoriesId;
    }
  },

  methods: {
    openReserveDialog(obj) {
      this.reserveObj = obj;
      this.reserveDialog = true;
    },

    openProposedObjectDialog(data) {
      this.proposedObjInfo = data;
      this.proposedObjectDialog = true;
    },

    saveProposedObj(json) {
      this.loading = true;
      this.$refs.proposedTab.saveObj(json);
      this.proposedObjInfo = null;
      this.proposedObjectDialog = false;
    },

    async reserveObjDB(data) {
      try {
        const clientId = this.client.id;
        await this.$store.dispatch("reserveObj", { data, clientId });
        const log = await this.$store.dispatch("reserveObjLog", {
          data,
          clientId,
        });
        this.$refs.logsBlock.pushLog(log);
        this.reserveDialog = false;
        this.$toasts.push({
          type: "success",
          message: "Просмотр успешно сохранен",
        });
        this.$refs.proposedTab.updateReserve();
        this.$refs.infoBlock.updateReserve();
      } catch (e) {
        throw e;
      }
    },

    async saveEdit() {
      const fioVerify = this.$refs.infoBlock.fioVerify();
      if (!fioVerify) {
        this.$toasts.push({
          type: "error",
          message: "Поле ФИО должно быть заполнено",
        });
        return;
      }
      let info = this.$refs.infoBlock.getClientInfo();
      if (this.client.status !== "Отказались") {
        info.status = this.categories.find(
          (category) => category.id === this.categoriesId
        ).title;
      } else {
        info.status = "Отказались";
      }
      info.clientId = this.client.id;
      this.$refs.proposedTab.saveLinks();
      this.$refs.houseTab.saveExceptions();
      if (
        this.categoriesId !== this.startId &&
        this.client.status !== "Отказались"
      ) {
        this.logCategory();
        this.startId = this.categoriesId;
      }
      this.$refs.familyTab.saveInfo();
      this.$refs.criterionTab.saveCriterion();
      const clientInfo = await this.$store.dispatch("saveClientInfo", info);
      this.$refs.infoBlock.updateInfo(clientInfo);
      this.openSave(false);
      this.$toasts.push({
        type: "success",
        message: "Информация о клиенте успешно сохранена!",
      });
      this.$emit("reloadList");
    },

    async logCategory() {
      const category = this.categories.find(
        (category) => category.id === this.categoriesId
      );
      const data = {
        categories: category.title,
        categoriesColor: category.color,
        msgType: "Новый этап",
        logType: "system",
        clientId: this.client.id,
      };
      try {
        const log = await this.$store.dispatch("saveCategory", data);
        this.$refs.logsBlock.pushLog(log);
      } catch (e) {
        throw e;
      }
    },

    selectObj(obj) {
      this.$refs.houseTab.interestingObj = obj;
      this.objectListDialog = false;
      const data = {
        client: this.client,
        obj,
      };
      this.$store.dispatch("saveInterestingObj", data);
      this.$parent.refreshList++;
      this.$parent.refreshList2++;
    },

    cancel() {
      this.categoriesId = this.startId;
      this.$refs.infoBlock.cancel();
    },

    openSave(value) {
      this.saveBlock = value;
    },

    closeDrawer() {
      this.$emit("closeDrawer");
    },

    selectCategories(category) {
      this.categoriesId = category.id;
      this.categoriesMenu = false;
    },

    async saveNote({ today, text, time, noteId, uid }) {
      const data = {
        text,
        today,
        time,
        clientId: this.client.id,
        agent: uid,
        noteId,
      };
      try {
        await this.$store.dispatch("saveNote", data);
      } catch (e) {
        throw e;
      }
    },
  },

  computed: {
    categoryName() {
      const category = this.categories.filter(
        (category) => category.id === this.categoriesId
      );
      return category[0].title;
    },

    saveItem() {
      return this.startId !== this.categoriesId ? true : false;
    },
  },

  components: {
    HouseTab,
    ProposedObj,
    Info,
    Logs,
    ObjectList,
    Family,
    Criterion,
    Refused,
    ReserveDialog,
    RefuseDialog,
    HorizontalScroll,
    ProposedObjectsDialog,
  },
};
</script>

<style>
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.3s ease;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}

.slideUp-enter-active,
.slideUp-leave-active {
  transition: transform 0.3s ease;
}
.slideUp-enter,
.slideUp-leave-to {
  transform: translateY(100%);
}
</style>
