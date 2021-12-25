<template>
  <div class="w-1/2 p-20 py-32 pb-28 pr-0">
    <div>
      <h1 class="text-dividerBg text-3xl">Информация о вас</h1>
    </div>

    <div class="flex flex-col mt-10 max-w-sm">
      <div>
        <div
          class="flex items-center border-b pb-4 transition"
          :class="{
            'border-dividerBg':
              coloredBorderSurname &&
              !($v.surname.$dirty && !$v.surname.required),
            'border-red-500': $v.surname.$dirty && !$v.surname.required,
          }"
        >
          <svg
            class="w-6 mr-2"
            :class="
              $v.surname.$dirty && !$v.surname.required
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
            v-model.trim="$v.surname.$model"
            type="text"
            placeholder="Фамилия"
            class="focus:outline-none text-sm"
            @focus.exact="coloredBorderSurname = true"
            @blur="coloredBorderSurname = false"
          />
        </div>
        <span
          v-if="!$v.surname.required && $v.surname.$dirty"
          class="text-xs text-red-600 italic"
          >Введите фамилию</span
        >
      </div>

      <div>
        <div
          class="flex items-center border-b pb-4 transition mt-4"
          :class="{
            'border-dividerBg':
              coloredBorderName && !($v.name.$dirty && !$v.name.required),
            'border-red-500': $v.name.$dirty && !$v.name.required,
          }"
        >
          <svg
            class="w-6 mr-2"
            :class="
              $v.name.$dirty && !$v.name.required
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
            v-model.trim="$v.name.$model"
            type="text"
            placeholder="Имя"
            class="focus:outline-none text-sm"
            @focus.exact="coloredBorderName = true"
            @blur="coloredBorderName = false"
          />
        </div>
        <span
          v-if="!$v.name.required && $v.name.$dirty"
          class="text-xs text-red-600 italic"
          >Введите имя</span
        >
      </div>

      <div>
        <div
          class="flex items-center border-b pb-4 transition mt-4"
          :class="{
            'border-dividerBg': coloredBorderSecondName,
          }"
        >
          <svg
            class="w-6 mr-2 text-dividerBg"
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
            v-model.trim="secondName"
            type="text"
            placeholder="Отчество"
            class="focus:outline-none text-sm"
            @focus.exact="coloredBorderSecondName = true"
            @blur="coloredBorderSecondName = false"
          />
        </div>
      </div>

      <div>
        <div
          class="flex items-center border-b pb-4 transition mt-4"
          :class="{
            'border-dividerBg': coloredBorderPhone && !phoneError,
            'border-red-500': phoneError,
          }"
        >
          <svg
            class="w-6 mr-2"
            :class="phoneError ? 'text-red-500' : 'text-dividerBg'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <masked-input
            mask="\+\7 (111) 111 11-11"
            v-model="phone"
            type="text"
            placeholder="Телефон"
            class="focus:outline-none text-sm w-full"
            @focus.exact="coloredBorderPhone = true"
            @blur="coloredBorderPhone = false"
          />
        </div>
        <span v-if="phoneError" class="text-xs text-red-600 italic"
          >Неверный номер телефона</span
        >
      </div>

      <div class="text-center flex flex-col my-3 mt-10">
        <transition name="opacity" mode="out-in">
          <div
            v-if="!btnLoading"
            class="
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
            @click="register"
          >
            Сохранить
          </div>

          <div
            v-else
            class="
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
          >
            <svg
              class="w-6 animate-spin mr-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 50 50"
              style="enable-background: new 0 0 50 50"
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
        <router-link
          to="/register"
          class="
            text-gray-400
            font-semibold
            mt-4
            focus:outline-none
            select-none
          "
          >Назад</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import MaskedInput from "vue-masked-input";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: ["formData"],
  data: () => ({
    surname: "",
    name: "",
    secondName: "",
    phone: "",
    phoneError: false,
    coloredBorderSurname: false,
    coloredBorderName: false,
    coloredBorderSecondName: false,
    coloredBorderPhone: false,
    btnLoading: false,
  }),

  validations: {
    surname: { required },
    name: { required },
    phone: { required, minLength: minLength(6) },
  },

  created() {
    if (!this.formData) this.$router.push("/register");
  },

  methods: {
    async register() {
      try {
        const result = this.phone.toString().indexOf("_");
        if (this.$v.$invalid || this.phone === "" || result !== -1) {
          this.$v.$touch();
          if (this.phone === "" || result !== -1) {
            this.phoneError = true;
            return;
          } else {
            this.phoneError = false;
          }

          return;
        }

        this.btnLoading = true;

        let data = {
          ...this.formData,
          surname: this.surname,
          name: this.name,
          secondName: this.secondName,
          phone: this.phone,
        };

        await this.$store.dispatch("register", data);
        this.btnLoading = false;
        this.$router.push("/verify");
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
        this.btnLoading = false;
        throw e;
      }
    },
  },

  components: { MaskedInput },
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
</style>
