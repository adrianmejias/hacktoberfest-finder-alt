<script setup lang="ts">
import { reactive } from 'vue';
import { dashboard, login, register, search } from '@/routes';
import { Head, Link, Form } from '@inertiajs/vue3';
import LanguageDropdown from '@/pages/search/LanguageDropdown.vue';
import SearchResults from '@/pages/search/SearchResults.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError.vue';

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
    }>(),
    {
        canRegister: true,
    },
);

const form = reactive<{
    q: string;
    language: string | null;
}>({
    q: '',
    language: null,
});
</script>

<template>
    <Head title="Hacktoberfest Issue Finder">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div
        class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]"
    >
        <header
            class="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl"
        >
            <nav class="flex items-center justify-end gap-4">
                <Link
                    v-if="$page.props.auth.user"
                    :href="dashboard()"
                    class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Dashboard
                </Link>
                <template v-else>
                    <Link
                        :href="login()"
                        class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                    >
                        Log in
                    </Link>
                    <Link
                        v-if="canRegister"
                        :href="register()"
                        class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Register
                    </Link>
                </template>
            </nav>
        </header>
        <div
            class="flex items-center justify-center w-full transition-opacity opacity-100 duration-750 lg:grow starting:opacity-0"
        >
            <main
                class="flex w-full max-w-[335px] flex-col gap-6 rounded-lg lg:max-w-4xl"
            >
                <!-- Search Form -->
                <div
                    class="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]"
                >
                    <h1
                        class="mb-4 text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]"
                    >
                        Find Hacktoberfest Issues
                    </h1>
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
                                    class="w-full dark:bg-[#0a0a0a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:placeholder:text-[#62605b]"
                                    required
                                    autofocus
                                    :tabindex="1"
                                />
                                <InputError :message="errors.q" />
                            </div>
                            <LanguageDropdown
                                v-model="form.language"
                                :languages="languages"
                            />
                            <input
                                type="hidden"
                                name="language"
                                :value="form.language || ''"
                            />
                            <Button
                                type="submit"
                                class="whitespace-nowrap"
                                :disabled="processing"
                            >
                                Search Issues
                            </Button>
                        </div>
                    </Form>
                </div>

                <!-- Search Results -->
                <div
                    v-if="results"
                    class="rounded-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]"
                >
                    <SearchResults :query="query || ''" :results="results" />
                </div>
            </main>
        </div>
        <div class="hidden h-14.5 lg:block"></div>
    </div>
</template>
