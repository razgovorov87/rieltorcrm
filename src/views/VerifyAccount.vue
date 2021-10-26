<template>
    <div class="w-1/2 p-20 py-32 px-0">
        <div class="flex flex-col justify-center items-center mb-4">
            <div class="flex items-center justify-center bg-gray-100 p-7 rounded-full mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-dividerBg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
            </div>
            <h1 class="text-dividerBg text-2xl">Заявка отправлена!</h1>
        </div>

        <div class="flex justify-center text-center mb-10">
            <span class="max-w-lg">
                Регистрация прошла успешно, ваша заявка отправлена на рассмотрение администрацией портала.<br>
                Пожалуйста, дождитесь подтверждения вашей заявки.
            </span>
        </div>

        <div class="flex justify-center">
            <button 
            class="transition focus:outline-none bg-dividerBg text-white px-4 py-2 rounded font-medium hover:bg-darkDivider hover:shadow-lg"
            @click="$router.push('/auth')"
            >Вернуться на главную</button>
        </div>
    </div>
</template>