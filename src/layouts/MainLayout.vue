<template>
  <div v-if="successloadingUser" class="flex h-screen bg-gray-100 relative">
    <Divider />
    <Header v-if="disableHeader" />
    <main
      id="page"
      class="flex-grow"
      :class="disableHeader ? 'pt-divider' : 'pageFull'"
    >
      <router-view />
    </main>
    <v-dialog v-model="showDialog" width="800" persistent>
      <v-card>
        <v-card-title>Необходимо начать работу с клиентами</v-card-title>
        <v-card-text>
          <transition-group name="list">
            <ExpiredClientItem
              v-for="client of expiredClients"
              :key="client.alertId"
              :client="client"
            />
          </transition-group>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div
      class="
        absolute
        right-4
        bottom-2
        z-50
        text-gray-500
        flex
        items-center
        bg-white
        shadow
        px-2
        rounded-lg
      "
      style="font-size: 10px"
    >
      CRM version:
      <v-skeleton-loader
        v-if="frontVersion == ''"
        width="50"
        type="text"
        style="margin: 0; padding: 0"
      ></v-skeleton-loader>
      <span v-else class="mx-1">v{{ frontVersion }}</span>
      | Core version:
      <v-skeleton-loader
        v-if="backVersion == ''"
        width="50"
        type="text"
        style="margin: 0; padding: 0"
      ></v-skeleton-loader>
      <span v-else class="mx-1">v{{ backVersion }}</span>
    </div>
  </div>
</template>

<script>
import errors from '../errors';
import Divider from "@/components/Layout/Divider";
import Header from "@/components/Layout/Header";
import ExpiredClientItem from "@/components/ExpiredClientItem";
import store from "../store";
import { mapGetters, mapState } from "vuex";
export default {
  name: "App",
  data: () => ({
    successloadingUser: false,
    isShowDialog: false,
  }),

  async created() {
    try {
      const user = await store.dispatch("fetchInfo");
      this.$socket.client.emit("login", { id: user.id });
      this.successloadingUser = true;
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

  computed: {
    ...mapGetters(["expiredClients", "frontVersion", "backVersion"]),

    showDialog() {
      return this.expiredClients.length != 0;
    },

    disableHeader() {
      return this.$route.path === "/object" ||
        this.$route.path === "/admin/clients" ||
        this.$route.path === "/admin/team" ||
        this.$route.path === "/reverses" ||
        this.$route.path === "/calls"
        ? false
        : true;
    },
  },

  components: { Divider, Header, ExpiredClientItem },
};
</script>

<style>
body {
  overflow-x: hidden;
}
#page {
  height: calc(100vh - 100px);
}

.pageFull {
  height: 100vh !important;
}
::-webkit-scrollbar {
  width: 1px;
  height: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-border-radius: 1px;
  border-radius: 1px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(173, 173, 173, 0.8);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(173, 173, 173, 0.8);
}

.v-skeleton-loader__text {
  margin: 0 3px !important;
}
</style>



