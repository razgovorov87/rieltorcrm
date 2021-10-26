<template>
  <div class="flex flex-col px-8 py-4">
    <div class="flex items-center">
      <span class="font-medium text-gray-500 flex-shrink-0 w-48"
        >Состав проживающих</span
      >
      <div
        class="flex-grow border rounded bg-white cursor-pointer relative border-gray-100"
      >
        <div
          class="flex justify-between items-center px-4 py-2"
          @click="openList = true"
        >
          <span v-if="family">{{ family }}</span>
          <span v-else class="text-gray-400"
            >Выберите подходящих вариант из списка...</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-500"
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
        </div>
        <div
          v-if="openList"
          class="absolute top-full h-20 w-full right-0 pt-2 z-30"
          v-click-outside="
            () => {
              openList = false;
            }
          "
        >
          <div
            class="bg-white flex flex-col border rounded shadow border-gray-100 overflow-hidden"
          >
            <span
              v-for="(item, idx) in list"
              :key="item + idx"
              class="border-b px-4 py-2 hover:bg-dividerBg hover:text-white select-none"
              @click="
                ($event) => {
                  family = $event.target.innerText;
                  openList = false;
                }
              "
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-10">
      <div
        v-for="(item, idx) in men"
        :key="item + idx"
        class="flex flex-col border-b pb-3 mb-2"
      >
        <div class="flex items-center flex-grow mb-3">
          <div
            class="flex items-center justify-center font-medium text-gray-700 flex-shrink-0 mr-4"
          >
            <div class="flex items-center mr-2">
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
              Человек
            </div>

            <div class="flex items-center">
              <button
                class="focus:outline-none relative"
                @click="men[idx].openDialog = !men[idx].openDialog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="transition rounded-md w-6 h-6 p-1 bg-gray-200 hover:bg-red-600 hover:text-white"
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

                <div
                  v-if="men[idx].openDialog"
                  v-click-outside="
                    () => {
                      men[idx].openDialog = false;
                    }
                  "
                  class="absolute top-full right-0 mt-2 transform translate-x-1/2 bg-white border-2 border-gray-200 rounded-lg z-50 shadow-lg"
                >
                  <div
                    class="flex flex-col items-center justify-center text-black py-1 px-3"
                  >
                    <span class="text-sm mb-1">Удалить?</span>
                    <div class="flex items-center text-sm">
                      <div
                        class="py-1 px-3 text-center bg-red-500 mr-2 text-white rounded cursor-pointer shadow"
                        @click.stop="
                          () => {
                            men[idx].openDialog = false;
                            men.splice(idx, 1);
                          }
                        "
                      >
                        Да
                      </div>

                      <div
                        class="py-1 px-3 text-center bg-green-500 text-white rounded cursor-pointer shadow"
                        @click.stop="men[idx].openDialog = false"
                      >
                        Отмена
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <input
            v-model="men[idx].fio"
            type="text"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg flex-grow"
            placeholder="ФИО"
            @input="$emit('openSave', true)"
          />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <InputGender
            :men="men[idx]"
            @changeGender="(gender) => (men[idx].gender = gender)"
            @openSave="(bool) => $emit('openSave', bool)"
          />

          <input
            v-model="men[idx].age"
            type="number"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg"
            placeholder="Возраст"
            @input="$emit('openSave', true)"
          />

          <input
            v-model="men[idx].work"
            type="text"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg"
            placeholder="Сфера деятельности"
            @input="$emit('openSave', true)"
          />

          <input
            v-model="men[idx].national"
            type="text"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg"
            placeholder="Гражданство"
            @input="$emit('openSave', true)"
          />

          <input
            v-model="men[idx].register"
            type="text"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg"
            placeholder="Прописка"
            @input="$emit('openSave', true)"
          />

          <input
            v-model="men[idx].salary"
            type="number"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg"
            placeholder="Зарплата"
            @input="$emit('openSave', true)"
          />
        </div>

        <textarea
          v-model="men[idx].info"
          rows="2"
          class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex mt-3"
          placeholder="Дополнительная информация"
          @keydown.enter.exact.prevent
          @keydown.enter.shift.exact="newline"
          @input="$emit('openSave', true)"
        >
        </textarea>
      </div>

      <div class="flex justify-center items-center mb-4">
        <span
          class="font-medium flex items-center cursor-pointer"
          @click="
            () => {
              men.push({
                fio: '',
                gender: '',
                age: '',
                work: '',
                national: '',
                register: '',
                salary: '',
                info: '',
                openDialog: false,
              });
              $emit('openSave', true);
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Добавить человека
        </span>
      </div>
      <!-- Mans List -->

      <div
        v-for="(kid, idx) in kids"
        :key="kid + idx"
        class="flex flex-col border-b pb-3 mb-2"
      >
        <div class="flex items-center flex-grow mb-3">
          <div
            class="flex items-center justify-center font-medium text-gray-700 flex-shrink-0 mr-4"
          >
            <div class="flex items-center mr-2">
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
              Ребенок
            </div>

            <div class="flex items-center">
              <button
                class="focus:outline-none relative"
                @click="kids[idx].openDialog = !kids[idx].openDialog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="transition rounded-md w-6 h-6 p-1 bg-gray-200 hover:bg-red-600 hover:text-white"
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

                <div
                  v-if="kids[idx].openDialog"
                  v-click-outside="
                    () => {
                      kids[idx].openDialog = false;
                    }
                  "
                  class="absolute top-full right-0 mt-2 transform translate-x-1/2 bg-white border-2 border-gray-200 rounded-lg z-50 shadow-lg"
                >
                  <div
                    class="flex flex-col items-center justify-center text-black py-1 px-3"
                  >
                    <span class="text-sm mb-1">Удалить?</span>
                    <div class="flex items-center text-sm">
                      <div
                        class="py-1 px-3 text-center bg-red-500 mr-2 text-white rounded cursor-pointer shadow"
                        @click.stop="
                          () => {
                            kids[idx].openDialog = false;
                            kids.splice(idx, 1);
                          }
                        "
                      >
                        Да
                      </div>

                      <div
                        class="py-1 px-3 text-center bg-green-500 text-white rounded cursor-pointer shadow"
                        @click.stop="kids[idx].openDialog = false"
                      >
                        Отмена
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <input
            v-model="kids[idx].name"
            type="text"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg flex-grow mr-3"
            placeholder="Имя"
            @input="$emit('openSave', true)"
          />

          <input
            v-model="kids[idx].age"
            type="number"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg flex-grow"
            placeholder="Возраст"
            @input="$emit('openSave', true)"
          />
        </div>

        <textarea
          v-model="kids[idx].info"
          rows="2"
          class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex"
          placeholder="Дополнительная информация"
          @keydown.enter.exact.prevent
          @keydown.enter.shift.exact="newline"
          @input="$emit('openSave', true)"
        >
        </textarea>
      </div>

      <div class="flex justify-center items-center mb-4">
        <span
          class="font-medium flex items-center cursor-pointer"
          @click="
            () => {
              kids.push({
                name: '',
                age: '',
                info: '',
                openDialog: false,
              });
              $emit('openSave', true);
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Добавить ребенка
        </span>
      </div>
      <!-- Kid List -->

      <div
        v-for="(pet, idx) in pets"
        :key="pet + idx"
        class="flex flex-col border-b pb-3 mb-2"
      >
        <div class="flex items-center flex-grow mb-3">
          <div
            class="flex items-center justify-center font-medium text-gray-700 flex-shrink-0 mr-4"
          >
            <div class="flex items-center mr-2">
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
              Питомец
            </div>

            <div class="flex items-center">
              <button
                class="focus:outline-none relative"
                @click="pets[idx].openDialog = !pets[idx].openDialog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="transition rounded-md w-6 h-6 p-1 bg-gray-200 hover:bg-red-600 hover:text-white"
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

                <div
                  v-if="pets[idx].openDialog"
                  v-click-outside="
                    () => {
                      pets[idx].openDialog = false;
                    }
                  "
                  class="absolute top-full right-0 mt-2 transform translate-x-1/2 bg-white border-2 border-gray-200 rounded-lg z-50 shadow-lg"
                >
                  <div
                    class="flex flex-col items-center justify-center text-black py-1 px-3"
                  >
                    <span class="text-sm mb-1">Удалить?</span>
                    <div class="flex items-center text-sm">
                      <div
                        class="py-1 px-3 text-center bg-red-500 mr-2 text-white rounded cursor-pointer shadow"
                        @click.stop="
                          () => {
                            pets[idx].openDialog = false;
                            pets.splice(idx, 1);
                          }
                        "
                      >
                        Да
                      </div>

                      <div
                        class="py-1 px-3 text-center bg-green-500 text-white rounded cursor-pointer shadow"
                        @click.stop="pets[idx].openDialog = false"
                      >
                        Отмена
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <input
            v-model="pets[idx].type"
            type="text"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg flex-grow mr-3"
            placeholder="Кошка, собака и т.д."
            @input="$emit('openSave', true)"
          />

          <input
            v-model="pets[idx].age"
            type="number"
            class="w-full shadow items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg flex-grow"
            placeholder="Возраст"
            @input="$emit('openSave', true)"
          />
        </div>

        <textarea
          v-model="pets[idx].info"
          rows="2"
          class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:ring-2 ring-dividerBg flex"
          placeholder="Дополнительная информация"
          @keydown.enter.exact.prevent
          @keydown.enter.shift.exact="newline"
          @input="$emit('openSave', true)"
        >
        </textarea>
      </div>

      <div class="flex justify-center items-center mb-4">
        <span
          class="font-medium flex items-center cursor-pointer"
          @click="
            () => {
              pets.push({
                type: '',
                age: '',
                info: '',
                openDialog: false,
              });
              $emit('openSave', true);
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Добавить питомца
        </span>
      </div>
      <!-- Kid List -->
    </div>
  </div>
</template>

<script>
import InputGender from "@/components/Clients/Tab/Family/InputGender";
export default {
  props: ["client"],
  data: () => ({
    family: "",
    list: [
      "Семья",
      "Парень с девушкой",
      "Один человек",
      "Друзья",
      "Другой состав",
    ],
    openList: false,
    men: [],
    kids: [],
    pets: [],
    openConfirmDialog: false,
  }),

  mounted() {
    if (this.client.composition) {
      this.family = this.client.compositionType
        ? this.client.compositionType
        : "";
      this.men = this.client.composition.men ? this.client.composition.men : [];
      this.kids = this.client.composition.kids
        ? this.client.composition.kids
        : [];
      this.pets = this.client.composition.pets
        ? this.client.composition.pets
        : [];
    }
  },

  methods: {
    saveInfo() {
      const frontData = {
        men: this.men,
        kids: this.kids,
        pets: this.pets,
      };

      this.$store.dispatch("saveClientComposition", [
        this.client.id,
        frontData,
        this.family,
      ]);
    },
  },

  components: {
    InputGender,
  },
};
</script>
