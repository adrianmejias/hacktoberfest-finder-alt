<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { search } from '@/routes';
import LanguageDropdown from '@/pages/search/LanguageDropdown.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';

interface FormData {
    q: string;
    language: string | null;
    labels: string[];
    noReplies: boolean;
}

interface Props {
    form: FormData;
    languages?: string[];
}

defineProps<Props>();

const emit = defineEmits<{
    'remove-label': [label: string];
    'toggle-no-replies': [];
}>();
</script>

<template>
    <div class="rounded-lg bg-card p-6 border border-border">
        <Form
            v-bind="search.form()"
            :data="form"
            v-slot="{ errors, processing }"
            class="space-y-4"
        >
            <div class="flex flex-col gap-4 sm:flex-row">
                <div class="flex-1">
                    <Input
                        v-model="form.q"
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
                    v-model="form.language"
                    :languages="languages"
                />
                <button
                    type="button"
                    @click="emit('toggle-no-replies')"
                    class="inline-flex items-center justify-center rounded bg-muted px-3 py-1.5 text-sm transition-colors whitespace-nowrap"
                    :class="{
                        'bg-accent text-accent-foreground ring-1 ring-accent': form.noReplies,
                        'hover:bg-muted/80': !form.noReplies
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
                    class="inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs cursor-pointer"
                    :class="{
                        'cursor-pointer hover:bg-muted/80':
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
