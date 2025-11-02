<script setup lang="ts">
import { search } from '@/routes';
import { Form } from '@inertiajs/vue3';
import { ref } from 'vue';

// Icons
import PainIcon from '@/components/icons/PainIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import VoiceIcon from '@/components/icons/VoiceIcon.vue';

// Components
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

defineProps<{
    languages?: string[];
}>();

const qInput = ref<string | null>('qInput');
const languageInput = ref<string | null>('languageInput');
</script>

<template>
    <Form
        v-bind="search()"
        @error="() => qInput?.$el?.focus()"
        :options="{
            preserveScroll: true,
        }"
        class="mx-auto flex max-w-lg items-center"
        v-slot="{ errors, processing }"
    >
        <Label for="q" class="sr-only">Search</Label>
        <div class="relative w-full">
            <Button
                type="button"
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                class="absolute inset-y-0 start-0 flex items-center ps-3"
            >
                <PainIcon />
            </Button>
            <div
                x-show="languages && languages.length > 0"
                id="dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:bg-gray-700"
            >
                <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                >
                    <li x-for="(language, index) in languages" :key="index">
                        <Button
                            type="button"
                            @click="languageInput?.$el?.value = language"
                            class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            {{ language }}
                        </Button>
                    </li>
                </ul>
            </div>
            <input
                type="hidden"
                ref="languageInput"
                id="language"
                name="language"
            />
            <Input
                type="text"
                ref="qInput"
                id="q"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search Mockups, Logos, Design Templates..."
                required
            />
            <InputError :message="errors.q" />
            <Button
                type="button"
                class="absolute inset-y-0 end-0 flex items-center pe-3"
            >
                <VoiceIcon />
            </Button>
        </div>
        <Button
            type="submit"
            class="ms-2 inline-flex items-center rounded-lg border border-blue-700 bg-blue-700 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            variant="destructive"
            :disabled="processing"
            data-test="q-search-button"
        >
            <SearchIcon />
            Search
        </Button>
    </Form>
</template>
