<script setup lang="ts">
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import RepositoryIcon from '@/components/icons/RepositoryIcon.vue';
import { marked } from 'marked';
import { computed, onMounted, onUnmounted, ref } from 'vue';

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

interface SearchProps {
    query: string;
    results: SearchResult;
    language?: string | null;
}

const props = defineProps<SearchProps>();

const emit = defineEmits<{
    'label-clicked': [label: string];
}>();

const currentIndex = ref(0);
const currentItem = computed(() => props.results.items[currentIndex.value]);
const goToNext = () => {
    if (currentIndex.value < props.results.items.length - 1) {
        currentIndex.value++;
    }
};
const goToPrevious = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'j') {
        event.preventDefault();
        goToNext();
    } else if (event.key === 'ArrowUp' || event.key === 'k') {
        event.preventDefault();
        goToPrevious();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});

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
        <div class="mb-6 flex items-center justify-between gap-4">
            <h1 class="text-2xl font-bold text-card-foreground">
                <span v-if="query">Search Results for "{{ query }}"</span>
                <span v-else>Search Results</span>
            </h1>
            <div class="flex items-center gap-3">
                <p class="text-sm whitespace-nowrap text-muted-foreground">
                    {{ currentIndex + 1 }} / {{ results.items.length }}
                </p>
            </div>
        </div>
        <div v-if="results.total_amount === 0">
            <p class="text-muted-foreground">No results found.</p>
        </div>
        <div v-else-if="currentItem" class="space-y-4">
            <a
                :href="currentItem.repo_url"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-2xl font-bold text-accent hover:underline"
            >
                {{ currentItem.repo_title }}
            </a>
            <div class="space-y-3">
                <div class="flex items-start justify-between gap-4">
                    <div
                        class="flex items-center gap-1.5 text-sm text-muted-foreground"
                    >
                        <RepositoryIcon class="h-4 w-4 shrink-0" />
                        <a
                            :href="currentItem.repo_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-accent hover:underline"
                        >
                            {{ currentItem.repo_name }}
                        </a>
                    </div>
                    <div
                        class="flex items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground"
                        :title="
                            new Date(currentItem.updated_at).toLocaleString()
                        "
                    >
                        <CalendarIcon class="h-4 w-4" />
                        Updated {{ getRelativeTime(currentItem.updated_at) }}
                    </div>
                </div>
                <div
                    v-if="currentItem.labels.length > 0"
                    class="flex flex-wrap gap-2"
                >
                    <button
                        v-for="(label, labelIndex) in currentItem.labels"
                        :key="labelIndex"
                        type="button"
                        @click="
                            label.toLowerCase() !== 'hacktoberfest' &&
                            handleLabelClick(label)
                        "
                        class="inline-block rounded bg-muted px-2 py-1 text-xs transition-colors"
                        :class="{
                            'cursor-pointer hover:bg-muted/80':
                                label.toLowerCase() !== 'hacktoberfest',
                            'cursor-not-allowed opacity-75':
                                label.toLowerCase() === 'hacktoberfest',
                        }"
                    >
                        #{{ label }}
                    </button>
                </div>
            </div>
            <div v-if="currentItem.body" class="mt-6">
                <div
                    class="prose prose-sm max-w-none text-sm text-card-foreground dark:prose-invert"
                    v-html="parseMarkdown(currentItem.body)"
                ></div>
            </div>
            <div
                class="mt-8 flex items-center justify-between border-t border-border pt-6"
            >
                <button
                    @click="goToPrevious"
                    :disabled="currentIndex === 0"
                    class="rounded bg-muted px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    ← Previous
                </button>
                <p class="text-xs text-muted-foreground">
                    Use ↑↓ arrow keys or j/k to navigate
                </p>
                <button
                    @click="goToNext"
                    :disabled="currentIndex === results.items.length - 1"
                    class="rounded bg-muted px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    </div>
</template>
