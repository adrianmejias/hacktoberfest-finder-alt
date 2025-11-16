<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import WelcomeHeader from '@/components/WelcomeHeader.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import SearchForm from '@/pages/search/SearchForm.vue';
import SearchResults from '@/pages/search/SearchResults.vue';
import { search } from '@/routes';
import { Head, router } from '@inertiajs/vue3';
import { reactive, ref } from 'vue';

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

withDefaults(
    defineProps<{
        canRegister: boolean;
        languages?: string[];
        query?: string;
        results?: SearchResult;
        selectedLanguage?: string | null;
    }>(),
    {
        canRegister: true,
        selectedLanguage: localStorage.getItem('language') || null,
    },
);

const form = reactive<{
    q: string;
    language: string | null;
    labels: string[];
    noReplies: boolean;
}>({
    q: '',
    language: localStorage.getItem('language') || null,
    labels: localStorage.getItem('labels')
        ? JSON.parse(localStorage.getItem('labels')!)
        : ['hacktoberfest', 'good first issue'],
    noReplies: localStorage.getItem('no-replies') === 'true' || false,
});

const submitForm = () => {
    localStorage.setItem('language', form.language || '');
    localStorage.setItem('labels', JSON.stringify(form.labels));
    localStorage.setItem('no-replies', form.noReplies.toString());
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

const showBanner = ref(
    localStorage.getItem('hacktoberfest-2025-banner-dismissed') !== 'true',
);

const dismissBanner = () => {
    showBanner.value = false;
    localStorage.setItem('hacktoberfest-2025-banner-dismissed', 'true');
};
</script>

<template>
    <Head title="Search 2025">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin="true"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
        />
    </Head>

    <PageLayout>
        <WelcomeHeader
            :can-register="canRegister"
            :is-authenticated="!!$page.props.auth.user"
        />

        <!-- Hacktoberfest Ended Banner -->
        <div v-if="showBanner" class="mb-6 w-full max-w-4xl">
            <div
                class="relative rounded-lg border-2 border-orange-500/50 bg-orange-500/10 p-6 text-center backdrop-blur-sm dark:border-orange-400/50 dark:bg-orange-400/10"
            >
                <button
                    @click="dismissBanner"
                    class="absolute top-4 right-4 rounded-md p-1 text-orange-600 transition-colors hover:bg-orange-500/20 hover:text-orange-700 dark:text-orange-400 dark:hover:bg-orange-400/20 dark:hover:text-orange-300"
                    aria-label="Dismiss banner"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <h2
                    class="mb-2 text-2xl font-bold text-orange-600 dark:text-orange-400"
                >
                    Hacktoberfest 2025 has ended
                </h2>
                <p class="mb-4 text-muted-foreground">
                    Thank you to everyone who participated! Hacktoberfest 2025
                    concluded on October 31st.
                </p>
                <p class="text-sm text-muted-foreground">
                    You can still search for and contribute to open source
                    projects year-round. Check back in
                    <strong class="text-foreground">October 2026</strong> for
                    the next Hacktoberfest!
                </p>
            </div>
        </div>

        <div
            class="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0"
        >
            <main
                class="flex w-full max-w-[335px] flex-col gap-6 rounded-lg lg:max-w-4xl"
            >
                <SearchForm
                    :form="form"
                    :languages="languages"
                    :selected-language="selectedLanguage"
                    @remove-label="removeLabel"
                    @toggle-no-replies="toggleNoReplies"
                />

                <div
                    v-if="results"
                    class="rounded-lg border border-border bg-card p-6"
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
    </PageLayout>
</template>
