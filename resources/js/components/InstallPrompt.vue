<script setup lang="ts">
import {
    handlePWAInstallPrompt,
    registerServiceWorker,
} from '@/composables/usePwa';

registerServiceWorker();
handlePWAInstallPrompt();
</script>

<template>
    <div
        id="install-prompt"
        class="bg-indigo/90 fixed right-4 bottom-4 z-50 flex items-center justify-center rounded-full p-4 shadow-lg backdrop-blur-md dark:bg-indigo-800/90"
        style="display: none"
    >
        <div
            id="install-button"
            class="cursor-pointer rounded-full p-2 hover:bg-indigo-200 dark:hover:bg-indigo-700"
        >
            <img src="/logo.gif" alt="Install App" class="h-12 w-24" />
        </div>
    </div>
</template>
