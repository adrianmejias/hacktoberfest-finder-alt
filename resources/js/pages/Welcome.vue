<script setup lang="ts">
import { reactive } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import { search } from '@/routes';
import WelcomeHeader from '@/components/WelcomeHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import SearchForm from '@/pages/search/SearchForm.vue';
import SearchResults from '@/pages/search/SearchResults.vue';

interface SearchItem {
    repo_title: string;
    repo_url: string;
    repo_name: string;
    repo_link: string;
    updated_at: string;
    labels: string[];
    body: string;
}

interface SearchResult {
    total_amount: number;
    items: SearchItem[];
}

const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        languages?: string[];
        query?: string;
        results?: SearchResult;
        selectedLanguage?: string | null;
    }>(),
    {
        canRegister: true,
        selectedLanguage: null,
    },
);

const form = reactive<{
    q: string;
    language: string | null;
    labels: string[];
    noReplies: boolean;
}>({
    q: '',
    language: null,
    labels: ['hacktoberfest', 'good first issue'],
    noReplies: false,
});

const submitForm = () => {
    router.post(search(), {
        q: form.q,
        language: form.language,
        label: form.labels.join(','),
        comments: form.noReplies ? '0' : undefined,
    });
};

const removeLabel = (label: string) => {
    form.labels = form.labels.filter((l) => l !== label);
    submitForm();
};

const addLabel = (label: string) => {
    if (form.labels.some((l) => l.toLowerCase() === label.toLowerCase())) {
        return;
    }

    form.labels.push(label);
    submitForm();
};

const toggleNoReplies = () => {
    form.noReplies = !form.noReplies;
    submitForm();
};
</script>

<template>
    <Head title="Hacktoberfest Issue Finder">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
    </Head>
    <div
        class="flex min-h-screen flex-col items-center bg-background p-6 text-foreground lg:justify-center lg:p-8"
    >
        <WelcomeHeader
            :can-register="canRegister"
            :is-authenticated="!!$page.props.auth.user"
        />

        <div
            class="flex items-center justify-center w-full transition-opacity opacity-100 duration-750 lg:grow starting:opacity-0"
        >
            <main
                class="flex w-full max-w-[335px] flex-col gap-6 rounded-lg lg:max-w-4xl"
            >
                <SearchForm
                    :form="form"
                    :languages="languages"
                    @remove-label="removeLabel"
                    @toggle-no-replies="toggleNoReplies"
                />

                <div
                    v-if="results"
                    class="rounded-lg bg-card p-6 border border-border"
                >
                    <SearchResults
                        :query="query || ''"
                        :results="results"
                        :language="selectedLanguage"
                        @label-clicked="addLabel"
                    />
                </div>
            </main>
        </div>

        <AppFooter />
    </div>
</template>
