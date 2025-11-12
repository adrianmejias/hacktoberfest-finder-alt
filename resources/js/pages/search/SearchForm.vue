<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LanguageDropdown from '@/pages/search/LanguageDropdown.vue';
import { search } from '@/routes';
import { Form } from '@inertiajs/vue3';

interface FormData {
    q: string | null;
    language: string | null;
    labels: string[];
    noReplies: boolean;
}

interface SearchFormProps {
    form: FormData;
    languages?: string[];
    selectedLanguage?: string | null;
}

defineProps<SearchFormProps>();

const emit = defineEmits<{
    'remove-label': [label: string];
    'toggle-no-replies': [];
}>();
</script>

<template>
    <div class="border-border bg-card rounded-lg border p-6">
        <Form
            v-bind="search.form()"
            :reset-on-success="[]"
            v-slot="{ errors, processing }"
            class="space-y-4"
        >
            <div class="flex flex-col gap-4 sm:flex-row">
                <div class="flex-1">
                    <Input
                        id="q"
                        type="text"
                        name="q"
                        placeholder="Search for issues..."
                        class="w-full"
                        autofocus
                        :tabindex="1"
                    />
                    <InputError :message="errors.q" />
                </div>
                <LanguageDropdown
                    :languages="languages"
                    :selected-language="selectedLanguage"
                />
                <button
                    type="button"
                    @click="emit('toggle-no-replies')"
                    class="bg-muted inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 text-sm transition-colors"
                    :class="{
                        'bg-accent text-accent-foreground ring-accent ring-1':
                            form.noReplies,
                        'hover:bg-muted/80': !form.noReplies,
                    }"
                    title="Show issues where no replies have been submitted"
                >
                    No Replies
                </button>
                <input
                    type="hidden"
                    name="language"
                    :value="form.language || ''"
                />
                <input
                    type="hidden"
                    name="label"
                    :value="form.labels.join(',')"
                />
                <input
                    type="hidden"
                    name="comments"
                    :value="form.noReplies ? '0' : ''"
                />
                <Button
                    type="submit"
                    size="icon"
                    :disabled="processing"
                    title="Search for issues"
                >
                    <SearchIcon class="h-4 w-4" />
                </Button>
            </div>
            <!-- Labels -->
            <div v-if="form.labels.length > 0" class="flex flex-wrap gap-2">
                <span
                    v-for="(label, index) in form.labels"
                    :key="index"
                    class="bg-muted inline-flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-xs"
                    :class="{
                        'hover:bg-muted/80 cursor-pointer':
                            label.toLowerCase() !== 'hacktoberfest',
                        'cursor-not-allowed opacity-75':
                            label.toLowerCase() === 'hacktoberfest',
                    }"
                    @click="
                        label.toLowerCase() !== 'hacktoberfest' &&
                        emit('remove-label', label)
                    "
                >
                    #{{ label }}
                    <CloseIcon
                        v-if="label.toLowerCase() !== 'hacktoberfest'"
                        class="h-3 w-3"
                    />
                </span>
            </div>
        </Form>
    </div>
</template>
