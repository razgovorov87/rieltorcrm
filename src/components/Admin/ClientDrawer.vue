<template>
  <div class="absolute inset-0 z-50 flex justify-end overflow-hidden">
    <div class="flex flex-col w-2/4 h-screen bg-white shadow-2xl z-30">
      <div class="border-b p-5 flex justify-between items-center">
        <span class="text-xl font-medium select-none flex-grow">Добавление клиента</span>


        <div class="flex flex-col mr-6">
          <label class="flex justify-start items-center py-1 px-3 rounded">
            <div class="bg-white border-2 rounded-full border-red-600 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2">
              <input v-model="missedCall" type="checkbox" class="opacity-0 absolute" 
              @change=" () => {
                confirmCall = !missedCall
              }">
              <svg class="hidden w-3 h-3 text-red-600 pointer-events-none" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="darkRed" />
              </svg>
            </div>
            <div class="select-none font-medium text-sm text-red-600">Пропущенный</div>
          </label>
          <label class="flex justify-start items-center py-1 px-3 rounded">
            <div class="bg-white border-2 rounded-full border-green-600 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2">
              <input v-model="confirmCall" type="checkbox" class="opacity-0 absolute" 
              @change=" () => {
                missedCall = !confirmCall
              }">
              <svg class="hidden w-3 h-3 text-red-600 pointer-events-none" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="green" />
              </svg>
            </div>
            <div class="select-none font-medium text-sm text-green-600">Принятый</div>
          </label>
        </div>

        <div class="flex items-center">
          <div
            class="mr-4 border rounded font-medium px-2 py-1 border-gray-300 select-none transition"
            :class="{
              'border-blue-700 text-white bg-blue-700 hover:shadow-xl cursor-pointer': formVerify,
              'text-gray-500': !formVerify,
            }"
            @click="addNewUser"
          >
            Сохранить
          </div>
          <div class="cursor-pointer" @click="$emit('closeDrawer')">
            <svg
              class="w-6 h-6 mt-0.5 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <!-- header -->

      <div class="overflow-y-auto flex flex-col">
        <v-collapse-group>
          <v-collapse-wrapper class="flex flex-col" :active="true">
            <div
              v-collapse-toggle
              class="px-5 py-2 bg-gray-200 font-medium text-gray-600 cursor-pointer flex justify-between items-center hover:bg-gray-300 transition mb-1"
            >
              <span class="select-none">Основная информация</span>
              <span>
                <svg
                  class="w-6 h-6 transition transform -rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <div v-collapse-content>
              <div class="px-6 py-4 flex flex-col space-y-4">

                <div class="flex items-center">
                  <label
                    class="flex-shrink-0 w-1/3 text-gray-500 font-medium required"
                    >Телефон</label
                  >
                  <masked-input
                    v-model="phone"
                    type="text"
                    mask="\+\7 (111) 111 11-11"
                    placeholder="+7 (XXX) XXX-XX-XX"
                    class="flex-grow border-2 focus:outline-none py-1 px-3 rounded"
                  />
                </div>

                <div class="flex items-center">
                  <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">ФИО</label
                  >
                  <input
                    v-model="fio"
                    type="text"
                    class="flex-grow border-2 focus:outline-none py-1 px-3 rounded"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div class="flex">
                  <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium">Комментарий</label
                  >
                  <textarea 
                    v-model="comment"
                    rows="3" 
                    class="w-full border-2 rounded shadow h-full px-2 py-1 focus:outline-none focus:border-blue-300 flex" 
                    @keydown.enter.exact.prevent
                    @keydown.enter.shift.exact="newline">
                </textarea>
                </div>

                <div class="flex items-center">
                  <label class="flex-shrink-0 w-1/3 text-gray-500 font-medium"
                    >Объект обращения</label
                  >
                  <span
                    v-if="!interestingObj"
                    class="flex items-center transition text-gray-500 font-medium cursor-pointer hover:text-gray-600"
                    @click="objectListDialog = true"
                    ><svg
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
                    Добавить</span
                  >
                  <div
                    v-else
                    class="flex items-center text-gray-500 border-b border-gray-400 cursor-pointer"
                    @click="objectListDialog = true"
                  >
                    <span class="font-medium">{{ interestingObj.adress }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                </div>
              
              </div>
            </div>
          </v-collapse-wrapper>
        </v-collapse-group>
      </div>
      <!-- main -->
    </div>

    <div
      v-if="objectListDialog"
      class="absolute inset-0 z-50 flex items-center justify-center py-10 bg-black bg-opacity-30"
    >
      <div class="bg-white w-full h-full my-10 mx-10 shadow-lg">
        <ObjectList
          @selectObj="
            (obj) => {
              interestingObj = obj;
              objectListDialog = false;
            }
          "
          @closeDialog="objectListDialog = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MaskedInput from "vue-masked-input";
import { CurrencyInput } from "vue-currency-input";
import ObjectList from "@/components/Admin/ObjectList";
export default {
  data: () => ({
    formVerify: false,
    missedCall: true,
    confirmCall: false,
    phone: "",
    fio: "",
    comment: "",
    interestingObj: null,
    objectListDialog: false,
  }),

  watch: {
    phone() {
      if (this.phone.toString().indexOf("_") === -1 && this.phone !== "")
        this.formVerify = true;
      else this.formVerify = false;
    },
  },

  mounted() {},

  methods: {
    newline() {
        this.value = `${this.value}\n`;
    },
    async addNewUser() {
      if (!this.formVerify) return;
      try {
        const formData = {
          phone: this.phone,
          fio: this.fio,
          comment: this.comment,
          missedCall: this.missedCall,
          interestingObj: this.interestingObj,
        };

        const response = await this.$store.dispatch("addNewClient", formData);

        if(response === 'dublicatePhone') {
            this.$toasts.push({
              type: "error",
              message: "Клиент с таким номером телефона уже существует",
            });
            return
        }

        this.$toasts.push({
          type: "success",
          message: "Клиент успешно добавлен",
        });
        this.$emit("addNewClient");
        this.clearInputs();
      } catch (e) {
        this.$toasts.push({
          type: "error",
          message: "Что-то пошло не так",
        });
        throw e;
      }
    },

    clearInputs() {
      this.phone = "";
      this.fio = "";
      this.comment = "";
      this.interestingObj = null;
    },
  },

  components: {
    CurrencyInput,
    MaskedInput,
    ObjectList,
  },
};
</script>

<style>
.required:after {
  content: " *";
  color: red;
}

.v-collapse-content {
  max-height: 0;
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  padding: 0;
}

.v-collapse-content-end {
  transition: max-height 0.3s ease-in;
  max-height: 500px;
}

input:checked + svg {
  display: block;
}
</style>
