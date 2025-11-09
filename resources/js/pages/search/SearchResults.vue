<script setup lang="ts">
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

defineProps<{
    query: string;
    results: SearchResult;
}>();
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold mb-4 text-[#1b1b18] dark:text-[#EDEDEC]">
            Search Results for "{{ query }}"
        </h1>
        <div v-if="results.total_amount === 0">
            <p class="text-gray-600 dark:text-gray-400">No results found.</p>
        </div>
        <ul v-else class="space-y-6">
            <li
                v-for="(item, index) in results.items"
                :key="index"
                class="border-b border-gray-200 pb-4 last:border-0 dark:border-[#3E3E3A]"
            >
                <a
                    :href="item.repo_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-lg font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                    {{ item.repo_title }}
                </a>

                <div class="mt-2 space-y-1">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        <span class="font-medium">Repository:</span>
                        <a
                            :href="item.repo_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-blue-600 hover:underline dark:text-blue-400 ml-1"
                        >
                            {{ item.repo_name }}
                        </a>
                    </p>

                    <p
                        v-if="item.labels.length > 0"
                        class="text-sm text-gray-600 dark:text-gray-400"
                    >
                        <span class="font-medium">Labels:</span>
                        <span
                            v-for="(label, labelIndex) in item.labels"
                            :key="labelIndex"
                            class="ml-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-[#0a0a0a]"
                        >
                            {{ label }}
                        </span>
                    </p>

                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        <span class="font-medium">Updated:</span>
                        {{ new Date(item.updated_at).toLocaleDateString() }}
                    </p>

                    <p
                        v-if="item.body"
                        class="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3"
                    >
                        {{ item.body }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
