<script setup lang="ts">
import { ref } from 'vue';
import { marked } from 'marked';

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
    language?: string | null;
}>();

const emit = defineEmits<{
    'label-clicked': [label: string];
}>();

// Track which descriptions are expanded
const expandedDescriptions = ref<Set<number>>(new Set());

const toggleDescription = (index: number) => {
    if (expandedDescriptions.value.has(index)) {
        expandedDescriptions.value.delete(index);
    } else {
        expandedDescriptions.value.add(index);
    }
};

// Configure marked for safe rendering
marked.setOptions({
    breaks: true,
    gfm: true,
});

const parseMarkdown = (markdown: string): string => {
    if (!markdown) {
        return '';
    }

    return marked.parse(markdown) as string;
};

const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

const handleLabelClick = (label: string) => {
    emit('label-clicked', label);
};
</script>

<template>
    <div>
        <div class="mb-4 flex items-center justify-between gap-4">
            <h1
                v-if="query"
                class="text-2xl font-bold text-card-foreground"
            >
                Search Results for "{{ query }}"
            </h1>
            <h1
                v-else
                class="text-2xl font-bold text-card-foreground"
            >
                Search Results
            </h1>
            <p class="text-sm text-muted-foreground whitespace-nowrap">
                Showing {{ results.items.length.toLocaleString() }} of
                {{ results.total_amount.toLocaleString() }} {{ results.total_amount === 1 ? 'result' : 'results' }}
            </p>
        </div>
        <div v-if="results.total_amount === 0">
            <p class="text-muted-foreground">No results found.</p>
        </div>
        <ul v-else class="space-y-6">
            <li
                v-for="(item, index) in results.items"
                :key="index"
                class="pb-6 border-b-2 border-muted last:border-0 last:pb-0"
            >
                <a
                    :href="item.repo_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-lg font-medium text-accent hover:underline"
                >
                    {{ item.repo_title }}
                </a>

                <div class="mt-2 space-y-1">
                    <p class="text-sm text-muted-foreground">
                        <span class="font-medium">Repository:</span>
                        <a
                            :href="item.repo_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-accent hover:underline ml-1"
                        >
                            {{ item.repo_name }}
                        </a>
                        <span v-if="language" class="ml-2 text-xs text-muted-foreground">
                            • {{ language }}
                        </span>
                    </p>

                    <p
                        v-if="item.labels.length > 0"
                        class="text-sm text-muted-foreground"
                    >
                        <span class="font-medium">Labels:</span>
                        <button
                            v-for="(label, labelIndex) in item.labels"
                            :key="labelIndex"
                            type="button"
                            @click="label.toLowerCase() !== 'hacktoberfest' && handleLabelClick(label)"
                            class="ml-1 inline-block rounded bg-muted px-2 py-0.5 text-xs transition-colors"
                            :class="{
                                'hover:bg-muted/80 cursor-pointer': label.toLowerCase() !== 'hacktoberfest',
                                'cursor-not-allowed opacity-75': label.toLowerCase() === 'hacktoberfest'
                            }"
                        >
                            #{{ label }}
                        </button>
                    </p>

                    <p class="text-sm text-muted-foreground">
                        <span class="font-medium">Updated:</span>
                        {{ getRelativeTime(item.updated_at) }}
                    </p>

                    <div v-if="item.body" class="mt-2">
                        <span class="text-sm font-medium text-muted-foreground">Description:</span>
                        <div
                            class="mt-1 text-sm text-card-foreground prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1"
                            :class="{ 'line-clamp-3': !expandedDescriptions.has(index) }"
                            v-html="parseMarkdown(item.body)"
                        ></div>
                        <button
                            type="button"
                            @click="toggleDescription(index)"
                            class="mt-1 text-xs text-accent hover:text-accent/80 transition-colors"
                        >
                            {{ expandedDescriptions.has(index) ? 'Show less' : 'Show more' }}
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
