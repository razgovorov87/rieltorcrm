<template>
  <div class="flex flex-col h-full">
    <div id="objectWrapper" ref="objectWrapper" class="pt-10 py-4 relative">
      <div class="absolute inset-0 bg-white z-10 opacity-70"></div>
      <div class="mx-auto container z-40 relative">
        <div class="flex justify-center rounded bg-white items-center w-full">
          <input
            v-model="search"
            type="text"
            placeholder="Поиск по ID или адресу..."
            class="py-2 px-4 border-r flex-grow focus:outline-none"
            @input="filterObject"
          />

          <div
            class="
              flex
              text-gray-800
              items-center
              py-2
              px-4
              border-r
              relative
              cursor-pointer
              select-none
              flex-shrink-0
              w-52
              justify-between
            "
            @click="roomsList = !roomsList"
          >
            <span>{{ rooms }}</span>
            <svg
              class="w-3 text-gray-500 ml-2 transition"
              :class="[
                {
                  'transform rotate-180': roomsList,
                },
              ]"
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
            <div
              v-if="roomsList"
              class="absolute top-full inset-x-0 bg-white border shadow"
            >
              <div class="flex flex-col w-full">
                <div
                  class="
                    border-b
                    px-2
                    py-2
                    hover:bg-gray-100
                    flex
                    justify-between
                    items-center
                  "
                  @click="rooms = 'Кол-во комнат'"
                >
                  Любое
                </div>
                <div
                  class="
                    border-b
                    px-2
                    py-2
                    hover:bg-gray-100
                    flex
                    justify-between
                    items-center
                  "
                  @click="rooms = $event.target.innerText"
                >
                  1
                </div>
                <div
                  class="
                    border-b
                    px-2
                    py-2
                    hover:bg-gray-100
                    flex
                    justify-between
                    items-center
                  "
                  @click="rooms = $event.target.innerText"
                >
                  2
                </div>
                <div
                  class="
                    border-b
                    px-2
                    py-2
                    hover:bg-gray-100
                    flex
                    justify-between
                    items-center
                  "
                  @click="rooms = $event.target.innerText"
                >
                  3
                </div>
                <div
                  class="
                    border-b
                    px-2
                    py-2
                    hover:bg-gray-100
                    flex
                    justify-between
                    items-center
                  "
                  @click="rooms = $event.target.innerText"
                >
                  4
                </div>
              </div>
            </div>
          </div>
          <input
            v-model="priceFrom"
            type="number"
            placeholder="Цена, от"
            class="py-2 px-4 focus:outline-none w-52"
            @input="filterObject"
          />
          <span class="text-gray-500 text-xl px-4">-</span>
          <input
            v-model="priceTo"
            type="number"
            placeholder="до"
            class="py-2 px-4 border-r focus:outline-none w-52"
            @input="filterObject"
          />
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="text-gray-500 font-semibold focus:outline-none mr-6"
            @click="resetFilter"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-grow" style="height: calc(100vh - 152px)">
      <div class="headerTable">
        <div class="headerTable-item borderNone"></div>
        <div class="headerTable-item textLeft">Адрес</div>
        <div class="headerTable-item">Кол-во комнат</div>
        <div class="headerTable-item">Стоимость</div>
        <div class="headerTable-item">URL</div>
        <div class="headerTable-item flex justify-center">
          <button
            v-if="checkAdmin"
            class="
              flex
              items-center
              bg-blue-600
              text-white
              font-semibold
              focus:outline-none
              py-1
              px-2
              transition
              hover:bg-blue-500
              focus:ring-2
            "
            @click="objectDrawer = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Добавить новый
          </button>
        </div>
      </div>
      <div v-if="objects" class="flex-grow overflow-y-auto">
        <div
          class="
            flex
            items-center
            object
            bg-white
            border-b
            hover:bg-gray-100
            cursor-pointer
          "
          v-for="obj in filterObject()"
          :key="obj.id"
        >
          <div class="py-6 text-center"></div>
          <div class="flex flex-col justify-center">
            <h2 class="text-blue-500 font-semibold">
              {{ obj.adress }}
            </h2>
          </div>
          <div v-if="obj.room" class="flex items-center justify-center">
            {{ obj.room }}
          </div>
          <div v-else class="flex items-center justify-center">-</div>
          <div class="flex justify-center items-center">
            {{ obj.price | currency }}
          </div>
          <a
            class="flex items-center justify-center"
            :href="obj.url"
            target="_blank"
          >
            <span
              class="py-1 px-2 text-sm text-blue-800 truncate underline"
              style="max-width: 300px"
              >{{ obj.url }}</span
            >
          </a>

          <div v-if="checkAdmin" class="flex justify-center items-center">
            <div
              class="
                w-4
                mr-2
                transform
                hover:text-blue-500 hover:scale-110
                cursor-pointer
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="changeObject(obj)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <div
              v-if="checkAdmin"
              class="
                w-4
                mr-2
                transform
                hover:text-red-500 hover:scale-110
                cursor-pointer
              "
              @click="deleteObject(obj)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="opacity">
      <div
        v-show="objectDrawer"
        class="absolute inset-0 bg-black opacity-30 z-50"
        @click="objectDrawer = false"
      ></div>
    </transition>

    <transition name="fade">
      <ObjectDrawer
        v-show="objectDrawer"
        :changeItem="changeItem"
        @closeDrawer="
          () => {
            objectDrawer = false;
            changeItem = null;
          }
        "
        @addNewObject="fetchObjects"
        :key="objectDrawer"
      />
    </transition>

    <div
      v-if="attention"
      class="
        absolute
        top-24
        left-1/2
        transform
        -translate-x-1/2
        text-center
        shadow
        rounded
        bg-white
        shadow-lg
        px-3
        py-2
        z-40
      "
    >
      <span class="text-red-600 font-medium">Внимание!</span> Данная страница с
      объектами не всегда содержит 100% всех наших объектов, поэтому если клиент
      спрашивает про квартиру, которой нет в списке и на карте, попросите его
      выслать ссылку на объявление, или сказать точный адрес и на каком сайте
      выставлена - и найти ее вручную
      <br />
      <a
        href="https://map.dutyfreeflats.ru"
        target="_blank"
        class="text-blue-500 underline"
        >map.dutyfreeflats.ru</a
      >
      <div class="absolute top-0 -right-1 transform translate-x-full">
        <div
          class="
            flex
            justify-center
            items-center
            p-1.5
            bg-white
            rounded-full
            cursor-pointer
            z-50
          "
          @click="attention = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObjectDrawer from "@/components/Objects/ObjectDrawer";
