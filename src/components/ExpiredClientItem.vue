<template>
  <li class="flex items-center border border-gray-200 rounded px-2 py-2 mb-2">
    <div class="flex w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
    <span class="text-blue-500 font-bold mr-3">
      {{ client["msg"]["phone"] }}</span
    >
    <span class="italic">{{ client["msg"]["timeAgo"] }}</span>
    <div class="flex-grow"></div>
    <div class="flex">
      <div
        class="
          mx-1
          rounded-xl
          text-xs
          px-5
          py-1
          border
          text-blue-500
          border border-blue-500
          flex
          items-center
          cursor-pointer
          transition
          hover:border-blue-700 hover:shadow
        "
        @click="onWork"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-workspace mr-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
          />
          <path
            d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"
          />
        </svg>
        Оставить
      </div>
      <div
        class="
          mx-1
          rounded-xl
          text-xs
          px-5
          py-1
          border
          text-yellow-700
          border border-yellow-700
          flex
          items-center
          cursor-pointer
          transition
          hover:border-yellow-800 hover:shadow
        "
        @click="onWork"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-telephone-x mr-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
          />
          <path
            fill-rule="evenodd"
            d="M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
          />
        </svg>
        Не берет трубку
      </div>
      <div
        class="
          mx-1
          rounded-xl
          text-xs
          px-5
          py-1
          text-red-700
          border border-red-700
          flex
          items-center
          cursor-pointer
          transition
          hover:border-red-800 hover:shadow
        "
        @click="onCancel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash mr-1"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
        Отказаться
      </div>
    </div>
  </li>
</template>

<script>
import errors from '../errors';
export default {
  props: ["client"],
  data: () => ({}),
  methods: {
    onWork() {
      try {
        this.$store.dispatch("expiredClientOnWork", this.client["alertId"]);
        this.$socket.client.emit("alert", {
          alertId: this.client["alertId"],
          readed: true,
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
    onCancel() {
      try {
        this.$store.dispatch("expiredClientOnWork", {
          alertId: this.client["alertId"],
          clientId: this.client["msg"]["clientId"],
        });
        this.$store.dispatch("refuseClient", {
          cause: "Другое",
          otherCause: "Авто отказ по времени",
          comment: "",
          clientId: this.client["msg"]["clientId"],
        });
        this.$socket.client.emit("alert", {
          alertId: this.client["alertId"],
          readed: true,
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
};
</script>