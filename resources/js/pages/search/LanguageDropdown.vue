<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Icons
import ChevronDown from '@/components/icons/ChevronDown.vue';

const props = defineProps<{
    languages?: string[];
    selectedLanguage?: string | null;
    modelValue?: string | null;
}>();

const emit = defineEmits<{
    'update:modelValue': [language: string | null];
}>();

const selectedLanguage = ref<string>(
    props.modelValue || props.selectedLanguage || 'All Languages',
);
const isDropdownOpen = ref(false);
const searchQuery = ref('');
const searchInputRef = ref<InstanceType<typeof Input> | null>(null);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
    if (!isDropdownOpen.value) {
        searchQuery.value = '';
    } else {
        nextTick(() => {
            searchInputRef.value?.$el?.focus();
        });
    }
};

const selectLanguage = (language: string) => {
    selectedLanguage.value = language;
    isDropdownOpen.value = false;
    searchQuery.value = '';
    const valueToEmit = language !== 'All Languages' ? language : null;
    emit('update:modelValue', valueToEmit);
};

const filteredLanguages = computed(() => {
    if (!searchQuery.value) {
        return props.languages || [];
    }
    return (props.languages || []).filter((language) =>
        language.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
});
</script>

<template>
    <div class="relative inline-block">
        <Button
            type="button"
            id="dropdown-button"
            @click="toggleDropdown"
            variant="outline"
            aria-haspopup="true"
            :aria-expanded="isDropdownOpen"
        >
            <span>{{ selectedLanguage }}</span>
            <ChevronDown class="h-4 w-4" />
        </Button>
        <div
            v-if="isDropdownOpen"
            id="dropdown"
            class="divide-border border-border bg-popover absolute left-0 top-full z-50 mt-1 w-56 divide-y rounded-lg border shadow-lg"
        >
            <div class="p-2">
                <Input
                    ref="searchInputRef"
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search languages..."
                    class="w-full text-sm"
                    @click.stop
                />
            </div>
            <ul
                class="text-popover-foreground max-h-60 overflow-y-auto py-2 text-sm"
                aria-labelledby="dropdown-button"
            >
                <li v-if="!searchQuery">
                    <button
                        type="button"
                        @click="selectLanguage('All Languages')"
                        class="hover:bg-muted block w-full px-4 py-2 text-left transition-colors"
                        :class="{
                            'bg-muted': selectedLanguage === 'All Languages',
                        }"
                    >
                        All Languages
                    </button>
                </li>
                <li v-for="(language, index) in filteredLanguages" :key="index">
                    <button
                        type="button"
                        @click="selectLanguage(language)"
                        class="hover:bg-muted block w-full px-4 py-2 text-left transition-colors"
                        :class="{
                            'bg-muted': selectedLanguage === language,
                        }"
                    >
                        {{ language }}
                    </button>
                </li>
                <li
                    v-if="searchQuery && filteredLanguages.length === 0"
                    class="text-muted-foreground px-4 py-2"
                >
                    No languages found
                </li>
            </ul>
        </div>
    </div>
</template>
