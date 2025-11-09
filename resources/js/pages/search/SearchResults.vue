<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { marked } from 'marked';
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import RepositoryIcon from '@/components/icons/RepositoryIcon.vue';

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

const props = defineProps<{
    query: string;
    results: SearchResult;
    language?: string | null;
}>();

const emit = defineEmits<{
    'label-clicked': [label: string];
}>();

// Track current result index for single-view navigation
const currentIndex = ref(0);

// Computed property for current item
const currentItem = computed(() => props.results.items[currentIndex.value]);

// Navigation functions
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

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
    // Arrow keys or j/k navigation (like vim/TikTok)
    if (event.key === 'ArrowDown' || event.key === 'j') {
        event.preventDefault();
        goToNext();
    } else if (event.key === 'ArrowUp' || event.key === 'k') {
        event.preventDefault();
        goToPrevious();
    }
};

// Set up keyboard listeners
onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});

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
        <!-- Header with navigation counter -->
        <div class="mb-6 flex items-center justify-between gap-4">
            <h1 class="text-2xl font-bold text-card-foreground">
                <span v-if="query">Search Results for "{{ query }}"</span>
                <span v-else>Search Results</span>
            </h1>
            <div class="flex items-center gap-3">
                <p class="text-sm text-muted-foreground whitespace-nowrap">
                    {{ currentIndex + 1 }} / {{ results.items.length }}
                </p>
            </div>
        </div>

        <!-- No results state -->
        <div v-if="results.total_amount === 0">
            <p class="text-muted-foreground">No results found.</p>
        </div>

        <!-- Single result view -->
        <div v-else-if="currentItem" class="space-y-4">
            <!-- Issue title -->
            <a
                :href="currentItem.repo_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-2xl font-bold text-accent hover:underline block"
            >
                {{ currentItem.repo_title }}
            </a>

            <!-- Metadata -->
            <div class="space-y-3">
                <!-- Two-column layout for repo and updated -->
                <div class="flex items-start justify-between gap-4">
                    <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <RepositoryIcon class="h-4 w-4 shrink-0" />
                        <a
                            :href="currentItem.repo_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-accent hover:underline"
                        >
                            {{ currentItem.repo_name }}
                        </a>
                        <span v-if="language" class="text-xs">
                            • {{ language }}
                        </span>
                    </div>
                    <div
                        class="flex items-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap"
                        :title="new Date(currentItem.updated_at).toLocaleString()"
                    >
                        <CalendarIcon class="h-4 w-4" />
                        Updated {{ getRelativeTime(currentItem.updated_at) }}
                    </div>
                </div>

                <!-- Labels -->
                <div v-if="currentItem.labels.length > 0" class="flex flex-wrap gap-2">
                    <button
                        v-for="(label, labelIndex) in currentItem.labels"
                        :key="labelIndex"
                        type="button"
                        @click="label.toLowerCase() !== 'hacktoberfest' && handleLabelClick(label)"
                        class="inline-block rounded bg-muted px-2 py-1 text-xs transition-colors"
                        :class="{
                            'hover:bg-muted/80 cursor-pointer': label.toLowerCase() !== 'hacktoberfest',
                            'cursor-not-allowed opacity-75': label.toLowerCase() === 'hacktoberfest'
                        }"
                    >
                        #{{ label }}
                    </button>
                </div>
            </div>

            <!-- Full description -->
            <div v-if="currentItem.body" class="mt-6">
                <div
                    class="text-sm text-card-foreground prose prose-sm dark:prose-invert max-w-none"
                    v-html="parseMarkdown(currentItem.body)"
                ></div>
            </div>

            <!-- Navigation controls -->
            <div class="mt-8 flex items-center justify-between pt-6 border-t border-border">
                <button
                    @click="goToPrevious"
                    :disabled="currentIndex === 0"
                    class="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>
                <p class="text-xs text-muted-foreground">
                    Use ↑↓ arrow keys or j/k to navigate
                </p>
                <button
                    @click="goToNext"
                    :disabled="currentIndex === results.items.length - 1"
                    class="px-4 py-2 rounded bg-muted text-muted-foreground hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next →
                </button>
            </div>
        </div>
    </div>
</template>
