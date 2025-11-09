<script setup lang="ts">
import { ref } from 'vue';

// Components
import { Button } from '@/components/ui/button';

// Icons
import ChevronDown from '@/components/icons/ChevronDown.vue';

const props = defineProps<{
    languages?: string[];
    modelValue?: string | null;
}>();

const emit = defineEmits<{
    'update:modelValue': [language: string | null];
}>();

const selectedLanguage = ref<string>(props.modelValue || 'All Languages');
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectLanguage = (language: string) => {
    selectedLanguage.value = language;
    isDropdownOpen.value = false;
    const valueToEmit = language !== 'All Languages' ? language : null;
    emit('update:modelValue', valueToEmit);
};
</script>

<template>
    <div class="relative inline-block">
        <Button
            type="button"
            id="dropdown-button"
            @click="toggleDropdown"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            aria-haspopup="true"
            :aria-expanded="isDropdownOpen"
        >
            <span>{{ selectedLanguage }}</span>
            <ChevronDown class="h-4 w-4" />
        </Button>
        <div
            v-if="isDropdownOpen"
            id="dropdown"
            class="absolute top-full left-0 z-50 mt-1 w-56 divide-y divide-gray-100 rounded-lg bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700"
        >
            <ul
                class="max-h-60 overflow-y-auto py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
            >
                <li>
                    <button
                        type="button"
                        @click="selectLanguage('All Languages')"
                        class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        :class="{
                            'bg-gray-100 dark:bg-gray-600':
                                selectedLanguage === 'All Languages',
                        }"
                    >
                        All Languages
                    </button>
                </li>
                <li v-for="(language, index) in languages" :key="index">
                    <button
                        type="button"
                        @click="selectLanguage(language)"
                        class="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        :class="{
                            'bg-gray-100 dark:bg-gray-600':
                                selectedLanguage === language,
                        }"
                    >
                        {{ language }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
