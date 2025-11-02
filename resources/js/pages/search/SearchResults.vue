<script setup lang="ts">
interface SearchItem {
    repo_title: string;
    updated_at: string;
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
    <div x-if="query && results.length > 0" class="p-6">
        <h1 class="text-2xl font-bold mb-4">Search Results for "{{ query }}"</h1>
        <div v-if="results.total_amount === 0">
            <p>No results found.</p>
        </div>
        <ul v-else>
            <li v-for="(item, index) in results.items" :key="index" class="mb-2">
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:underline"
                >
                    {{ item.repo_title }}
                </a>
                <p>{{ item.updated_at }}</p>
            </li>
        </ul>
    </div>
</template>
