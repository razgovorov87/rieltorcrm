<template>
  <div class="w-1/2 p-20 py-32 pr-0">
    <div>
      <h1 class="text-dividerBg text-3xl">Регистрация</h1>
      <div class="font-semibold text-sm mt-1 text-gray-500">
        Уже есть аккаунт?
        <router-link
          to="/login"
          class="text-dividerBg border-b pb-0.5 border-dividerBg cursor-pointer"
          >Войти в аккаунт</router-link
        >
      </div>
    </div>

    <div class="flex flex-col mt-10 max-w-sm">
      <div>
        <div
          class="flex items-center border-b pb-4 transition"
          :class="{
            'border-dividerBg':
              coloredBorderLogin && !($v.login.$dirty && !$v.login.required),
            'border-red-500': $v.login.$dirty && !$v.login.required,
          }"
        >
          <svg
            class="w-6 mr-2"
            :class="
              $v.login.$dirty && !$v.login.required
                ? 'text-red-500'
                : 'text-dividerBg'
            "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
            placeholder="Логин"
            class="focus:outline-none text-sm"
            @focus.exact="coloredBorderLogin = true"
            @blur="coloredBorderLogin = false"
          />
        </div>
        <span
          v-if="!$v.login.required && $v.login.$dirty"
          class="text-xs text-red-600 italic"
          >Введите логин</span
        >
      </div>

      <div>
        <div
          class="flex items-center border-b pb-4 transition mt-4"
          :class="{
            'border-dividerBg':
              coloredBorderPassword &&
              !($v.password.$dirty && !$v.password.required),
            'border-red-500':
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        >
          <svg
            class="w-6 mr-2"
            :class="
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
                ? 'text-red-500'
                : 'text-dividerBg'
            "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          <input
            v-model="$v.password.$model"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Пароль"
            class="focus:outline-none text-sm"
            @focus.exact="coloredBorderPassword = true"
            @blur="coloredBorderPassword = false"
          />
        </div>
        <span
          v-if="!$v.password.required && $v.password.$dirty"
          class="text-xs text-red-600 italic"
          >Введите пароль</span
        >
        <span
          v-else-if="!$v.password.minLength && $v.password.$dirty"
          class="text-xs text-red-600 italic"
          >Минимальное кол-во символов:
          {{ $v.password.$params.minLength.min }}</span
        >
      </div>

      <div>
        <div
          class="flex items-center border-b pb-4 transition mt-4"
          :class="{
            'border-dividerBg':
              coloredBorderRePassword &&
              !($v.rePassword.$dirty && !$v.rePassword.required),
            'border-red-500':
              ($v.rePassword.$dirty && !$v.rePassword.required) ||
              ($v.rePassword.$dirty && !$v.rePassword.minLength) ||
              ($v.rePassword.$dirty && !$v.rePassword.sameAsPassword),
          }"
        >
          <svg
            class="w-6 mr-2"
            :class="
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength) ||
              ($v.rePassword.$dirty && !$v.rePassword.sameAsPassword)
                ? 'text-red-500'
                : 'text-dividerBg'
            "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          <input
            v-model="$v.rePassword.$model"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Повторите пароль"
            class="focus:outline-none text-sm"
            @focus.exact="coloredBorderRePassword = true"
            @blur="coloredBorderRePassword = false"
          />
        </div>
        <span
          v-if="!$v.rePassword.required && $v.rePassword.$dirty"
          class="text-xs text-red-600 italic"
          >Введите пароль</span
        >
        <span
          v-else-if="!$v.rePassword.sameAsPassword && $v.rePassword.$dirty"
          class="text-xs text-red-600 italic"
          >Пароли не совпадают</span
        >
        <span
          v-else-if="!$v.rePassword.minLength && $v.rePassword.$dirty"
          class="text-xs text-red-600 italic"
          >Минимальное кол-во символов:
          {{ $v.rePassword.$params.minLength.min }}</span
        >
      </div>

      <div class="flex justify-between items-center text-sm text-gray-500 my-4">
        <div
          class="flex items-center cursor-pointer"
          @click="showPassword = !showPassword"
        >
          <span class="mr-3 select-none">Показать пароль</span>
          <span class="relative">
            <span
              id="checkboxBg"
              class="block w-10 h-6 rounded-full shadow-inner"
              :class="showPassword ? 'bg-gray-200' : 'bg-gray-400'"
            ></span>
            <span
              id="checkbox"
              class="absolute block w-4 h-4 mt-1 rounded-full shadow inset-y-0 focus-within:shadow-outline ml-1 left-0"
              :class="showPassword ? 'open' : 'bg-white'"
            >
              <input
                id="showPassword"
                type="checkbox"
                class="absolute opacity-0 w-0 h-0"
              />
            </span>
          </span>
        </div>
      </div>

      <div class="text-center flex my-3">
        <transition name="opacity" mode="out-in">
          <div
            v-if="!btnLoading"
            class="bg-dividerBg w-full py-2 rounded-lg font-semibold text-white cursor-pointer select-none text-center flex justify-center"
            @click="register"
          >
            Регистрация
          </div>

          <div
            v-else
            class="bg-dividerBg w-full py-2 rounded-lg font-semibold text-white cursor-pointer select-none text-center flex justify-center"
          >
            <svg
              class="w-6 animate-spin mr-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50"
              style="enable-background:new 0 0 50 50;"
              xml:space="preserve"
            >
              <path
                fill="currentColor"
                d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
              ></path>
            </svg>
            Пожалуйста, подождите...
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data: () => ({
    login: "",
    password: "",
    rePassword: "",
    coloredBorderLogin: false,
    coloredBorderPassword: false,
    coloredBorderRePassword: false,
    showPassword: false,
    btnLoading: false,
  }),

  validations: {
    login: { required },
    password: { required, minLength: minLength(6) },
    rePassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    async register() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.btnLoading = true;

      const formData = {
        login: this.login,
        password: this.password,
      };

      const checkLogin = await this.$store.dispatch("checkLogin", this.login);
      if (!checkLogin) {
        this.$toasts.push({
          type: "error",
          message: "Пользователь с таким логином уже существует",
        });
        this.btnLoading = false;
        return;
      } else if (this.login.includes("@")) {
        this.$toasts.push({ type: "error", message: "Неверный формат логина" });
        this.btnLoading = false;
        return;
      }

      this.$router.push({
        name: "Получение информации",
        path: "/getinfo",
        params: { formData },
      });

      this.btnLoading = false;
    },
  },
};
</script>

<style>
#checkbox,
#checkboxBg {
  transition: 0.3s ease-in-out;
}

#checkbox.open {
  transform: translateX(100%);
  @apply bg-dividerBg;
}
</style>
