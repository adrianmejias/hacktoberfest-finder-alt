<script setup lang="ts">
import InstallPrompt from '@/components/InstallPrompt.vue';
import AuthLayout from '@/layouts/auth/AuthSimpleLayout.vue';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <AuthLayout :title="title" :description="description">
        <slot />
        <InstallPrompt />
    </AuthLayout>
</template>
