<template>
  <div class="w-1/2 p-20 py-32 pb-28 pr-0">
    <div class="flex flex-col">
      <div class="flex items-center">
        <div
          class="
            rounded-full
            bg-dividerBg
            text-white
            p-2
            mr-2
            cursor-pointer
            transition
            hover:shadow-md hover:bg-opacity-75
          "
          @click="returnToLogin"
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
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <h1 class="text-dividerBg text-3xl">Восстановление пароля</h1>
      </div>
      <div v-if="step == 1" class="text-sm mt-2 max-w-md">
        Введите Email указаный при регистрации
      </div>
      <div v-else class="text-sm mt-2 max-w-md">
        Введите код, полученный на Email
      </div>
    </div>
    <div class="my-8 flex flex-col max-w-md">
      <transition>
        <div v-if="step == 1">
          <div>
            <div
              class="flex items-center border-b pb-4 transition"
              :class="{
                'border-dividerBg':
                  coloredBorderLogin &&
                  !($v.login.$dirty && !$v.login.required),
                'border-red-500':
                  ($v.login.$dirty && !$v.login.required) ||
                  ($v.login.$dirty && !$v.login.email),
              }"
            >
              <svg
                class="w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                :class="
                  ($v.login.$dirty && !$v.login.required) ||
                  ($v.login.$dirty && !$v.login.email)
                    ? 'text-red-500'
                    : 'text-dividerBg'
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <input
                v-model.trim="$v.login.$model"
                type="text"
                placeholder="Email"
                class="w-full focus:outline-none text-sm"
                @keydown.enter="sendCode"
                @focus.exact="coloredBorderLogin = true"
                @blur="coloredBorderLogin = false"
              />
            </div>
            <span
              v-if="!$v.login.required && $v.login.$dirty"
              class="text-xs text-red-600 italic"
              >Введите Email</span
            >
            <span
              v-else-if="$v.login.$dirty && !$v.login.email"
              class="text-xs text-red-600 italic"
              >Неверный Email</span
            >
          </div>
          <div
            class="
              mt-8
              bg-dividerBg
              w-full
              py-2
              rounded-lg
              font-semibold
              text-white
              cursor-pointer
              select-none
              text-center
              flex
              justify-center
            "
            @click="sendCode"
          >
            Отправить код
          </div>
        </div>
        <CodeInput
          v-else
          :loading="false"
          :autoFocus="true"
          :fields="4"
          v-on:complete="onComplete"
        />
      </transition>
    </div>
    <div v-if="step == 2" class="text-sm">
      <span class="mr-1">Не пришел код? Проверьте папку спам.</span>
      <span
        :class="{
          'text-gray-500 italic border-b-2': timerCount > 0,
          'text-blue-500 font-semibold cursor-pointer': timerCount <= 0,
        }"
        @click="reSendCode"
      >
        <template v-if="timerCount > 0">
          Отправить еще раз ({{ timerCount }})
        </template>
        <template v-else> Отправить еще раз </template>
      </span>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import CodeInput from "vue-verification-code-input";
export default {
  data: () => ({
    step: 1,
    login: "",
    coloredBorderLogin: false,
    coloredBorderPassword: false,
    timerCount: 60,
    timer: null,
  }),

  watch: {
    timerCount() {
      if (this.timerCount === 0) {
        this.stopTimer();
      }
    },
  },

  validations: {
    login: { required, email },
  },

  methods: {
    startTimer() {
      this.timerCount = 60;
      this.timer = setInterval(() => {
        this.timerCount--;
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.timer);
    },

    returnToLogin() {
      this.$router.push("/login");
    },

    async reSendCode() {
      await this.$store.dispatch("restorePassword", this.login);
      this.startTimer();
    },

    async sendCode() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      await this.$store.dispatch("restorePassword", this.login);
      this.startTimer();
      this.step = 2;
    },

    async verifyCode(restoreCode) {
      const formData = {
        login: this.login,
        restoreCode,
      };
      const status = await this.$store.dispatch("verifyCode", formData);
      if (status == "Correct code") {
        this.$router.push({
          name: "Смена пароля",
          path: "/change-password",
          params: { formData },
        });
      }
    },

    onComplete(code) {
      this.verifyCode(code);
    },
  },
  components: {
    CodeInput,
  },
};
</script>

<style lang="scss">
.react-code-input {
  input {
    font-family: "Roboto", sans-serif !important;
    border-radius: 10px !important;
    width: 45px !important;
    margin: 0 5px !important;
    border: 1px solid #a8adb7;
    border-right: 1px solid #a8adb7 !important;
    border-left: 1px solid #a8adb7 !important;
    user-select: none !important;

    &:focus {
      border-right: 1px solid #006fff !important;
      border-left: 1px solid #006fff !important;
    }
  }
}
</style>