<template>
  <div class="flex flex-col px-8 py-4">
    <h3 class="font-medium text-gray-500">Предложенные объекты</h3>
    <div
      v-for="(obj, idx) in objects"
      :key="obj.status + idx"
      class="flex mt-3 items-center"
    >
      <div
        v-if="objects[idx].status === 'offered'"
        type="text"
        placeholder="Ссылка на отчет в PDF"
        class="flex-grow border-2 focus:outline-none py-1 px-3 text-gray-600 rounded mr-4 bg-gray-100"
        @input="$emit('openSave', true)"
      >
        <p v-if="objects[idx].pdfNumber">
          <span class="italic select-none">Номер презентации: </span>
          {{ objects[idx].pdfNumber }}
        </p>
        <span v-else class="italic select-none">{{ objects[idx].link }}</span>
      </div>
      <input
        v-else
        v-model="objects[idx].link"
        type="text"
        placeholder="Ссылка на отчет в PDF"
        class="flex-grow border-2 focus:outline-none py-1 px-3 rounded mr-4 cursor-pointer"
        @input="$emit('openSave', true)"
      />
      <div
        v-if="btnLoading"
        class="mr-4 border-2 rounded px-3 py-1 focus:outline-none text-sm transition cursor-normal w-28 flex justify-center"
      >
        <svg
          class="animate-spin h-5 w-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <button
        v-else-if="!obj.status"
        class="mr-4 border-2 rounded px-3 py-1 focus:outline-none text-sm transition hover:bg-gray-200 cursor-pointer"
        @click="offerObject(obj)"
      >
        <span>Предложить объект</span>
      </button>
      <div
        v-else-if="obj.status && !checkLink(obj.link)"
        class="flex items-center"
      >
        <button
          class="mr-2 border-2 border-green-200 rounded px-3 py-1 focus:outline-none text-green-600 text-sm transition bg-green-200 hover:bg-green-300 hover:border-green-300"
          @click="$emit('openReserveDialog', obj)"
        >
          Записать на просмотр
        </button>
        <button
          class="mr-4 border-2 border-gray-600 rounded px-3 py-1 focus:outline-none text-gray-600 font-bold text-sm transition hover:bg-gray-200"
          @click="openPDF(obj)"
        >
          PDF
        </button>
      </div>
      <template v-else>
        <div
          class="mr-4 border-2 border-gray-200 rounded px-3 py-1 focus:outline-none text-gray-600 text-sm transition bg-gray-200 select-none"
        >
          Назначен просмотр
        </div>
        <button
          class="mr-4 border-2 border-gray-600 rounded px-3 py-1 focus:outline-none text-gray-600 font-bold text-sm transition hover:bg-gray-200"
          @click="openPDF(obj)"
        >
          PDF
        </button>
      </template>
      <button class="focus:outline-none" @click="openLink(obj)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-700 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </button>
      <button
        v-if="!obj.status"
        class="focus:outline-none"
        @click="deleteObj(idx)"
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div
      class="flex justify-center items-center mt-4 font-medium text-gray-500 cursor-pointer"
      @click="addProposedObject"
    >
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
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span>Добавить новую ссылку</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["client"],
  data: () => ({
    objStartLength: null,
    objects: [],
    btnLoading: false,
  }),

  mounted() {
    const response = this.client.proposedObjects;
    if (response) {
      this.client.proposedObjects.forEach((el) => {
        this.objects.push(el);
      });
    }
    this.objStartLength = this.objects.length;
  },

  watch: {
    objects() {
      if (this.objects.length !== this.objStartLength)
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },
  },

  methods: {
    async updateReserve() {
      const clientId = this.client.id;
      this.client.reserves = await this.$store.dispatch(
        "fetchClientReserves",
        clientId
      );
      this.objects = await this.$store.dispatch("fetchClientObjects", clientId);
    },

    openPDF(obj) {
      window.open(`https://pdf.median24.ru/pdf/${obj.pdfNumber}.pdf`, "_blank");
    },

    addProposedObject() {
      this.objects.push({
        link: "",
        status: "",
        pdfNumber: "",
      });
    },

    deleteObj(idx) {
      this.objects.splice(idx, 1);
    },

    async saveLinks() {
      const data = {
        clientId: this.client.id,
        arr: this.objects,
      };
      await this.$store.dispatch("saveClientLinks", data);
    },

    openLink(obj) {
      if (
        (!obj.link.includes("http://") || !obj.link.includes("https://")) &&
        !obj.link.includes("http://") &&
        !obj.link.includes("https://")
      ) {
        this.$toasts.push({
          type: "error",
          message: "Недействительная ссылка",
        });
      } else window.open(obj.link, "_blank");
    },

    async offerObject(obj) {
      this.$parent.loading = true;

      if (
        (!obj.link.includes("http://") || !obj.link.includes("https://")) &&
        !obj.link.includes("http://") &&
        !obj.link.includes("https://")
      ) {
        this.$toasts.push({
          type: "error",
          message: "Недействительная ссылка",
        });
        return;
      }

      let verify = true;
      if (this.client.logs) {
        let counter = 0;
        Object.keys(this.client.logs).forEach((key) => {
          Object.keys(this.client.logs[key]).forEach((id) => {
            const log = this.client.logs[key][id];
            if (log.logType === "offerObject") {
              if (log.link === obj.link) {
                counter++;
              }
            }
          });
        });

        if (counter >= 2) {
          this.$toasts.push({
            type: "error",
            message: "Данный объект уже предложен",
          });
          verify = false;
        }
      }

      if (!verify) {
        return;
      }

      axios
        .get(`https://crmpars.dutyfreeflats.ru/Home/GetInfo?link=${obj.link}`)
        .then((response) => {
          const data = response.data;
          this.openDialog(data);
        });
    },

    openDialog(data) {
      this.$emit("openProposedObjectDialog", data);
      this.$parent.loading = false;
    },

    async saveObj(obj) {
      const data = {
        itemId: this.client.id,
        link: obj.url,
        pdfNumber: obj.id * 2,
      };

      const findIdx = this.objects.findIndex(
        (item) => item.link === obj.url && !item.status
      );
      this.objects[findIdx].status = "offered";
      this.objects[findIdx].pdfNumber = data.pdfNumber;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      };

      let statusCode;
      await fetch(
        "https://crmpars.dutyfreeflats.ru/Home/CreatePDF",
        requestOptions
      )
        .then((response) => (statusCode = response.status))
        .catch((e) => console.log(e));

      if (statusCode === 200) {
        try {
          const log = await this.$store.dispatch("addOfferObjectLog", data);
          this.saveLinks();
          this.$parent.$refs.logsBlock.pushLog(log);
          this.$emit("openSave", false);
          this.$toasts.push({
            type: "success",
            message: "Презентация успешно создана",
          });
          this.$emit("successSave");
        } catch (e) {
          throw e;
        }
      } else {
        this.$toasts.push({
          type: "error",
          message: "При создании презентации произошла ошибка!",
        });
      }
    },

    // rndLink() {
    //   let text = ''
    //   const possible = "abcdefghijklmnopqrstuvwxyz";

    //   for(let i = 0; i < 5; i++) {
    //     text += possible.charAt(Math.floor(Math.random() * possible.length));
    //   }

    //   return text
    // },

    checkLink(link) {
      if (this.client.reserves) {
        const path = this.client.reserves;
        const result = Object.keys(path).find(
          (key) => path[key].obj.link === link
        );
        if (result) return true;
      } else return false;
    },
  },
};
</script>