import errors from "@/errors";
export default {
  data: () => ({
    search: "",
    rooms: "Кол-во комнат",
    roomsList: false,
    priceFrom: null,
    priceTo: null,
    objects: [],
    objectDrawer: false,
    changeItem: null,
    refreshDrawer: 0,
    userInfo: false,
    attention: true,
  }),

  watch: {
    type() {
      this.filterObject();
    },
  },

  mounted() {
    this.getTableHeight;
    this.fetchInfo();
    this.fetchObjects();
  },

  methods: {
    getTableHeight() {
      const obj = document.querySelector("#objectWrapper");
      const height = getComputedStyle(obj).height;
      return `height: calc(100vh - ${height})`;
    },

    async fetchObjects() {
      try {
        this.objects = await this.$store.dispatch("fetchObjects");
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

    changeObject(obj) {
      this.changeItem = obj;
      this.objectDrawer = true;
    },

    resetFilter() {
      this.search = "";
      this.rooms = "Кол-во комнат";
      this.priceFrom = "";
      this.priceTo = "";
    },

    filterObject() {
      let resultArr = [];
      resultArr = this.objects.filter((obj) =>
        obj.adress.toLowerCase().includes(this.search.toLowerCase())
      );
      if (this.rooms !== "Кол-во комнат") {
        resultArr = this.objects.filter((obj) => obj.room === this.rooms);
      }

      if (this.priceFrom && !this.priceTo)
        resultArr = this.objects.filter((obj) => +obj.price >= this.priceFrom);
      else if (!this.priceFrom && this.priceTo)
        resultArr = this.objects.filter((obj) => +obj.price <= this.priceTo);
      else if (this.priceFrom && this.priceTo)
        resultArr = this.objects.filter(
          (obj) => +obj.price >= this.priceFrom && +obj.price <= this.priceTo
        );

      return resultArr;
    },

    async fetchInfo() {
      this.userInfo = this.$store.state.auth.loggedInUser;
    },

    async deleteObject(obj) {
      try {
        await this.$store.dispatch("deleteObj", obj);
        this.fetchObjects();
        this.$toasts.push({
          type: "success",
          message: "Объект успешно удален",
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
  },

  computed: {
    checkAdmin() {
      return this.userInfo.isAdmin;
    },
  },

  components: { ObjectDrawer },
};
</script>

<style scoped>
.headerTable {
  display: grid;
  /* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
  grid-template-columns: 150px 500px 1fr 1fr 1fr 0.8fr;
  background-color: #fff;
  @apply border-b shadow items-center;
}

.object {
  display: grid;
  /* grid-template-columns: auto 0.5fr 0.6fr 1fr 1fr 1fr 1fr; */
  grid-template-columns: 150px 500px 1fr 1fr 1fr 0.8fr;
}

.headerTable-item {
  @apply text-center py-3 border-r text-gray-400 uppercase font-semibold text-sm tracking-widest;
}

.headerTable-item.borderNone {
  @apply border-transparent !important;
}

.headerTable-item.textLeft {
  @apply text-left !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
#objectWrapper {
  background: url("../assets/city.jpg") bottom no-repeat;
  background-size: cover;
}
</style>
