<script setup lang="ts">
import InstallPrompt from '@/components/InstallPrompt.vue';
import PageLayout from '@/layouts/pages/PageSimpleLayout.vue';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <PageLayout :title="title" :description="description">
        <slot />
        <InstallPrompt />
    </PageLayout>
</template>
