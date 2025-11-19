<script setup lang="ts">
import { mcp } from '@/routes';
import { Link } from '@inertiajs/vue3';

interface Props {
    canRegister?: boolean;
    isAuthenticated?: boolean;
}

withDefaults(defineProps<Props>(), {
    canRegister: true,
    isAuthenticated: false,
});
</script>

<template>
    <header
        class="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl"
    >
        <nav class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <Link
                    href="/"
                    title="Hacktoberfest Issue Finder"
                    class="group flex items-center gap-3"
                >
                    <img
                        src="/logo-hacktoberfest-nav.svg"
                        alt="Hacktoberfest"
                        class="h-8 w-auto transition-opacity group-hover:opacity-80"
                    />
                    <span
                        class="text-lg font-bold text-foreground transition-opacity group-hover:opacity-80"
                    >
                        Issue Finder
                    </span>
                </Link>
            </div>
            <div class="flex items-center gap-4">
                <!-- <Link
                    v-if="isAuthenticated"
                    :href="dashboard()"
                    class="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-primary transition-colors"
                >
                    Dashboard
                </Link>
                <template v-else>
                    <Link
                        :href="login()"
                        class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border transition-colors"
                    >
                        Log in
                    </Link>
                    <Link
                        v-if="canRegister"
                        :href="register()"
                        class="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-primary transition-colors"
                    >
                        Register
                    </Link>
                </template> -->
                <Link
                    :href="mcp()"
                    class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground transition-colors hover:border-border"
                >
                    MCP Server Guide
                </Link>
            </div>
        </nav>
    </header>
</template>
